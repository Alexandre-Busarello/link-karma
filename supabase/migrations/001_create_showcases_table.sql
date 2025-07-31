-- Migration: Create showcases table and related structures
-- Description: Creates the main showcases table with proper relationships, indexes, and RLS policies
-- Author: LinkKarma AI System
-- Date: 2025-07-31

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create showcases table
CREATE TABLE IF NOT EXISTS public.showcases (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    referral_url TEXT NOT NULL,
    service_name VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN (
        'banking', 'transport', 'food', 'shopping', 'entertainment', 
        'finance', 'health', 'education', 'technology', 'other'
    )),
    status VARCHAR(20) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'suspended')),
    cover_image_url TEXT,
    gallery_images JSONB DEFAULT '[]'::jsonb,
    video_url TEXT,
    content JSONB NOT NULL DEFAULT '{
        "what_is": "",
        "advantages": [],
        "quick_guide": [],
        "faq": []
    }'::jsonb,
    karma_boost INTEGER DEFAULT 0,
    featured_until TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_showcases_user_id ON public.showcases(user_id);
CREATE INDEX IF NOT EXISTS idx_showcases_category ON public.showcases(category);
CREATE INDEX IF NOT EXISTS idx_showcases_status ON public.showcases(status);
CREATE INDEX IF NOT EXISTS idx_showcases_created_at ON public.showcases(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_showcases_featured_until ON public.showcases(featured_until) WHERE featured_until IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_showcases_karma_boost ON public.showcases(karma_boost DESC);

-- Create composite indexes for common queries
CREATE INDEX IF NOT EXISTS idx_showcases_status_category ON public.showcases(status, category);
CREATE INDEX IF NOT EXISTS idx_showcases_user_status ON public.showcases(user_id, status);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_showcases_updated_at 
    BEFORE UPDATE ON public.showcases 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies
ALTER TABLE public.showcases ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view published showcases
CREATE POLICY "Anyone can view published showcases" ON public.showcases
    FOR SELECT USING (status = 'published');

-- Policy: Users can view their own showcases (any status)
CREATE POLICY "Users can view own showcases" ON public.showcases
    FOR SELECT USING (auth.uid() = user_id);

-- Policy: Users can insert their own showcases
CREATE POLICY "Users can insert own showcases" ON public.showcases
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own showcases
CREATE POLICY "Users can update own showcases" ON public.showcases
    FOR UPDATE USING (auth.uid() = user_id);

-- Policy: Users can delete their own showcases
CREATE POLICY "Users can delete own showcases" ON public.showcases
    FOR DELETE USING (auth.uid() = user_id);

-- Create a view for public showcases with user info
CREATE OR REPLACE VIEW public.showcases_public AS
SELECT
    s.id,
    s.title,
    s.description,
    s.referral_url,
    s.service_name,
    s.category,
    s.cover_image_url,
    s.gallery_images,
    s.video_url,
    s.content,
    s.karma_boost,
    s.featured_until,
    s.created_at,
    s.updated_at,
    p.display_name as author_name,
    p.avatar_url as author_avatar,
    p.trust_score as author_trust_score
FROM public.showcases s
LEFT JOIN public.profiles p ON s.user_id = p.user_id
WHERE s.status = 'published';

-- Grant permissions on the view
GRANT SELECT ON public.showcases_public TO anon, authenticated;
