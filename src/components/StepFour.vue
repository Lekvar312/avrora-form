<script setup>
import { X } from "lucide-vue-next";
import Checkbox from "./UI/Checkbox.vue";
import Input from "./UI/Input.vue";
import AddButton from "./UI/AddButton.vue";

const props = defineProps({
  modelValue: { type: Object, required: true },
  onAdd: { type: Function, required: true },
});

const addInstitute = () => {
  props.onAdd("educationInstitution", { name: "", proffesion: "", stillStudeing: null });
};
</script>
<template>
  <div class="flex flex-col gap-4">
    <Checkbox label="В мене нема професійної освіти" v-model="props.modelValue.dontHaveProfEducation" id="prof-education" />
    <fieldset v-if="!props.modelValue.dontHaveProfEducation" class="flex flex-col gap-4">
      <div v-for="(item, index) in props.modelValue.educationInstitution" :key="index">
        <hr v-if="index > 0" class="border-slate-300" />
        <span class="flex justify-end items-end">
          <button class="cursor-pointer mt-2" v-if="index > 0" @click="props.modelValue.educationInstitution.splice(index, 1)">
            <X stroke-width="1.5" class="text-gray-600" />
          </button>
        </span>
        <Input
          v-model="item.name"
          placeholder="Наприклад, Аврора"
          label="Навчальний заклад"
          :id="`school-${index}`"
          :is-required="true"
          :is-full="true"
        />
        <Input
          v-model="item.proffesion"
          placeholder="Продавець-консультант"
          label="Спеціальність"
          :id="`proffesion-${index}`"
          :is-required="true"
          :is-full="true"
        />
        <Checkbox label="Ще навчаюсь" v-model="item.stillStuding" :id="`peer-studing-${index}`" />
      </div>
      <AddButton label="Додати навчальний заклад" :onAdd="addInstitute" />
    </fieldset>
    <fieldset>
      <hr class="border-slate-300" v-if="!props.modelValue.dontHaveProfEducation" />
      <Input placeholder="Назва курса" v-model="props.modelValue.courses" label="Курси і тренінги (якщо є)" id="courses" :is-full="true" />
    </fieldset>
  </div>
</template>
