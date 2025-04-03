<script setup>
defineProps({
  label: { type: String },
  id: { type: String },
  placeholder: { type: String },
  type: { type: String, default: "text" },
});
</script>
<template>
  <div class="flex flex-col py-3 w-full sm:w-1/2 px-1">
    <label :for="id" class="text-xs mb-3">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      class="bg-stone-100 py-1.5 px-3 rounded focus:outline-none"
      :placeholder="placeholder"
      required
      :min="type === 'number' ? 18 : null"
    />
  </div>
</template>
