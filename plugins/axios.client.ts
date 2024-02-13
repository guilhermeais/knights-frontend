import axios from "axios";

export default defineNuxtPlugin(async (_nuxtApp) => {
  const runtimeConfig = useRuntimeConfig();
  const modifiedAxios = axios.create();

  modifiedAxios.defaults.baseURL = runtimeConfig.public.KNIGHTS_API;
  modifiedAxios.defaults.headers.common["Content-Type"] = "application/json";

  return {
    provide: {
      axios: modifiedAxios,
    },
  };
});
