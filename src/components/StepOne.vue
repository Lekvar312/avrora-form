<script setup>
import Input from "./UI/Input.vue";
import Select from "./UI/Select.vue";
import TelInput from "./UI/TelInput.vue";

defineProps({
  modelValue: { type: Object, required: true },
  data: { type: Array, required: true },
});

const emit = defineEmits(["update:modelValue"]);
</script>
<template>
  <fieldset class="border border-transparent border-b-stone-300">
    <div class="flex flex-col sm:flex-row sm:gap-1">
      <Input v-model="modelValue.name" label="Як тебе звати" id="name" placeholder="П.І.Б" :is-required="true" />
      <Select v-model="modelValue.country" :data="data" label="Місто в якому ти зараз живеш" id="country" placeholder="Наприклад Київ" />
    </div>
    <Input v-model="modelValue.age" label="Скільки повних років" id="age" placeholder="18" type="number" :is-required="true" />
  </fieldset>
  <fieldset class="flex flex-col sm:flex-row sm:gap-1">
    <TelInput v-model="modelValue.phoneNumber" label="Номер телефону" id="tel" placeholder="+380" />
    <Input v-model="modelValue.email" label="Вкажи свою електронну пошту" id="email" placeholder="email@gmail.com" type="email" :is-required="true" />
  </fieldset>
</template>
