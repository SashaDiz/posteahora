import { Metadata } from 'next';
import { LandingPage } from '@gitroom/frontend/components/landing/landing.page';
import { internalFetch } from '@gitroom/helpers/utils/internal.fetch';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'PosteaHora - Your agentic social media scheduling tool',
  description: 'PosteaHora offers everything you need to manage your social media posts, build an audience, capture leads, and grow your business faster with AI',
};

export default async function HomePage() {
  // Check if user is authenticated and redirect to app if they are
  try {
    const response = await internalFetch('/user/self');
    if (response.ok) {
      const user = await response.json();
      if (user?.id) {
        redirect('/launches');
      }
    }
  } catch (error) {
    // User is not authenticated, show landing page
  }

  return <LandingPage />;
}

