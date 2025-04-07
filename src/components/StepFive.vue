<script setup>
import Select from "./UI/Select.vue";
import AddButton from "./UI/AddButton.vue";
import Input from "./UI/Input.vue";
import Checkbox from "./UI/Checkbox.vue";
import RadioButton from "./UI/RadioButton.vue";

import { X } from "lucide-vue-next";

const props = defineProps({
  modelValue: { type: Object, required: true },
  selectData: { type: Array, required: true },
  onAdd: { type: Function, required: true },
});

const addLang = () => {
  const newLanguage = { name: "", level: { id: "", label: "" } };
  props.onAdd("languages", newLanguage);
};
</script>
<template>
  <div class="flex flex-col gap-4">
    <fieldset>
      <div v-for="(item, index) in props.modelValue.languages" :key="index">
        <hr v-if="index > 0" class="border-slate-300" />
        <span class="flex justify-end items-end">
          <button @click="props.modelValue.languages.splice(index, 1)" v-if="index > 0" class="cursor-pointer my-1">
            <X stroke-width="1.5" class="text-gray-600" />
          </button>
        </span>
        <Input v-model="item.name" label="Мова" placeholder="Українська" :id="`language-${index}`" :is-full="true" />
        <Select
          v-model="item.level"
          label="Рівень володіння"
          placeholder="Обери"
          :id="`language-level-${index}`"
          :data="selectData"
          :is-full="true"
        />
      </div>
      <AddButton label="Додати мову" :onAdd="addLang" />
    </fieldset>
    <hr class="border-slate-300" />
    <fieldset class="flex flex-col gap-2">
      <label class="text-xs mb-3 font-light">Володіння програмами</label>
      <Checkbox v-for="(program, index) in programs" :key="index" v-model="program.value" :label="program.name" />
      <Input placeholder="Інші програми" v-model="props.modelValue.otherProgram" label="" :is-full="true" id="another-programs" />
      <Input
        placeholder="Наприклад, володіння касою"
        v-model="props.modelValue.skills"
        label="Додаткові навички(за бажанням)"
        id="skills"
        :is-full="true"
      />
    </fieldset>
    <span class="flex max-w-max flex-col items-end">
      <RadioButton name="policy" v-model="props.modelValue.policy" :value="true" label="Даю згоду на обробку персональних даних" id="policy" />
      <a
        class="text-base font-light underline hover:text-yellow-400 transition-colors"
        href="https://robota.avrora.ua/politika-obrobki-ta-zaxistu-personalnix-danix"
        >Ознайомитись з політикою конфідеційності</a
      >
    </span>
  </div>
</template>
