import { defineStore } from "pinia";
import type { KnightType } from "~/models/enums/knight-type";
import type {
  Knight,
  KnightAttributes,
  KnightWeapon,
  SimpleKnight,
} from "~/models/knight.model";
import useToast from "../use-toast";
import type { KnightAttributesEnum } from "~/models/enums/knight-attributes";
import type { PaginatedRequest, PaginatedResponse } from "~/models/pagination";

const toast = useToast();

export type FetchKnightsParams = PaginatedRequest<{
  type?: KnightType;
}>;

export type CreateKnightParams = {
  name: string;
  nickname: string;
  birthday: Date;
  attributes: KnightAttributes;
  weapons?: KnightWeapon[];
  keyAttribute: KnightAttributesEnum;
  type: KnightType;
};

export const useKnightsStore = defineStore("knights-store", {
  state: () => ({
    knights: [] as SimpleKnight[],
    knight: null as Knight | null,

    pagesCount: 0,
    nextPage: null as number | null,
    page: 1,
  }),
  actions: {
    async fetchKnights(params: FetchKnightsParams): Promise<void> {
      try {
        const { data, totalPages, nextPage, page } = await $fetch<
          PaginatedResponse<SimpleKnight>
        >("/knights", {
          params,
        });
        this.knights = data;
        this.pagesCount = totalPages || 0;
        this.nextPage = nextPage ?? null;
        this.page = page;
      } catch (error: any) {
        toast.error(`Erro ao buscar guerreiros: ${error?.message}`);
      }
    },
    async fetchKnight(id: string): Promise<void> {
      try {
        const data = await $fetch<Knight>(`/knights/${id}`);
        this.knight = data;
      } catch (error: any) {
        toast.error(`Erro ao buscar guerreiro: ${error?.message}`);
      }
    },
    async createKnight(knight: CreateKnightParams): Promise<void> {
      try {
        await $fetch("/knights", {
          method: "POST",
          body: JSON.stringify(knight),
        });
        toast.success("Guerreiro criado com sucesso");
      } catch (error: any) {
        toast.error(`Erro ao criar guerreiro: ${error?.message}`);
      }
    },
    async updateKnight(id: string, knight: CreateKnightParams): Promise<void> {
      try {
        await $fetch(`/knights/${id}`, {
          method: "PATCH",
          body: JSON.stringify(knight),
        });
        toast.success("Guerreiro atualizado com sucesso");
      } catch (error: any) {
        toast.error(`Erro ao atualizar guerreiro: ${error?.message}`);
      }
    },
    async deleteKnight(id: string): Promise<void> {
      try {
        await $fetch(`/knights/${id}`, {
          method: "DELETE",
        });
        toast.success("Guerreiro deletado com sucesso");
      } catch (error: any) {
        toast.error(`Erro ao deletar guerreiro: ${error?.message}`);
      }
    },
  },
});
