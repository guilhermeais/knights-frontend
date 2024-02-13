<template>
  <div
    class="bg-white p-4 rounded-lg shadow-md hover:bg-slate-50 cursor-pointer transition duration-300 ease-in-out"
  >
    <div @click="handleClick">
      <div class="font-bold text-lg mb-2">{{ knight.name }}</div>
      <div class="text-gray-600 mb-2">Apelido: {{ knight.nickname }}</div>
      <div class="text-gray-600 mb-2">Idade: {{ knight.age }}</div>
      <div class="text-gray-600 mb-2">
        Quantidade de armas: {{ knight.weaponsQuantity }}
      </div>
      <div class="text-gray-600 mb-2">
        Atributo chave: {{ knightAttributesPortuguese[knight.keyAttribute] }}
      </div>
      <div class="text-gray-600 mb-2">Ataque: {{ knight.attack }}</div>
      <div class="text-gray-600 mb-2">Experiência: {{ knight.experience }}</div>
      <div class="text-gray-600 mb-2">
        Tipo: {{ knightTypePortuguese[knight.type] }}
      </div>
      <div class="text-gray-600 mb-2">
        Criado em: {{ formattedDate(knight.createdAt) }}
      </div>
      <div v-if="knight.updatedAt" class="text-gray-600 mb-2">
        Atualizado em: {{ formattedDate(knight.updatedAt) }}
      </div>
      <div v-else class="text-gray-600 mb-2">Atualizado em: -</div>
    </div>

    <div class="flex justify-between mt-4">
      <Button @click="handleDetailClick"> Detalhes </Button>
      <Button @click="handleRemoveClick" type="danger"> Remover </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  knightAttributesPortuguese,
  knightTypePortuguese,
} from "@/models/knight.model";
import type { SimpleKnight } from "@/models/knight.model";
import { format } from "date-fns";

function formattedDate(date: Date): string {
  return format(new Date(date), "dd/MM/yyyy HH:mm:ss");
}

const emit = defineEmits(["remove", "detail", "click"]);

const handleDetailClick = () => {
  emit("detail");
};

const handleRemoveClick = () => {
  emit("remove");
};

const handleClick = () => {
  emit("click");
};

const props = defineProps<{
  knight: SimpleKnight;
}>();
</script>
