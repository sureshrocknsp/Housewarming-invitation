-- ====================================================================
-- Gruhapravesam Well-Wisher Blessings & Row Level Security (RLS) Schema
-- ====================================================================

-- 1. Create table well_wisher_blessings
CREATE TABLE IF NOT EXISTS well_wisher_blessings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    guest_name TEXT NOT NULL CHECK (length(trim(guest_name)) >= 2 AND length(guest_name) <= 80),
    blessing_message TEXT NOT NULL CHECK (length(trim(blessing_message)) >= 5 AND length(blessing_message) <= 500),
    approval_status TEXT NOT NULL DEFAULT 'pending' CHECK (approval_status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create performance indexes
CREATE INDEX IF NOT EXISTS idx_blessings_status_created ON well_wisher_blessings (approval_status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blessings_created_at ON well_wisher_blessings (created_at DESC);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE well_wisher_blessings ENABLE ROW LEVEL SECURITY;

-- 4. Policy: Allow public guests to view ONLY APPROVED blessings
CREATE POLICY "Public guests can view approved blessings"
ON well_wisher_blessings
FOR SELECT
TO public
USING (approval_status = 'approved');

-- 5. Policy: Allow public guests to SUBMIT a blessing (always defaults to 'pending')
CREATE POLICY "Public guests can submit blessings"
ON well_wisher_blessings
FOR INSERT
TO public
WITH CHECK (approval_status = 'pending');

-- 6. Policy: Allow authenticated administrators FULL access to review, approve, reject, or delete
CREATE POLICY "Admins have full access to blessings"
ON well_wisher_blessings
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- 7. Seed Initial Traditional Well-Wisher Blessings (Approved for display)
INSERT INTO well_wisher_blessings (guest_name, blessing_message, approval_status, created_at)
VALUES 
  ('Dr. K. V. Subba Rao & Family', 'శ్రీ వేంకటేశ్వర స్వామి వారి దివ్య కృపా కటాక్షములతో మీ నూతన గృహం సదా ఆనంద ఐశ్వర్యములతో వర్ధిల్లాలని మనసారా ఆశీర్వదిస్తున్నాము. శుభ గృహప్రవేశ మహోత్సవ శుభాకాంక్షలు!', 'approved', NOW() - INTERVAL '2 days'),
  ('Sri K. Rama Krishna & Smt. Vani', 'Heartiest congratulations to Ramanjaneyulu garu and Lakshmi Kumari garu on your dream home. May this auspicious abode bring lifelong health, peace and prosperity to the Bonam family!', 'approved', NOW() - INTERVAL '1 day'),
  ('Venkateswara Rao (Hyderabad)', 'నూతన గృహ ప్రవేశ మహోత్సవ శుభాకాంక్షలు. సర్వదా సుఖసంతోషాలు, ఆయురారోగ్యాలు కలగాలని కోరుకుంటున్నాను.', 'approved', NOW() - INTERVAL '12 hours')
ON CONFLICT DO NOTHING;

-- Security Note:
-- Never expose Supabase service_role key in frontend code.
-- The frontend interacts only using the public anon key (VITE_SUPABASE_ANON_KEY).
