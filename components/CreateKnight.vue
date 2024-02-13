<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4">Criar um novo Guerreiro</h1>
    <form @submit.prevent="createKnight">
      <div class="grid grid-cols-2 gap-5">
        <div class="">
          <InputText v-model="knightData.name" label="Nome:" />
        </div>

        <div class="">
          <InputText v-model="knightData.nickname" label="Apelido:" />
        </div>

        <div class="">
          <InputDate v-model="knightData.birthday" />
        </div>

        <div class="">
          <label for="nickname" class="block text-sm font-medium text-gray-700"
            >Atributo Chave:</label
          >
          <InputSelect
            v-model="knightData.keyAttribute"
            :options="
              Object.values(KnightAttributesEnum).map((keyAtt) => ({
                label: knightAttributesPortuguese[keyAtt],
                value: keyAtt,
              }))
            "
          />
        </div>

        <div class="mb-4">
          <label for="nickname" class="block text-sm font-medium text-gray-700"
            >Tipo:</label
          >
          <InputSelect
            v-model="knightData.type"
            :options="
              Object.values(KnightType).map((keyAtt) => ({
                label: knightTypePortuguese[keyAtt],
                value: keyAtt,
              }))
            "
          />
        </div>
      </div>

      <div class="mb-4 bg-gray-100 rounded-lg p-4 shadow-md">
        <label class="block pb-2 text-md font-medium text-gray-700 text-center"
          >Atributos</label
        >
        <div class="grid grid-cols-2 gap-4">
          <div v-for="(value, key) in knightData.attributes" :key="key">
            <label
              :for="key"
              class="block text-sm font-medium text-gray-700 capitalize"
              >{{ knightAttributesPortuguese[key] }}:</label
            >
            <input
              v-model="knightData.attributes[key]"
              :id="key"
              :name="key"
              type="number"
              class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <div class="mb-4">
        <label for="nickname" class="block text-sm font-medium text-gray-700"
          >Armas:</label
        >
        <WeaponSelector
          :selectedWeapon="equippedWeapon"
          @selectWeapon="equipWeapon"
        />
      </div>

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

const knightAttributesPortuguese: {
  [key in Lowercase<keyof typeof KnightAttributesEnum>]: string;
} = {
  charisma: "Carisma",
  constitution: "Constituição",
  dexterity: "Destreza",
  intelligence: "Inteligência",
  strength: "Força",
  wisdom: "Sabedoria",
};

const knightTypePortuguese: {
  [key in Lowercase<keyof typeof KnightType>]: string;
} = {
  hero: "Herói",
  villain: "Vilão",
};

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

const equipWeapon = (weapon: Weapon) => {
  knightData.value.weapons[0] = {
    ...weapon,
    equipped: true,
  };
};

const equippedWeapon = computed(() => {
  return knightData?.value?.weapons?.find((w) => w.equipped);
});

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
