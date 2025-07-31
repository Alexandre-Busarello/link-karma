-- Migration: Add security_check field to showcases table
-- Description: Adds security_check JSONB field to store SecurityCheckResult data
-- Author: LinkKarma AI System
-- Date: 2025-07-31

-- Add security_check field to showcases table
ALTER TABLE public.showcases 
ADD COLUMN IF NOT EXISTS security_check JSONB DEFAULT NULL;

-- Add index for security_check status queries
CREATE INDEX IF NOT EXISTS idx_showcases_security_status 
ON public.showcases USING GIN ((security_check->>'status')) 
WHERE security_check IS NOT NULL;

-- Add index for security_check confidence queries
CREATE INDEX IF NOT EXISTS idx_showcases_security_confidence 
ON public.showcases ((CAST(security_check->>'confidence' AS INTEGER))) 
WHERE security_check IS NOT NULL;

-- Update the updated_at trigger to include security_check changes
-- (The trigger should already exist from the previous migration)

-- Add comment to document the security_check field structure
COMMENT ON COLUMN public.showcases.security_check IS 
'Security verification result in JSON format with fields: status, confidence, sources_checked, findings, recommendation, details';

-- Example of security_check structure:
-- {
--   "status": "APROVADO|SUSPEITO|BLOQUEADO",
--   "confidence": 85,
--   "sources_checked": ["twitter", "reddit", "trustpilot"],
--   "findings": ["Specific findings from analysis"],
--   "recommendation": "Clear recommendation",
--   "details": {
--     "positive_mentions": 15,
--     "negative_mentions": 3,
--     "scam_indicators": ["fraud patterns found"],
--     "trustworthiness_score": 75
--   }
-- }
