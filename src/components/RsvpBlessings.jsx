import React from 'react';
import RsvpSection from './RsvpSection';

/**
 * Backward compatibility wrapper for RsvpBlessings
 * Replaced by the upgraded Phase 5 RsvpSection with WhatsApp integration
 * and Supabase / Local database service layer.
 */
export default function RsvpBlessings(props) {
  return <RsvpSection {...props} />;
}
