<script setup>
defineProps({
  label: { type: String, required: true },
  id: { type: String, required: true },
  placeholder: { type: String, required: true },
  type: { type: String, default: "text" },
  isRequired: { type: Boolean, required: true },
});
</script>
<template>
  <div class="flex flex-col py-3 w-full sm:w-1/2 px-1">
    <label :for="id" class="text-xs mb-3 relative z-10"
      >{{ label }} <span v-if="isRequired" class="absolut z-20 top-0 px-1">*</span></label
    >
    <input
      :id="id"
      :type="type"
      class="bg-stone-100 py-2.5 px-3 rounded focus:outline-none"
      :placeholder="placeholder"
      required
      :min="type === 'number' ? 18 : null"
    />
  </div>
</template>
