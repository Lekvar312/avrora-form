<script setup>
import Input from "./UI/Input.vue";
import AddButton from "./UI/AddButton.vue";
import { X } from "lucide-vue-next";
const props = defineProps({
  modelValue: { type: Object, required: true },
  onAdd: { type: Function, required: true },
});
const addJob = () => {
  props.onAdd("jobs", { companyName: "", jobTitle: "", startJob: "", endJob: "", comment: "" });
};
</script>
<template>
  <div class="flex flex-col gap-4">
    <div v-for="(item, index) in props.modelValue.jobs" :key="index">
      <fieldset class="flex flex-col">
        <hr v-if="index > 0" class="border-slate-300" />
        <span class="flex items-end justify-end">
          <button @click="props.modelValue.jobs.splice(index, 1)" class="mt-2 cursor-pointer" v-if="index > 0">
            <X stroke-width="1.5" class="text-gray-600" />
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
    <AddButton label="Додати місце роботи" :onAdd="addJob" />
  </div>
</template>
