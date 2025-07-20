import { renderToString } from 'vue/server-renderer'
import { createApp } from './main'



function renderTeleports(teleports) {
  if (!teleports) return '';
  const data1 = Object.entries(teleports).reduce((all, [key, value]) => {
    if (key.startsWith('#el-popper-container-')) {
      return `${all}<div id="${key.slice(1)}">${value}</div>`;
    }
    return all;
  }, teleports.body || '');

  return  data1;
}

export async function render(_url: string) {
  const { app } = createApp()

  // passing SSR context object which will be available via useSSRContext()
  // @vitejs/plugin-vue injects code into a component's setup() that registers
  // itself on ctx.modules. After the render, ctx.modules would contain all the
  // components that have been instantiated during this render call.
  const ctx = {}
  const html = await renderToString(app, ctx)
  const teleports = renderTeleports(ctx.teleports);

  return { html, teleports }
}
