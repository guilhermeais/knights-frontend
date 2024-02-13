<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4">Atualizando {{ name }} ⚔️</h1>
    <div v-if="loading && knightUpdateData?.name" class="text-center">
      <Icon name="⏳" class="animate-bounce h-8 w-8 text-gray-800" />
      <span class="text-gray-800 text-xl font-semibold ml-2"
        >Carregando...</span
      >
    </div>
    <template v-else>
      <form @submit.prevent="updateKnight">
        <KnightForm
          v-if="knightUpdateData"
          isEditing
          v-model="knightUpdateData"
        />

        <Button class="w-full">Editar Guerreiro</Button>
      </form>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { useKnightsStore } from "@/store/knights.store";
import type { Knight, KnightWeapon } from "~/models/knight.model";
const { $swal } = useNuxtApp();

const knightStore = useKnightsStore();
const toast = useToast();
const { id } = defineProps({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const knightUpdateData = ref<Knight | null>(null);
const emit = defineEmits(["error", "updated"]);
const loading = ref<boolean>(false);

const fetchKnight = async () => {
  loading.value = true;
  try {
    await knightStore.fetchKnight(id);

    knightUpdateData.value = knightStore?.knight;
  } catch (error) {
    console.error("Erro ao buscar dados do guerreiro:", error);
    toast.error("Erro ao buscar dados do guerreiro");
    emit("error");
  } finally {
    loading.value = false;
  }
};

const updateKnight = async () => {
  try {
    const { isConfirmed } = await $swal.fire({
      title: "Atualizando guerreiro",
      html: `Deseja atualizar o guerreiro <strong>${
        knightUpdateData.value!.name
      }</strong>?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sim",
      confirmButtonColor: "blue",
      cancelButtonText: "Cancelar",
      cancelButtonColor: "gray",
    });
    if (!isConfirmed) return;
    await knightStore.updateKnight(id, {
      nickname: knightUpdateData.value!.nickname,
      weapons: knightUpdateData.value!.weapons,
    });
    toast.success("Guerreiro atualizado com sucesso!");
    emit("updated");
  } catch (error) {
    console.error("Erro ao atualizar guerreiro:", error);
    toast.error("Erro ao atualizar guerreiro");
  }
};

watch([id], fetchKnight, { immediate: true });
</script>
