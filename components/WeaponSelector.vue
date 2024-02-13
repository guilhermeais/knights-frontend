<template>
  <div class="container mx-auto p-4">
    <div class="grid grid-cols-2 gap-2">
      <div
        v-for="(weapon, index) in weaponsStore.weapons"
        :key="index"
        :class="[
          'p-4 border rounded-lg hover:shadow-lg cursor-pointer transition duration-300 ease-in-out',
          { 'bg-blue-200': selectedWeapon?.name === weapon.name },
        ]"
        @click="selectWeapon(weapon)"
      >
        <div class="flex justify-between mb-2">
          <p class="text-md font-semibold">{{ weapon.name }}</p>
          <p class="text-gray-600">MOD: +{{ weapon.mod }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500">
            Atributo: {{ knightAttributesPortuguese[weapon.attr] }}
          </p>
          <img
            v-if="weapon.image"
            :src="weapon.image"
            :alt="weapon.name"
            class="mt-2 w-full h-44 object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Weapon } from "~/models/weapon.model";
import { KnightAttributesEnum } from "~/models/enums/knight-attributes";
import { useWeaponsStore } from "../store/weapons.store";

const emit = defineEmits(["selectWeapon"]);

defineProps({
  selectedWeapon: Object as PropType<Weapon>,
});

const weaponsStore = useWeaponsStore();

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

onMounted(async () => await weaponsStore.fetchWeapons());

const selectWeapon = (weapon: Weapon) => {
  emit("selectWeapon", weapon);
};
</script>
