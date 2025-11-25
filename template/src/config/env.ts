/**
 * Environment Configuration
 *
 * This file contains all environment variables for the application.
 * These values are hardcoded to bypass babel-plugin-inline-dotenv issues.
 */

export const ENV = {
  SUPABASE_URL: 'https://nggmoqelcbnbhobnffph.supabase.co',
  SUPABASE_ANON_KEY:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5nZ21vcWVsY2JuYmhvYm5mZnBoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1NTU0NTEsImV4cCI6MjA3OTEzMTQ1MX0.bIY5R6lZeBEgOU_5UJJGnrdamPIEJfyl27xN0v6etmE',
  API_URL: 'https://jsonplaceholder.typicode.com',
} as const;
