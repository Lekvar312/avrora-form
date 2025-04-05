<script setup>
defineProps({
  name: { type: String, required: true },
  id: { type: String, required: true },
  value: { type: Boolean, required: true },
  label: { type: String, required: true },
  modelValue: { type: Boolean, required: true },
});

const emit = defineEmits(["update:modelValue"]);
</script>
<template>
  <label :for="id" class="flex items-center gap-2 cursor-pointer">
    <input
      type="radio"
      :name="name"
      :id="id"
      :value="modelValue"
      class="hidden peer"
      :checked="modelValue === value"
      @change="$emit('update:modelValue', value)"
    />
    <span
      class="w-7 h-7 border-2 border-yellow-300 rounded-full flex items-center justify-center peer-checked:border-6 peer-checked:border-yellow-300 peer-checked:bg-black transition-all"
    >
    </span>
    {{ label }}
  </label>
</template>
