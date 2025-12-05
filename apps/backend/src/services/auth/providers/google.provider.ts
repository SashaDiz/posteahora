import { makeId } from '@gitroom/nestjs-libraries/services/make.is';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library/build/src/auth/oauth2client';
import { ProvidersInterface } from '@gitroom/backend/services/auth/providers.interface';

// Separate client for YouTube integrations
const clientAndYoutube = () => {
  const client = new google.auth.OAuth2({
    clientId: process.env.YOUTUBE_CLIENT_ID,
    clientSecret: process.env.YOUTUBE_CLIENT_SECRET,
    redirectUri: `${process.env.FRONTEND_URL}/integrations/social/youtube`,
  });

  const youtube = (newClient: OAuth2Client) =>
    google.youtube({
      version: 'v3',
      auth: newClient,
    });

  const youtubeAnalytics = (newClient: OAuth2Client) =>
    google.youtubeAnalytics({
      version: 'v2',
      auth: newClient,
    });

  const oauth2 = (newClient: OAuth2Client) =>
    google.oauth2({
      version: 'v2',
      auth: newClient,
    });

  return { client, youtube, oauth2, youtubeAnalytics };
};

// Client for Google authentication (separate from YouTube integration)
const getAuthClient = () => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  
  if (!clientId || !clientSecret) {
    throw new Error('GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET environment variables are required for Google authentication');
  }

  return new google.auth.OAuth2({
    clientId,
    clientSecret,
    redirectUri: `${process.env.FRONTEND_URL}/auth?provider=GOOGLE`,
  });
};

export class GoogleProvider implements ProvidersInterface {
  generateLink() {
    const state = makeId(7);
    const client = getAuthClient();
    return client.generateAuthUrl({
      access_type: 'online',
      prompt: 'consent',
      state,
      redirect_uri: `${process.env.FRONTEND_URL}/auth?provider=GOOGLE`,
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
      ],
    });
  }

  async getToken(code: string) {
    const client = getAuthClient();
    const { tokens } = await client.getToken(code);
    return tokens.access_token;
  }

  async getUser(providerToken: string) {
    const client = getAuthClient();
    client.setCredentials({ access_token: providerToken });
    const oauth2 = google.oauth2({
      version: 'v2',
      auth: client,
    });
    const { data } = await oauth2.userinfo.get();

    return {
      id: data.id!,
      email: data.email,
    };
  }
}
