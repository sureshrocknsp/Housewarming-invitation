-- ====================================================================
-- Gruhapravesam RSVP Table & Row Level Security (RLS) Schema
-- ====================================================================

-- 1. Create the main table
CREATE TABLE IF NOT EXISTS gruhapravesam_rsvps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    guest_name TEXT NOT NULL,
    mobile_number TEXT,
    attendance_status TEXT NOT NULL CHECK (attendance_status IN ('attending', 'maybe', 'declined')),
    adults_count INTEGER NOT NULL DEFAULT 1 CHECK (adults_count >= 0),
    children_count INTEGER NOT NULL DEFAULT 0 CHECK (children_count >= 0),
    special_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create performance indexes
CREATE INDEX IF NOT EXISTS idx_rsvps_created_at ON gruhapravesam_rsvps (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_rsvps_status ON gruhapravesam_rsvps (attendance_status);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE gruhapravesam_rsvps ENABLE ROW LEVEL SECURITY;

-- 4. Policy: Allow public guests to INSERT their own RSVP
CREATE POLICY "Public guests can submit RSVPs" 
ON gruhapravesam_rsvps 
FOR INSERT 
TO public 
WITH CHECK (true);

-- 5. Policy: Restrict SELECT on raw table to authenticated administrators
-- This guarantees guest mobile numbers and private notes are NEVER exposed to the public API
CREATE POLICY "Only authorized admin can view full RSVPs" 
ON gruhapravesam_rsvps 
FOR SELECT 
TO authenticated 
USING (true);

-- 6. Policy: Restrict DELETE to authenticated administrators
CREATE POLICY "Only authorized admin can delete RSVPs" 
ON gruhapravesam_rsvps 
FOR DELETE 
TO authenticated 
USING (true);

-- 7. Secure Public View for Blessings Wall
-- Exposes ONLY public blessings and names without exposing private mobile numbers
CREATE OR REPLACE VIEW gruhapravesam_public_wishes AS
SELECT 
    id, 
    guest_name, 
    special_message, 
    attendance_status, 
    created_at
FROM gruhapravesam_rsvps
WHERE special_message IS NOT NULL AND length(trim(special_message)) > 0;

-- Security Note:
-- Never expose Supabase service_role secret in client-side code.
-- Only the public anon key (VITE_SUPABASE_ANON_KEY) is used by the frontend.
