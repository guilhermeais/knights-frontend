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

    <div class="mb-4 grid grid-cols-3">
      <InputSelect
        v-model="selecteKnightType"
        :options="knightTypesOptions"
        label="Filtrar por tipo:"
      />
    </div>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      <template v-if="store.knights.length">
        <KnightCard
          id="knight-card"
          v-for="knight in store.knights"
          @click="() => handleEditKnigt(knight)"
          @detail="() => handleEditKnigt(knight)"
          :key="knight.id"
          :knight="knight"
          @remove="() => handleRemoveKnight(knight)"
        />
      </template>
      <template v-else-if="!loading">
        <div
          id="no-knights"
          class="text-3xl col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 text-center"
        >
          Nenhum guerreiro encontrado 🍃
        </div>
      </template>
    </div>
    <div v-if="store.showLoadMore && !loading" class="flex justify-center mt-4">
      <Button id="load-more" @click="loadMoreKnights">
        Carregar Mais Guerreiros
      </Button>
    </div>

    <div v-if="loading" class="flex items-center justify-center mt-6">
      <Icon name="⏳" class="animate-bounce h-8 w-8 text-gray-800" />
      <span class="text-gray-800 text-xl font-semibold ml-2"
        >Carregando...</span
      >
    </div>

    <Modal :isOpen="createKnightModal" @close="closeCreateKnightModal">
      <CreateKnight @created="closeCreateKnightModal" />
    </Modal>

    <Modal :isOpen="updateKnightModal" @close="closeUpdateKnightModal">
      <UpdateKnight
        :id="editingKnight.id"
        :name="editingKnight.name"
        @updated="closeUpdateKnightModal"
        @error="closeUpdateKnightModal"
      />
    </Modal>
  </div>
</template>

<script setup lang="ts">
import type { FetchKnightsParams } from "@/store/knights.store";
import { useKnightsStore } from "@/store/knights.store";
import { ref, onMounted } from "vue";
import { KnightAttributesEnum } from "~/models/enums/knight-attributes";
import { KnightType } from "~/models/enums/knight-type";
import { knightTypePortuguese } from "~/models/knight.model";
import type { SimpleKnight } from "~/models/knight.model";
const { $swal } = useNuxtApp();
const toast = useToast();

const store = useKnightsStore();
const loading = ref(true);
const createKnightModal = ref(false);
const updateKnightModal = ref(false);
const editingKnight = ref<SimpleKnight | null>(null);

const knightTypesOptions: {
  label: string;
  value: KnightType | null;
}[] = [
  {
    label: "Todos",
    value: null,
  },
  ...Object.values(KnightType).map((type) => ({
    label: knightTypePortuguese[type],
    value: type,
  })),
];

const selecteKnightType = ref(null as KnightType | null);

const closeCreateKnightModal = () => {
  createKnightModal.value = false;
};

const closeUpdateKnightModal = () => {
  updateKnightModal.value = false;
};

const handleEditKnigt = (knight: SimpleKnight) => {
  editingKnight.value = knight;
  updateKnightModal.value = true;
};

const fetchKnights = async (params?: FetchKnightsParams) => {
  try {
    loading.value = true;
    await store.fetchKnights({
      ...params,
      type: selecteKnightType.value!,
    });
  } catch (error: any) {
    console.error("Erro ao carregar guerreiros:", error);
    toast.error("Erro ao carregar guerreiros");
  } finally {
    loading.value = false;
  }
};

const loadMoreKnights = async () => {
  await fetchKnights({
    page: store.nextPage!,
    type: selecteKnightType.value!,
  });
};

const handleRemoveKnight = async (knight: SimpleKnight) => {
  try {
    const result = await $swal.fire({
      title: "Remover Guerreiro",
      html: `Deseja remover o guerreiro <strong>${knight.name}</strong>?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "red",
      cancelButtonColor: "gray",
    });

    if (!result.isConfirmed) return;

    await store.deleteKnight(knight.id);
  } catch (error: any) {
    console.error("Erro ao remover guerreiro:", error);
  }
};
onMounted(async () => {
  fetchKnights();
});

watch([selecteKnightType], fetchKnights);
</script>
