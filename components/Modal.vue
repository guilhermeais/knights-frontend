<template>
  <transition name="modal">
    <div
      class="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center"
      v-if="isOpen"
    >
      <div class="modal-overlay fixed inset-0 bg-black opacity-50"></div>

      <div
        class="modal-container bg-white max-w-lg mx-auto rounded-lg shadow-lg z-50 overflow-y-auto"
      >
        <div class="modal-content p-4">
          <div class="flex justify-end">
            <button class="modal-close p-2" @click="closeModal">&times;</button>
          </div>
          <div>
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
const props = defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(["close"]);

const closeModal = () => {
  emit("close");
};

watch(
  () => props.isOpen,
  (newValue) => {
    if (newValue === true) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }
);
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-container {
  max-height: 80vh;
}
</style>
