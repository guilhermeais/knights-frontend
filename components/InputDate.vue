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
    :disabled="disabled"
  />
</template>

<script setup lang="ts">
import { parse, isValid, format } from "date-fns";
const dateString = ref("");

const { modelValue } = defineProps({
  modelValue: {
    type: Date,
    required: true,
  },
  disabled: Boolean,
});
const emit = defineEmits(["update:modelValue"]);

onMounted(() => {
  dateString.value = modelValue ? format(modelValue, "yyyy-MM-dd") : "";
});

watch(
  () => dateString.value,
  (newValue) => {
    const date = parse(newValue, "yyyy-MM-dd", new Date());
    if (isValid(date)) emit("update:modelValue", date);
  }
);
</script>
