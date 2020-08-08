import Vue from "vue";
import createAuth0Client, {
  PopupLoginOptions,
  RedirectLoginOptions,
  GetIdTokenClaimsOptions,
  GetTokenSilentlyOptions,
  GetTokenWithPopupOptions,
  LogoutOptions,
  RedirectLoginResult
} from "@auth0/auth0-spa-js";
import { OnRedirectCallbackOptions, Auth0PluginData } from "@/typings/auth0";
import { PluginObject } from "vue/types/umd";

const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState({}, document.title, window.location.pathname);

let instance: Vue;

export const getInstance = () => instance;

export const useAuth0 = (
  {
    onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
    redirectUri = window.location.origin,
    domain,
    clientId,
    audience
  }: OnRedirectCallbackOptions = {
      onRedirectCallback: DEFAULT_REDIRECT_CALLBACK,
      redirectUri: window.location.origin,
      domain: "",
      clientId: "",
      audience: ""
    }
): Vue => {
  if (instance) return instance;

  instance = new Vue({
    data(): Auth0PluginData {
      return {
        loading: true,
        isAuthenticated: false,
        user: {},
        auth0Client: null,
        popupOpen: false,
        error: null
      };
    },
    methods: {
      async loginWithPopup(o?: PopupLoginOptions) {
        this.popupOpen = true;

        try {
          await this.auth0Client?.loginWithPopup(o);
        } catch (e) {
          console.error(e);
        } finally {
          this.popupOpen = false;
        }

        this.user = await this.auth0Client?.getUser();
        this.isAuthenticated = true;
      },

      async handleRedirectCallback() {
        this.loading = true;
        try {
          await this.auth0Client?.handleRedirectCallback();
          this.user = await this.auth0Client?.getUser();
          this.isAuthenticated = true;
        } catch (e) {
          this.error = e;
        } finally {
          this.loading = false;
        }
      },

      loginWithRedirect(o?: RedirectLoginOptions) {
        return this.auth0Client?.loginWithRedirect(o);
      },

      getIdTokenClaims(o?: GetIdTokenClaimsOptions) {
        return this.auth0Client?.getIdTokenClaims(o);
      },

      getTokenSilently(o?: GetTokenSilentlyOptions) {
        return this.auth0Client?.getTokenSilently(o);
      },

      getTokenWithPopup(o: GetTokenWithPopupOptions) {
        return this.auth0Client?.getTokenWithPopup(o);
      },

      logout(o?: LogoutOptions) {
        return this.auth0Client?.logout(o);
      }
    },

    async created() {
        this.auth0Client = await createAuth0Client({
          domain: domain,
          /* eslint-disable @typescript-eslint/camelcase */
          client_id: clientId,
          redirect_uri: redirectUri,
          /* eslint-enable @typescript-eslint/camelcase */
          audience: audience,
        });
        
        try {
          if (
            window.location.search.includes("code=") &&
            window.location.search.includes("state=")
          ) {
            const {
              appState
            }: RedirectLoginResult = await this.auth0Client.handleRedirectCallback();
            onRedirectCallback(appState);
          }
        } catch (e) {
          this.error = e;
        } finally {
          this.isAuthenticated = await this.auth0Client.isAuthenticated();
          this.user = await this.auth0Client.getUser();
          this.loading = false;
        }
    }
  });

  return instance;
};

// as described at https://vuejs.org/v2/guide/typescript.html#Augmenting-Types-for-Use-with-Plugins
// declare module 'vue/types/vue' {
//   interface Vue {
//     prototype: any,
//     $auth: Vue
//   }
// }

export const Auth0Plugin: PluginObject<OnRedirectCallbackOptions> = {
  install(VueClass: typeof Vue, options?: OnRedirectCallbackOptions) {
    VueClass.prototype.$auth = useAuth0(options);
  }
};
