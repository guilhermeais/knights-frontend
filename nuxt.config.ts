// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
  app: {
    head: {
      title: "Knights",
      meta: [{ name: "description", content: "Crie seus guerreiros" }],
    },
  },
  tailwindcss: {
    cssPath: "@/assets/css/tailwind.css",
  },
  build: {
    transpile: ["vue-toastification"],
  },
  runtimeConfig: {
    KNIGHTS_API: process.env.KNIGHTS_API || "http://localhost:3000",
  },
});
