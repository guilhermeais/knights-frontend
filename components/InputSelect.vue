<template>
  <div class="relative">
    <select
      v-model="selectedValue"
      :disabled="disabled"
      @change="handleChange"
      class="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:border-blue-500"
    >
      <option
        v-for="(option, index) in options"
        :key="index"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
    <div
      class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
    >
      <svg
        class="fill-current h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M10 12l-6-6 1.5-1.5L10 9l4.5-4.5L16 6l-6 6z" />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";

const props = defineProps({
  options: {
    type: Array<{
      label: string;
      value: string | number;
    }>,
    required: true,
  },
  value: {
    type: [String, Number],
    default: "",
  },
  disabled: Boolean,
  modelValue: {
    type: [String, Number],
    default: "",
  },
});

const emits = defineEmits(["update:modelValue"]);

const selectedValue = ref<string | number | null>(null);

onMounted(() => {
  selectedValue.value = props.modelValue;
});
const handleChange = (event: any) => {
  selectedValue.value = event.target.value;
  emits("update:modelValue", selectedValue.value);
};
</script>
