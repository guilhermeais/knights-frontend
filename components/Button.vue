<template>
  <button :class="buttonClasses" @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  type: {
    type: String,
    default: "primary",
    validator: (value) => ["primary", "secondary", "danger"].includes(value),
  },
});

const buttonClasses = {
  "bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded":
    props.type === "primary",
  "bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded":
    props.type === "secondary",
  "bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded":
    props.type === "danger",
};
</script>
