import { defineStore } from "pinia";
import type { KnightAttributesEnum } from "~/models/enums/knight-attributes";
import { KnightType } from "~/models/enums/knight-type";
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
    _heroes: new Map<string, SimpleKnight>(),
    _villains: new Map<string, SimpleKnight>(),
    knight: null as Knight | null,

    pagesCount: 0,
    nextPage: null as number | null,
    currentPage: 1,
    totalPages: 0,
    limit: 10,
    type: null as KnightType | null,
  }),
  getters: {
    knights: (state) => {
      if (state.type === KnightType.HERO) {
        return Array.from(state._heroes.values());
      }

      if (state.type === KnightType.VILLAIN) {
        return Array.from(state._villains.values());
      }

      return [
        ...Array.from(state._heroes.values()),
        ...Array.from(state._villains.values()),
      ].sort(
        (a, b) => a.createdAt.getMilliseconds() - b.createdAt.getMilliseconds()
      );
    },
    showLoadMore: (state) =>
      state.nextPage !== null && state.nextPage <= state.totalPages,
  },
  actions: {
    async fetchKnights(params?: FetchKnightsParams): Promise<void> {
      const { $axios } = useNuxtApp();
      try {
        this.currentPage = params?.page ?? this.currentPage;
        this.limit = params?.limit ?? this.limit;
        this.type = params?.type ?? null;

        const { data: result } = await $axios<PaginatedResponse<SimpleKnight>>(
          "/knights",
          {
            params: {
              page: this.currentPage,
              limit: this.limit,
              ...(this.type ? { type: this.type } : {}),
            },
          }
        );

        const { data, totalPages, nextPage, page } = result;

        this.pagesCount = totalPages || 0;
        this.nextPage = nextPage ?? null;
        this.currentPage = page;
        this.totalPages = totalPages || 0;

        data.forEach((knight) => {
          knight.createdAt = new Date(knight.createdAt);
          knight.updatedAt = knight.updatedAt && new Date(knight.updatedAt);

          if (knight.type === KnightType.HERO) {
            this._heroes.set(knight.id, knight);
          }

          if (knight.type === KnightType.VILLAIN) {
            this._villains.set(knight.id, knight);
          }
        });
      } catch (error: any) {
        console.error(this.fetchKnights.name, error);
        const errorMessage =
          error.response?.data?.message ||
          "Ocorreu um erro na busca dos guerreiros.";
        throw new Error(
          errorMessage || "Ocorreu um erro na busca dos guerreiros."
        );
      }
    },
    async fetchKnight(id: string): Promise<void> {
      const { $axios } = useNuxtApp();

      try {
        const { data } = await $axios<Knight>(`/knights/${id}`);

        this.knight = {
          ...data,
          birthday: new Date(data.birthday),
        };
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message ||
          "Ocorreu um erro na busca do guerreiro.";
        throw new Error(errorMessage);
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
        const errorMessage = error.response?.data?.message;
        throw new Error(
          errorMessage || "Ocorreu um erro na criação do guerreiro."
        );
      }
    },
    async updateKnight(
      id: string,
      knight: {
        nickname: string;
        weapons: KnightWeapon[];
      }
    ): Promise<void> {
      const { $axios } = useNuxtApp();

      try {
        await $axios(`/knights/${id}`, {
          method: "PATCH",
          data: knight,
        });

        await this.fetchKnights();
      } catch (error: any) {
        console.error(this.updateKnight.name, error);
        const errorMessage = error.response?.data?.message;
        throw new Error(
          errorMessage || "Ocorreu um erro na criação do guerreiro."
        );
      }
    },
    async deleteKnight(id: string): Promise<void> {
      const { $axios } = useNuxtApp();

      try {
        await $axios(`/knights/${id}`, {
          method: "DELETE",
        });

        await this.fetchKnights();
      } catch (error: any) {
        console.error(this.deleteKnight.name, error);
        throw error;
      }
    },
  },
});
