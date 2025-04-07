<script setup>
import { ChevronDown, ChevronUp } from "lucide-vue-next";

import { computed, ref, watch } from "vue";

const props = defineProps({
  id: { type: String, required: true },
  label: { type: String, required: true },
  placeholder: { type: String, required: true },
  isFull: { type: Boolean },
  data: { type: Array, required: true },
  modelValue: { type: Object, required: true },
});

const emit = defineEmits(["update:modelValue"]);

const isDropDownOpen = ref(false);

const searchQuerry = ref(props.modelValue.label || "");

watch(
  () => props.modelValue,
  (newValue) => {
    searchQuerry.value = newValue.label;
  },
  { immediate: true }
);

const dropDownToggle = () => {
  isDropDownOpen.value = !isDropDownOpen.value;
};

const selectData = (item) => {
  emit("update:modelValue", item);
  searchQuerry.value = item.label;
  isDropDownOpen.value = false;
};

const filteredItems = computed(() => {
  return props.data.filter((item) => item.label.toLowerCase().includes(searchQuerry.value.toLowerCase()));
});
</script>
<template>
  <div class="flex flex-col py-3 w-full" :class="!isFull ? 'sm:w-1/2' : ''">
    <label :for="id" class="text-xs mb-3">{{ label }}</label>
    <div class="flex items-center relative">
      <input
        @click="dropDownToggle"
        v-model="searchQuerry"
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
          v-for="item in filteredItems"
          :key="item.id"
          @click="selectData(item)"
          class="hover:bg-yellow-300 px-4 py-1 flex items-center gap-2 cursor-pointer"
        >
          <p>{{ item.label }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
