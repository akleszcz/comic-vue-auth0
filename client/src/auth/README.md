## `install.js`
Contains a wrapper Vue object around the Auth0 SDK and a Vue plugin (`Auth0Plugin`) that exposes this wrapper to the rest of the application.

Source: [Beginner Vue.js Tutorial with User Login](https://auth0.com/blog/beginner-vuejs-tutorial-with-user-login)

The code has been adjusted for TypeScript.

# Vue plugins
- usually used to add global-level functionality to Vue
- should expose an `install` method that has two parameters: `Vue` and `options`
- used by calling the `Vue.use` global method (before `new Vue()`)
- `Vue.use` automatically prevents you from using the same plugin more than once

`Auth0Plugin` is used to add some Vue instance methods by attaching them to `Vue.prototype`.

Source: [Vue.js. Plugins](https://vuejs.org/v2/guide/plugins.html)

### Notes on the code:
```typescript
const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState({}, document.title, window.location.pathname);
```
@TODO:
- https://html.spec.whatwg.org/multipage/history.html
"Consider a game where the user can navigate along a line..."