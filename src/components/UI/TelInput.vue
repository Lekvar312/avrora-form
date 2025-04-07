<script setup>
import { ref } from "vue";
defineProps({
  label: { type: String },
  id: { type: String },
  placeholder: { type: String },
  modelValue: { type: String },
});

const emit = defineEmits(["update:modelValue"]);

const phoneNumber = ref("");
const contryCode = ref("+380");

const handlePhoneNumber = () => {
  if (phoneNumber.value && !phoneNumber.value.startsWith(contryCode.value)) {
    phoneNumber.value = contryCode.value + phoneNumber.value;
  }
};
</script>
<template>
  <div class="flex flex-col py-3 w-full sm:w-1/2 px-1">
    <label :for="id" class="text-xs mb-3">{{ label }}</label>
    <input
      :value="modelValue"
      @input="(event) => emit('update:modelValue', event.target.value)"
      :id="id"
      type="tel"
      class="bg-stone-100 py-2.5 px-3 rounded focus:outline-none"
      :placeholder="placeholder"
      required
      @blur="handlePhoneNumber"
    />
  </div>
</template>
