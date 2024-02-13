// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "nuxt-icon"],
  plugins: ["~/plugins/toast.client.ts", "~/plugins/axios.client.ts", '~/plugins/sweetalert2.ts'],
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
    public: {
      KNIGHTS_API: process.env.NUXT_KNIGHTS_API || "http://localhost:3000",
    },
  },
});
