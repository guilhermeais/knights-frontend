<template>
  <label for="birthday" class="block text-sm font-medium text-gray-700"
    >Data de Nascimento:</label
  >
  <input
    v-model="dateString"
    type="date"
    id="birthday"
    name="birthday"
    class="mt-1 p-2 border border-gray-300 rounded-md w-full"
  />
</template>

<script setup lang="ts">
import { parse, isValid } from "date-fns";
const dateString = ref("");
defineProps({
  modelValue: Date,
});
const emit = defineEmits(["update:modelValue"]);

watch(
  () => dateString.value,
  (newValue) => {
    const date = parse(newValue, "yyyy-MM-dd", new Date());
    if (isValid(date)) emit("update:modelValue", date);
  }
);
</script>
