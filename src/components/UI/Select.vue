<script setup>
import { ChevronDown, ChevronUp } from "lucide-vue-next";

import { ref, computed } from "vue";

const props = defineProps({
  id: { type: String, required: true },
  label: { type: String, required: true },
  placeholder: { type: String, required: true },
  isFull: { type: Boolean },
  data: { type: Array, required: true },
});

// const cities = [
//   { city: "Київ", region: "Київська область" },
//   { city: "Львів", region: "Львівська область" },
//   { city: "Одеса", region: "Одеська область" },
//   { city: "Харків", region: "Харківська область" },
//   { city: "Дніпро", region: "Дніпропетровська область" },
//   { city: "Чернівці", region: "Чернівецька область" },
//   { city: "Полтава", region: "Полтавська область" },
// ];

const isDropDownOpen = ref(false);

const searchTerm = ref("");

const filteredValue = computed(() => {
  return props.data.filter((item) => item.label.toLowerCase().includes(searchTerm.value.toLowerCase()));
});

const dropDownToggle = () => {
  isDropDownOpen.value = !isDropDownOpen.value;
};
</script>
<template>
  <div class="flex flex-col py-3 w-full" :class="!isFull ? 'sm:w-1/2' : ''">
    <label :for="id" class="text-xs mb-3">{{ label }}</label>
    <div class="flex items-center relative">
      <input
        v-model="searchTerm"
        @click="dropDownToggle"
        :id="id"
        type="search"
        class="bg-stone-100 w-full py-2.5 px-3 rounded rounded-r-none focus:outline-none"
        :placeholder="placeholder"
        required
      />
      <button class="w-10 bg-stone-100 py-2.5 rounded-r" type="button">
        <ChevronDown v-if="isDropDownOpen" />
        <ChevronUp v-else />
      </button>
      <ul v-if="isDropDownOpen" class="py-2 flex z-20 bg-white flex-col gap-2 absolute top-full w-full shadow-2xl">
        <li
          v-for="item in filteredValue"
          :key="item.id"
          @click="searchTerm = item.label"
          class="hover:bg-yellow-300 px-4 py-1 flex items-center gap-2 cursor-pointer"
        >
          <p>{{ item.label }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
