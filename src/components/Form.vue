<script setup>
import { ArrowLeft, Plus, X, Check } from "lucide-vue-next";

import { ref } from "vue";
import Input from "./UI/Input.vue";
import TelInput from "./UI/TelInput.vue";
import CountrySelect from "./UI/CountrySelect.vue";
import RadioButton from "./UI/RadioButton.vue";
import Checkbox from "./UI/Checkbox.vue";

const step = ref(1);
const progress = ref(2);
const form = ref(null);
const hasResume = ref(null);
const dontHaveProfEducation = ref(false);
const isStuding = ref(false);

const addJob = () => {
  jobs.value.push({ company: "", jobTitle: "", startJob: "", endJob: "", comment: "" });
};

const jobs = ref([
  {
    companyName: "",
    jobTitle: "",
    startJob: "",
    endJob: "",
    comment: "",
  },
]);

const collages = ref([{ collageName: "", proffesion: "", peerStuding: false }]);

const addCollage = () => {
  collages.value.push({ collageName: "", proffesion: "", peerStuding: false });
};

const incrementStep = () => {
  const isFormValid = form.value.checkValidity();
  // if (!isFormValid) return;
  if (step.value >= progress.value) return false;
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
    case 3:
      return "Досвід роботи";
    case 4:
      return "Освіта";
    default:
      return "Розкажи про себе";
  }
};
</script>
<template>
  <section class="bg-white max-w-6xl w-full rounded px-10 py-10 flex flex-col">
    <div class="flex gap-2 h-full">
      <button v-show="step > 1" @click.prevent="decrementStep" class="cursor-pointer">
        <ArrowLeft class="text-slate-600" />
      </button>
      <span v-show="step > 1" class="h-full w-0.5 bg-slate-200"></span>
      <h1 class="font-bold text-lg">{{ getTitle() }}</h1>
    </div>
    <form @submit.prevent="" ref="form" class="flex h-full flex-col gap-4 w-full">
      <div class="flex h-1 py-3 gap-2">
        <span v-for="(bar, index) in progress" class="h-1 bg-stone-200 rounded-full w-full" :class="{ 'bg-yellow-300': index + 1 === step }"></span>
      </div>
      <div v-if="step === 1">
        <fieldset class="border border-transparent border-b-stone-300">
          <div class="flex flex-col sm:flex-row sm:gap-1">
            <Input label="Як тебе звати" id="name" placeholder="П.І.Б" :is-required="true" />
            <CountrySelect label="Місто в якому ти зараз живеш" id="country" placeholder="Наприклад Київ" />
          </div>
          <Input label="Скільки повних років" id="age" placeholder="18" type="number" :is-required="true" />
        </fieldset>
        <fieldset class="flex flex-col sm:flex-row sm:gap-1">
          <TelInput label="Номер телефону" id="tel" placeholder="+380" />
          <Input label="Вкажи свою електронну пошту" id="email" placeholder="email@gmail.com" type="email" :is-required="true" />
        </fieldset>
      </div>
      <div v-if="step === 2">
        <fieldset class="py-5">
          <div class="flex gap-4 py-5">
            <RadioButton v-model="hasResume" name="resume" id="has-resume" :value="true" label="Так" @change="progressBar()" />
            <RadioButton v-model="hasResume" name="resume" id="has-not-resume" :value="false" label="Ні" @change="progressBar()" />
          </div>
          <div v-if="hasResume" class="flex gap-1">
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
      </div>
      <div v-if="step === 3" class="flex flex-col gap-4">
        <div v-for="(item, index) in jobs" :key="index">
          <fieldset class="flex flex-col" :class="index > 0 ? 'border-t border-slate-200' : ''">
            <span class="flex items-end justify-end">
              <button @click="jobs.splice(index, index)" class="mt-2 cursor-pointer" v-if="index > 0">
                <X class="text-slate-400 items-end justify-end" />
              </button>
            </span>
            <div class="flex flex-col sm:flex-row sm:gap-1">
              <Input v-model="item.companyName" label="Компанія" :id="`company-${index}`" placeholder="Наприклад Аврора" />
              <Input v-model="item.jobTitle" label="Посада" :id="`job-title-${index}`" placeholder="Продавець консультант" />
            </div>
            <div class="flex flex-col sm:flex-row sm:gap-1">
              <Input v-model="item.startJob" label="Початок роботи" :id="`start-job-${index}`" placeholder="Дата" type="date" />
              <Input v-model="item.endJob" label="Кінець роботи" :id="`end-job-${index}`" placeholder="Дата" type="date" />
            </div>
            <div class="flex flex-col">
              <label class="text-xs mb-3 px-1" :for="`comment-${index}`">Коментар (за бажанням)</label>
              <textarea
                placeholder="Наприклад, ваші досягнення чи обов`язки"
                v-model="item.comment"
                maxlength="300"
                :id="`comment-${index}`"
                class="bg-stone-100 w-full p-0 py-2.5 px-2 resize-none focus:outline-none rounded"
              ></textarea>
            </div>
          </fieldset>
        </div>
        <button @click="addJob()" class="flex max-w-max gap-2 items-center cursor-pointer hover:text-yellow-500">
          <span class="bg-yellow-300 text-black rounded-full p-1.5"><Plus size="20" stroke-width="1.5" /></span>
          <span class="text-lg font-light transition-colors">Додати місце роботи</span>
        </button>
      </div>
      <div v-if="step === 4" class="flex flex-col gap-4">
        <Checkbox label="В мене нема професійної освіти" v-model="dontHaveProfEducation" id="prof-education" />
        <fieldset v-if="!dontHaveProfEducation" class="flex flex-col gap-4">
          <div v-for="(item, index) in collages" :key="index">
            <Input placeholder="Наприклад, Аврора" label="Навчальний заклад" :id="`school-${index}`" :is-required="true" :is-full="true" />
            <Input placeholder="Продавець-консультант" label="Спеціальність" :id="`proffesion-${index}`" :is-required="true" :is-full="true" />
            <Checkbox label="Ще навчаюсь" :id="`peer-studing-${index}`" v-model="item.isStuding" />
          </div>
          <button @click="addCollage()" class="flex max-w-max gap-2 items-center cursor-pointer hover:text-yellow-500">
            <span class="bg-yellow-300 text-black rounded-full p-1.5"><Plus size="20" stroke-width="1.5" /></span>
            <span class="text-lg font-light transition-colors">Додати місце роботи</span>
          </button>
        </fieldset>
        <fieldset :class="!dontHaveProfEducation ? 'border-t border-slate-200' : ''">
          <Input placeholder="Назва курса" label="Курси і тренінги (якщо є)" id="courses" :is-full="true" />
        </fieldset>
      </div>
      <button
        @click="incrementStep()"
        class="bg-yellow-300 border border-transparent cursor-pointer font-bold py-3 rounded-3xl hover:bg-transparent hover:border-black transition-all"
      >
        Продовжити
      </button>
    </form>
  </section>
</template>
