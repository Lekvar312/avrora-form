<script setup>
import { Plus } from "lucide-vue-next";

const props = defineProps({
  label: { type: String, required: true },
  onAdd: { type: Function, required: true },
});
</script>
<template>
  <button @click="props.onAdd" class="flex max-w-max gap-2 items-center cursor-pointer hover:text-yellow-500">
    <span class="bg-yellow-300 text-black rounded-full p-1.5"><Plus size="20" stroke-width="1.5" /></span>
    <span class="text-base font-light transition-colors">{{ label }}</span>
  </button>
</template>
