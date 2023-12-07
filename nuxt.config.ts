// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/supabase", "@nuxtjs/tailwindcss", "@nuxt/image"],
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
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL || "http://localhost:3000",
    },
  },
  supabase: {
    redirectOptions: {
      login: "/login",
      callback: "/confirm",
    },
  },
  image: {
    domains: ["supabase.co"],
  },
});
