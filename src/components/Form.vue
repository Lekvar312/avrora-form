<script setup>
import { ArrowLeft } from "lucide-vue-next";

import { ref } from "vue";
import Input from "./UI/Input.vue";
import TelInput from "./UI/TelInput.vue";
import CountrySelect from "./UI/CountrySelect.vue";
import Checkbox from "./UI/Checkbox.vue";

const step = ref(1);
const progress = ref(2);
const form = ref(null);
const hasResume = ref(null);
const incrementStep = () => {
  const isFormValid = form.value.checkValidity();
  // if (!isFormValid) return;
  if (step.value >= 2) return false;
  step.value += 1;
};
const decrementStep = () => {
  if (step.value <= 1) return false;
  step.value -= 1;
};

const progressBar = () => (hasResume.value ? (progress.value = 2) : (progress.value = 5));

const getTitle = () => {
  switch (step.value) {
    case 1:
      return "Розкажи про себе";
    case 2:
      return "Маєш готове резюме?";
    default:
      return "Розкажи про себе";
  }
};
</script>
<template>
  <section class="bg-white max-w-6xl w-full rounded px-10 py-10 flex flex-col">
    <div class="flex gap-2">
      <button v-show="step > 1" @click.prevent="decrementStep" class="cursor-pointer">
        <ArrowLeft class="text-slate-600" />
      </button>
      <span v-show="step > 1" class="h-full w-0.5 bg-slate-200"></span>
      <h1 class="font-bold text-lg">{{ getTitle() }}</h1>
    </div>
    <form @submit.prevent="" ref="form" class="flex flex-col w-full">
      <div class="flex h-1 py-3 gap-2">
        <span v-for="(bar, index) in progress" class="h-1 bg-stone-200 rounded-full w-full" :class="{ 'bg-yellow-300': index + 1 === step }"></span>
      </div>
      <div v-if="step === 1">
        <fieldset class="border border-transparent border-b-stone-300">
          <div class="flex flex-col sm:flex-row">
            <Input label="Як тебе звати" id="name" placeholder="П.І.Б" :is-required="true" />
            <CountrySelect label="Місто в якому ти зараз живеш" id="country" placeholder="Наприклад Київ" />
          </div>
          <Input label="Скільки повних років" id="age" placeholder="18" type="number" :is-required="true" />
        </fieldset>
        <fieldset class="flex flex-col sm:flex-row">
          <TelInput label="Номер телефону" id="tel" placeholder="+380" />
          <Input label="Вкажи свою електронну пошту" id="email" placeholder="email@gmail.com" type="email" :is-required="true" />
        </fieldset>
      </div>
      <div v-if="step === 2">
        <fieldset class="py-5">
          <div class="flex gap-4 py-5">
            <Checkbox v-model="hasResume" name="resume" id="has-resume" :value="true" label="Так" @change="progressBar()" />
            <Checkbox v-model="hasResume" name="resume" id="has-not-resume" :value="false" label="Ні" @change="progressBar()" />
          </div>
          <div v-if="hasResume" class="flex">
            <label
              for="resume-file"
              class="relative h-40 border border-dashed border-stone-300 rounded-2xl p-2 w-full flex items-center justify-center cursor-pointer"
            >
              <input type="file" id="resume-file" accept=".pdf, .doc, .docx, .jpeg, .jpg" class="hidden" />
              <span class="font-light">Прикріпити резюме</span>
              <span class="absolute bottom-2 right-4 font-light text-neutral-400">100mb limit</span>
              <span class="absolute bottom-2 left-2 font-light text-neutral-400">PDF, DOC, DOCX, JPEG, JPG</span>
            </label>
          </div>
        </fieldset>
      </div>
      <button
        @click="incrementStep"
        class="bg-yellow-300 border border-transparent cursor-pointer font-bold py-3 rounded-3xl hover:bg-transparent hover:border-black transition-all"
      >
        Продовжити
      </button>
    </form>
  </section>
</template>
