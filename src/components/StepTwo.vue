<script setup>
import RadioButton from "./UI/RadioButton.vue";
defineProps({
  modelValue: { type: Object, required: true },
});
</script>
<template>
  <fieldset class="py-5">
    <div class="flex gap-4 py-5">
      <RadioButton v-model="modelValue.hasResume" name="resume" id="has-resume" :value="true" label="Так" />
      <RadioButton v-model="modelValue.hasResume" name="resume" id="has-not-resume" :value="false" label="Ні" />
    </div>
    <div v-if="modelValue.hasResume" class="flex gap-1">
      <label
        for="resume-file"
        class="relative h-40 border border-dashed border-stone-300 rounded-2xl p-2 w-full flex items-center justify-center cursor-pointer"
      >
        <input type="file" id="resume-file" accept=".pdf, .doc, .docx, .jpeg, .jpg" class="hidden" />
        <span class="font-light">Прикріпити резюме</span>
        <span class="absolute bottom-2 right-4 text-xs font-light text-neutral-400">100mb limit</span>
        <span class="absolute bottom-2 left-2 text-xs font-light text-neutral-400">PDF, DOC, DOCX, JPEG, JPG</span>
      </label>
    </div>
  </fieldset>
</template>
