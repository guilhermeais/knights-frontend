<template>
  <div class="bg-white p-4 rounded-lg shadow-md">
    <div class="font-bold text-lg mb-2">{{ knight.name }}</div>
    <div class="text-gray-600 mb-2">Apelido: {{ knight.nickname }}</div>
    <div class="text-gray-600 mb-2">Idade: {{ knight.age }}</div>
    <div class="text-gray-600 mb-2">
      Quantidade de armas: {{ knight.weaponsQuantity }}
    </div>
    <div class="text-gray-600 mb-2">
      Atributo chave: {{ knight.keyAttribute }}
    </div>
    <div class="text-gray-600 mb-2">Ataque: {{ knight.attack }}</div>
    <div class="text-gray-600 mb-2">Experiência: {{ knight.experience }}</div>
    <div class="text-gray-600 mb-2">Tipo: {{ knight.type }}</div>
    <div class="text-gray-600 mb-2">Criado em: {{ formattedDate(knight.createdAt) }}</div>
    <div v-if="knight.updatedAt" class="text-gray-600 mb-2">
      Atualizado em: {{ formattedDate(knight.updatedAt) }}
    </div>
    <div v-else class="text-gray-600 mb-2">Atualizado em: -</div>

    <div class="flex justify-between mt-4">
      <button
        class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Detalhes
      </button>
      <button
        class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
      >
        Remover
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SimpleKnight } from "@/models/knight.model";
import { format } from "date-fns";

function formattedDate(date: Date): string {
  return format(new Date(date), "dd/MM/yyyy HH:mm:ss");
}

const props = defineProps<{
  knight: SimpleKnight;
}>();
</script>
