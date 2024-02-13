// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "nuxt-icon"],
  plugins: ["~/plugins/toast.client.ts", "~/plugins/axios.client.ts"],
  app: {
    head: {
      title: "Knights",
      meta: [{ name: "description", content: "Crie seus guerreiros" }],
    },
  },
  tailwindcss: {
    cssPath: "@/assets/css/tailwind.css",
  },
  css: ["vue-final-modal/style.css"],
  build: {
    transpile: ["vue-toastification"],
  },
  runtimeConfig: {
    public: {
      KNIGHTS_API: process.env.NUXT_KNIGHTS_API || "http://localhost:3000",
    },
  },
});
