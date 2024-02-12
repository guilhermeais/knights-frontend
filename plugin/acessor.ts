import { initializeAxios } from "@/utils/nuxt-instance";
import type { Plugin } from "@nuxt/types";

const accessor: Plugin = ({ $axios }) => {
  initializeAxios($axios);
};

export default accessor;
