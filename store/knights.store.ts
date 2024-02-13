import { defineStore } from "pinia";
import type { KnightAttributesEnum } from "~/models/enums/knight-attributes";
import type { KnightType } from "~/models/enums/knight-type";
import type {
  Knight,
  KnightAttributes,
  KnightWeapon,
  SimpleKnight,
} from "~/models/knight.model";
import type { PaginatedRequest, PaginatedResponse } from "~/models/pagination";

export type FetchKnightsParams = PaginatedRequest<{
  type?: KnightType;
}>;

export type CreateKnightParams = {
  name: string;
  nickname: string;
  birthday: Date | null;
  attributes: KnightAttributes | null;
  weapons: KnightWeapon[];
  keyAttribute: KnightAttributesEnum | null;
  type: KnightType | null;
};

export const useKnightsStore = defineStore("knights-store", {
  state: () => ({
    knights: [] as SimpleKnight[],
    knight: null as Knight | null,

    pagesCount: 0,
    nextPage: null as number | null,
    currentPage: 1,
    totalPages: 0,
  }),
  actions: {
    async fetchKnights(params?: FetchKnightsParams): Promise<void> {
      const { $axios } = useNuxtApp();
      try {
        const { data: result } = await $axios<PaginatedResponse<SimpleKnight>>(
          "/knights",
          {
            params: {
              ...params,
              page: params?.page ?? this.currentPage,
              limit: params?.limit ?? 10,
            },
          }
        );

        const { data, totalPages, nextPage, page } = result;

        this.knights = data;
        this.pagesCount = totalPages || 0;
        this.nextPage = nextPage ?? null;
        this.currentPage = page;
        this.totalPages = totalPages || 0;
      } catch (error: any) {
        console.error(this.fetchKnights.name, error);
        throw error;
      }
    },
    async fetchKnight(id: string): Promise<void> {
      const { $axios } = useNuxtApp();

      try {
        const { data } = await $axios<Knight>(`/knights/${id}`);
        this.knight = data;
      } catch (error: any) {
        console.error(this.fetchKnight.name, error);
        throw error;
      }
    },
    async createKnight(knight: CreateKnightParams): Promise<void> {
      const { $axios } = useNuxtApp();
      try {
        console.log(knight);
        await $axios("/knights", {
          method: "POST",
          data: knight,
        });

        await this.fetchKnights();
      } catch (error: any) {
        console.error(this.createKnight.name, error);
        throw error;
      }
    },
    async updateKnight(id: string, knight: CreateKnightParams): Promise<void> {
      const { $axios } = useNuxtApp();

      try {
        await $axios(`/knights/${id}`, {
          method: "PATCH",
          data: knight,
        });
      } catch (error: any) {
        console.error(this.updateKnight.name, error);
        throw error;
      }
    },
    async deleteKnight(id: string): Promise<void> {
      const { $axios } = useNuxtApp();

      try {
        await $axios(`/knights/${id}`, {
          method: "DELETE",
        });
      } catch (error: any) {
        console.error(this.deleteKnight.name, error);
        throw error;
      }
    },
  },
});
