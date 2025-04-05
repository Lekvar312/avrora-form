<script setup>
import { Check } from "lucide-vue-next";
defineProps({
  id: { type: String, required: true },
  label: { type: String, required: true },
  modelValue: { type: Boolean, required: true },
});

const emit = defineEmits(["update:modelValue"]);
</script>
<template>
  <label :for="id" class="flex items-center gap-3 cursor-pointer">
    <input :checked="modelValue" :id="id" @change="(event) => emit('update:modelValue', event.target.checked)" type="checkbox" class="hidden peer" />
    <span class="w-8 h-8 flex items-center justify-center rounded border border-slate-200 peer-checked:bg-yellow-300 peer-checked:border-yellow-300">
      <Check v-show="modelValue" stroke-width="1.5  " />
    </span>
    {{ label }}
  </label>
</template>
