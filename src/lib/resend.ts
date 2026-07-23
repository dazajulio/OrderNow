import { Resend } from 'resend';

// Provide a fallback in case the env var isn't set during build
const resendApiKey = process.env.RESEND_API_KEY || 're_dummy_key_for_build';

export const resend = new Resend(resendApiKey);
