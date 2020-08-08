import { Auth0Client } from "@auth0/auth0-spa-js";

export interface OnRedirectCallbackOptions {
  onRedirectCallback: (appState?: any) => any;
  redirectUri: string;
  domain: string;
  clientId: string;
  audience: string;
}

export interface Auth0PluginData {
  loading: boolean;
  isAuthenticated: boolean;
  user: object;
  auth0Client: Auth0Client | null;
  popupOpen: boolean;
  error: Error | null;
}
