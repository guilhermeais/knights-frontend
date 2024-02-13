<template>
  <div class="container mx-auto p-4">
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-3xl font-bold">Lista de Guerreiros</h1>
      <button
        @click="createKnightModal = true"
        class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        <Icon name="fa6-solid:circle-plus" class="h-6 w-6" />
        Criar Guerreiro
      </button>
    </div>
    <div v-if="loading" class="flex items-center justify-center">
      <Icon name="⏳" class="animate-bounce h-8 w-8 text-gray-800" />
      <span class="text-gray-800 text-xl font-semibold ml-2"
        >Carregando...</span
      >
    </div>
    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      <KnightCard
        v-for="knight in store.knights"
        :key="knight.id"
        :knight="knight"
      />
    </div>

    <Modal :isOpen="createKnightModal" @close="closeCreateKnightModal">
      <CreateKnight @created="closeCreateKnightModal" />
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { useKnightsStore } from "@/store/knights.store";
import { ref, onMounted } from "vue";

const store = useKnightsStore();
const loading = ref(true);
const createKnightModal = ref(false);

const closeCreateKnightModal = () => {
  createKnightModal.value = false;
};
onMounted(async () => {
  try {
    await store.fetchKnights();
  } catch (error: any) {
    console.error("Erro ao carregar guerreiros:", error);
  } finally {
    loading.value = false;
  }
});
</script>
