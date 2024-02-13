<template>
  <label :for="labelFor" class="block text-sm font-medium text-gray-700">
    {{ label }}
  </label>
  <input
    @input="handleChange"
    type="text"
    class="mt-1 p-2 border border-gray-300 rounded-md w-full"
  />
</template>

<script setup lang="ts">
defineProps({
  modelValue: String,
  label: String,
  labelFor: String,
});

const emit = defineEmits(["update:modelValue"]);

const handleChange = (event: any) => {
  emit("update:modelValue", event.target.value);
};
</script>
