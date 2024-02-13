import { defineStore } from "pinia";
import { KnightAttributesEnum } from "~/models/enums/knight-attributes";
import type { Weapon } from "~/models/weapon.model";

export const useWeaponsStore = defineStore("weapons-store", {
  state: () => ({
    weapons: [] as Weapon[],
  }),
  actions: {
    async fetchWeapons(): Promise<void> {
      this.weapons = [
        {
          name: "Espada",
          attr: KnightAttributesEnum.STRENGTH,
          mod: 10,
          image:
            "https://images.unsplash.com/photo-1600081729801-fd151cba450f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dps://cdn.pixabay.com/photo/2016/01/19/17/41/sword-1149897_960_720.png",
        },
        {
          name: "Arco",
          attr: KnightAttributesEnum.DEXTERITY,
          mod: 10,
          image:
            "https://i.pinimg.com/originals/0f/c9/5c/0fc95c324f4ed647d0515ca5ee433bc8.jpg",
        },
        {
          name: "Cajado",
          attr: KnightAttributesEnum.INTELLIGENCE,
          mod: 10,
          image:
            "https://img.freepik.com/fotos-premium/cajado-magico-de-fantasia_847279-722.jpg",
        },
        {
          name: "Machado",
          attr: KnightAttributesEnum.STRENGTH,
          mod: 10,
          image:
            "https://pm1.aminoapps.com/7037/81b956b3918054b7dfff31cab0ac817b7115e776r1-736-1308v2_hq.jpg",
        },
        {
          name: "Livro de Magia",
          attr: KnightAttributesEnum.WISDOM,
          mod: 10,
          image:
            "https://img.freepik.com/fotos-premium/uma-imagem-encantada-de-um-livro-vintage-aberto-em-cima-de-uma-mesa-de-madeira-tem-brilhos_410516-16209.jpg",
        },
        {
          attr: KnightAttributesEnum.CHARISMA,
          image:
            "https://www.aceroymagia.com/Images/articulo/cetro-chitauri-de-loki/01-cetro-Chitauri-de-loki.jpg",
          mod: 10,
          name: "Cetro",
        },
      ];
    },
  },
});
