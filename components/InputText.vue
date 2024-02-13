<template>
  <label :for="labelFor" class="block text-sm font-medium text-gray-700">
    {{ label }}
  </label>
  <input
    @input="handleChange"
    :value="modelValue"
    type="text"
    class="mt-1 p-2 border border-gray-300 rounded-md w-full"
    :disabled="disabled"
  />
</template>

<script setup lang="ts">
defineProps({
  modelValue: String,
  label: String,
  labelFor: String,
  disabled: Boolean,
});

const emit = defineEmits(["update:modelValue"]);

const handleChange = (event: any) => {
  emit("update:modelValue", event.target.value);
};
</script>
