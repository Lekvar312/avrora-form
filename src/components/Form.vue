<script setup>
import { ArrowLeft } from "lucide-vue-next";

import { ref } from "vue";
import Input from "./Input.vue";
import TelInput from "./TelInput.vue";
import CountrySelect from "./CountrySelect.vue";

const step = ref(1);
const progress = ref(2);
const form = ref(null);
const incrementStep = () => {
  const isFormValid = form.value.checkValidity();
  if (!isFormValid) return;
  if (step.value >= 2) return false;
  step.value += 1;
};
const decrementStep = () => {
  if (step.value <= 1) return false;
  step.value -= 1;
};
</script>
<template>
  <section class="bg-white max-w-6xl w-full rounded px-10 py-10 flex flex-col">
    <div class="flex gap-2">
      <button v-show="step > 1" @click.prevent="decrementStep" class="cursor-pointer">
        <ArrowLeft />
      </button>
      <span v-show="step > 1" class="h-full w-0.5 bg-slate-200"></span>
      <h1 class="font-bold text-lg">Розкажи про себе</h1>
    </div>
    <form @submit.prevent="" ref="form" class="flex flex-col w-full">
      <div class="flex h-1 py-3 gap-2">
        <span
          v-for="(bar, index) in progress"
          class="h-1 bg-stone-200 rounded-full w-full"
          :class="{ 'bg-yellow-300': index + 1 === step }"
        ></span>
      </div>
      <fieldset class="border border-transparent border-b-stone-300">
        <div class="flex flex-col sm:flex-row">
          <Input label="Як тебе звати" id="name" placeholder="П.І.Б" :is-required="true" />
          <CountrySelect
            label="Місто в якому ти зараз живеш"
            id="country"
            placeholder="Наприклад Київ"
          />
        </div>
        <Input
          label="Скільки повних років"
          id="age"
          placeholder="18"
          type="number"
          :is-required="true"
        />
      </fieldset>
      <fieldset class="flex flex-col sm:flex-row">
        <TelInput label="Номер телефону" id="tel" placeholder="+380" />
        <Input
          label="Вкажи свою електронну пошту"
          id="email"
          placeholder="email@gmail.com"
          type="email"
          :is-required="true"
        />
      </fieldset>
      <button
        class="bg-yellow-300 border border-transparent cursor-pointer font-bold py-3 rounded-3xl hover:bg-transparent hover:border-black transition-all"
        @click="incrementStep"
      >
        Продовжити
      </button>
    </form>
  </section>
</template>
