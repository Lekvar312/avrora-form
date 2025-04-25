<script setup>
import { ArrowLeft, Check } from "lucide-vue-next";
import axios from "axios";
import { ref, reactive, watch, onMounted } from "vue";

import StepOne from "./StepOne.vue";
import StepTwo from "./StepTwo.vue";
import StepThree from "./StepThree.vue";
import StepFour from "./StepFour.vue";
import StepFive from "./StepFive.vue";

const step = ref(1);
const progress = ref(2);
const form = ref(null);

const formData = reactive({
  name: "",
  country: { id: "", label: "" },
  age: "",
  phoneNumber: "",
  email: "",
  resume: {
    hasResume: null,
    file: null,
  },
  jobs: [{ companyName: "", jobTitle: "", startJob: "", endJob: "", comment: "" }],
  dontHaveProfEducation: false,
  educationInstitution: [{ name: "", proffesion: "", stillStuding: false }],
  courses: "",
  languages: [{ name: "", level: { id: "", label: "" } }],
  programs: [
    { name: "1C", value: false },
    { name: "Google Sheets", value: false },
    { name: "Microsoft Pack", value: false },
  ],
  otherProgram: "",
  skills: "",
  policy: false,
});

watch(
  formData,
  () => {
    localStorage.setItem("formData", JSON.stringify(formData));
  },
  { deep: true }
);
onMounted(() => {
  const saveFormData = localStorage.getItem("formData");
  if (saveFormData) Object.assign(formData, JSON.parse(saveFormData));
});

const addItemToArray = (array, newItem) => {
  formData[array].push(newItem);
};

const incrementStep = () => {
  const isFormValid = formValidation();
  if (!isFormValid) {
    return;
  }
  if (step.value >= progress.value) return false;
  step.value += 1;
};
const decrementStep = () => {
  if (step.value <= 1) return false;
  step.value -= 1;
};

const formValidation = () => {
  const fields = form.value.querySelectorAll("[required]");
  let isValid = true;
  for (const field of fields) {
    if (!field.attachedListener) {
      field.addEventListener("input", () => {
        if (field.checkValidity()) {
          field.classList.remove("border-2", "border-red-400");
        }
      });
    }
    if (!field.checkValidity()) {
      field.reportValidity();
      field.classList.add("border-2", "border-red-400");
      isValid = false;
    }
  }
  return isValid;
};

const sendForm = async () => {
  if (!formValidation()) return;
  try {
    const response = await axios.post("http://localhost:5173/", formData);
    console.log("Успішно надіслано");
  } catch (error) {
    console.error("Не вдалося відправити форму", error);
  }
};

const cities = [
  { id: "1", label: "Київ, Київська область" },
  { id: "2", label: "Львів, Львівська область" },
  { id: "3", label: "Одеса, Одеська область" },
  { id: "4", label: "Харків, Харківська область" },
  { id: "5", label: "Дніпро, Дніпропетровська область" },
  { id: "6", label: "Чернівці, Чернівецька область" },
  { id: "7", label: "Полтава, Полтавська область" },
];

const languageLevel = [
  { id: "1", label: "low" },
  { id: "2", label: "middle" },
  { id: "3", label: "hight" },
  { id: "4", label: "fluent" },
];

watch(
  () => formData.resume.hasResume,
  (newValue) => {
    progress.value = newValue ? 2 : 5;
    if (!formData.resume.hasResume) {
      formData.resume.file = null;
    }
  }
);

const getStepTitle = () => {
  switch (step.value) {
    case 1:
      return "Розкажи про себе";
    case 2:
      return "Маєш готове резюме?";
    case 3:
      return "Досвід роботи";
    case 4:
      return "Освіта";
    case 5:
      return "Навички";
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
      <h1 class="font-bold text-lg">{{ getStepTitle() }}</h1>
    </div>
    <form ref="form" class="flex h-full flex-col gap-4 w-full">
      <div class="flex h-1 py-3 gap-2">
        <span v-for="(bar, index) in progress" class="h-1 bg-stone-200 rounded-full w-full" :class="{ 'bg-yellow-300': index + 1 === step }"></span>
      </div>
      <StepOne v-if="step === 1" :data="cities" v-model="formData" />
      <StepTwo v-if="step === 2" v-model="formData" />
      <StepThree v-if="step === 3" v-model="formData" :onAdd="addItemToArray" />
      <StepFour v-if="step === 4" v-model="formData" :onAdd="addItemToArray" />
      <StepFive v-if="step === 5" v-model="formData" :selectData="languageLevel" :onAdd="addItemToArray" />
      <button
        v-if="(step === 2 && formData.resume.hasResume) || step === 5"
        @click.prevent="sendForm"
        type="submit"
        :disabled="step === 5 && !formData.policy && !formValidation()"
        class="bg-yellow-300 border flex items-center justify-center gap-3 border-transparent disabled:opacity-50 cursor-pointer font-bold py-3 rounded-3xl enabled:hover:bg-transparent enabled:hover:border-black transition-all"
      >
        <Check stroke-width="1.5" /> Відправити
      </button>
      <button
        v-else
        @click.prevent="incrementStep()"
        class="bg-yellow-300 border border-transparent disabled:opacity-50 cursor-pointer font-bold py-3 rounded-3xl enabled:hover:bg-transparent enabled:hover:border-black transition-all"
      >
        Продовжити
      </button>
    </form>
  </section>
</template>
