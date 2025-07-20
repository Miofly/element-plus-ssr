import { createSSRApp } from 'vue'
import App from './App.vue'
import { ID_INJECTION_KEY, ZINDEX_INJECTION_KEY } from 'element-plus';

// SSR requires a fresh app instance per request, therefore we export a function
// that creates a fresh app instance. If using Vuex, we'd also be creating a
// fresh store here.
export function createApp() {
  const app = createSSRApp(App)
  app.provide(ID_INJECTION_KEY, {
    prefix: 100,
    current: 0,
  });
  app.provide(ZINDEX_INJECTION_KEY, { current: 0 });
  return { app }
}
