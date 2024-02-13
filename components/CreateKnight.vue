<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4">Criar um novo Guerreiro</h1>

    <form @submit.prevent="createKnight">
      <KnightForm v-model="knightData" />

      <Button type="primary" class="w-full">Criar Guerreiro</Button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { KnightAttributesEnum } from "~/models/enums/knight-attributes";
import { KnightType } from "~/models/enums/knight-type";
import type { Weapon } from "~/models/weapon.model";
import type { CreateKnightParams } from "../store/knights.store";
import { useKnightsStore } from "../store/knights.store";

const knightsStore = useKnightsStore();
const toast = useToast();
const emit = defineEmits(["created"]);

const knightData = ref<CreateKnightParams>({
  name: "",
  nickname: "",
  birthday: null,
  keyAttribute: null,
  type: null,
  attributes: {
    charisma: 0,
    constitution: 0,
    dexterity: 0,
    intelligence: 0,
    strength: 0,
    wisdom: 0,
  },
  weapons: [],
});

const resetData = () => {
  knightData.value = {
    name: "",
    nickname: "",
    birthday: null,
    keyAttribute: null,
    type: null,
    attributes: {
      charisma: 0,
      constitution: 0,
      dexterity: 0,
      intelligence: 0,
      strength: 0,
      wisdom: 0,
    },
    weapons: [],
  };
};

const createKnight = async () => {
  try {
    await knightsStore.createKnight(knightData.value);
    resetData();

    toast.success("Guerreiro criado com sucesso!");
    emit("created");
  } catch (error: any) {
    toast.error(`Erro ao criar guerreiro: ${error?.message}`);
  }
};
</script>
