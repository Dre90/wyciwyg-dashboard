// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/supabase"],
  app: {
    head: {
      title: "WYCIWYG - Dashboard",
      meta: [
        { name: "description", content: "Dashboard for the game WYCIWYG" },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          charset: "utf-8",
        },
      ],
      link: [{ rel: "icon", type: "image/png", href: "favicon-16x16.png" }],
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/styles/variables.scss";',
        },
      },
    },
  },
  css: ["@/assets/styles/main.scss"],
});
