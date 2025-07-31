-- Migration: Create storage buckets for showcase media
-- Description: Creates storage buckets for showcase images and videos with proper RLS policies
-- Author: LinkKarma AI System
-- Date: 2025-07-31

-- Create storage bucket for showcase images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'showcase-images',
    'showcase-images',
    true,
    5242880, -- 5MB limit
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
) ON CONFLICT (id) DO NOTHING;

-- Create storage bucket for showcase videos (Pro tier only)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'showcase-videos',
    'showcase-videos',
    true,
    52428800, -- 50MB limit
    ARRAY['video/mp4', 'video/webm', 'video/quicktime']
) ON CONFLICT (id) DO NOTHING;

-- RLS Policies for showcase-images bucket

-- Policy: Anyone can view showcase images
CREATE POLICY "Anyone can view showcase images" ON storage.objects
    FOR SELECT USING (bucket_id = 'showcase-images');

-- Policy: Authenticated users can upload showcase images
CREATE POLICY "Authenticated users can upload showcase images" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'showcase-images' 
        AND auth.role() = 'authenticated'
        AND (storage.foldername(name))[1] = auth.uid()::text
    );

-- Policy: Users can update their own showcase images
CREATE POLICY "Users can update own showcase images" ON storage.objects
    FOR UPDATE USING (
        bucket_id = 'showcase-images' 
        AND auth.uid()::text = (storage.foldername(name))[1]
    );

-- Policy: Users can delete their own showcase images
CREATE POLICY "Users can delete own showcase images" ON storage.objects
    FOR DELETE USING (
        bucket_id = 'showcase-images' 
        AND auth.uid()::text = (storage.foldername(name))[1]
    );

-- RLS Policies for showcase-videos bucket

-- Policy: Anyone can view showcase videos
CREATE POLICY "Anyone can view showcase videos" ON storage.objects
    FOR SELECT USING (bucket_id = 'showcase-videos');

-- Policy: Pro users can upload showcase videos
CREATE POLICY "Pro users can upload showcase videos" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'showcase-videos' 
        AND auth.role() = 'authenticated'
        AND (storage.foldername(name))[1] = auth.uid()::text
        AND EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE user_id = auth.uid() 
            AND tier = 'pro'
        )
    );

-- Policy: Users can update their own showcase videos
CREATE POLICY "Users can update own showcase videos" ON storage.objects
    FOR UPDATE USING (
        bucket_id = 'showcase-videos' 
        AND auth.uid()::text = (storage.foldername(name))[1]
    );

-- Policy: Users can delete their own showcase videos
CREATE POLICY "Users can delete own showcase videos" ON storage.objects
    FOR DELETE USING (
        bucket_id = 'showcase-videos' 
        AND auth.uid()::text = (storage.foldername(name))[1]
    );

-- Create function to check user tier for showcase limits
CREATE OR REPLACE FUNCTION check_showcase_limit()
RETURNS TRIGGER AS $$
DECLARE
    user_tier TEXT;
    showcase_count INTEGER;
    max_showcases INTEGER;
BEGIN
    -- Get user tier
    SELECT tier INTO user_tier 
    FROM public.profiles 
    WHERE user_id = NEW.user_id;
    
    -- Set max showcases based on tier
    max_showcases := CASE 
        WHEN user_tier = 'pro' THEN 5
        ELSE 1
    END;
    
    -- Count existing showcases
    SELECT COUNT(*) INTO showcase_count
    FROM public.showcases
    WHERE user_id = NEW.user_id;
    
    -- Check limit
    IF showcase_count >= max_showcases THEN
        RAISE EXCEPTION 'Showcase limit reached for % tier: % showcases allowed', user_tier, max_showcases;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to enforce showcase limits
CREATE TRIGGER enforce_showcase_limit
    BEFORE INSERT ON public.showcases
    FOR EACH ROW
    EXECUTE FUNCTION check_showcase_limit();

-- Create function to get showcase count by user
CREATE OR REPLACE FUNCTION get_user_showcase_count(user_uuid UUID)
RETURNS INTEGER AS $$
BEGIN
    RETURN (
        SELECT COUNT(*)::INTEGER
        FROM public.showcases
        WHERE user_id = user_uuid
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION get_user_showcase_count(UUID) TO authenticated;
