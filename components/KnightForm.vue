<template>
  <div class="grid grid-cols-2 gap-5">
    <div class="">
      <InputText
        :disabled="isEditing"
        v-model="modelValue.name"
        label="Nome:"
      />
    </div>

    <div class="">
      <InputText v-model="modelValue.nickname" label="Apelido:" />
    </div>

    <div class="">
      <InputDate :disabled="isEditing" v-model="modelValue.birthday" />
    </div>

    <div class="">
      <label for="nickname" class="block text-sm font-medium text-gray-700"
        >Atributo Chave:</label
      >
      <InputSelect
        :disabled="isEditing"
        v-model="modelValue.keyAttribute"
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
        :disabled="isEditing"
        v-model="modelValue.type"
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
      <div v-for="(value, key) in modelValue.attributes" :key="key">
        <label
          :for="key"
          class="block text-sm font-medium text-gray-700 capitalize"
          >{{ knightAttributesPortuguese[key] }}:</label
        >
        <input
          :disabled="isEditing"
          v-model="modelValue.attributes[key]"
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
</template>

<script setup lang="ts">
import { KnightAttributesEnum } from "~/models/enums/knight-attributes";
import { KnightType } from "~/models/enums/knight-type";
import type { Knight } from "~/models/knight.model";

import {
  knightAttributesPortuguese,
  knightTypePortuguese,
} from "~/models/knight.model";

import type { Weapon } from "~/models/weapon.model";

const emit = defineEmits(["update:modelValue"]);
const { modelValue } = defineProps({
  modelValue: {
    type: Object as PropType<Knight>,
    required: true,
  },
  isEditing: Boolean,
});
const equippedWeapon = ref<Weapon | null>(null);

const equipWeapon = (weapon: Weapon) => {
  equippedWeapon.value = weapon;
  emit("update:modelValue", {
    ...modelValue,
    weapons: [
      {
        ...weapon,
        equipped: true,
      },
    ],
  });
};

onMounted(() => {
  equippedWeapon.value = modelValue.weapons.find((w) => w.equipped) || null;
});
</script>
