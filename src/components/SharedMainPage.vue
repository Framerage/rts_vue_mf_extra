<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const list=ref<string[]>(['default'])
const onAddItem=()=>{
    list.value.push('test item')
}
</script>

<template>
    <div>line 1</div>
    <ul>
        <li v-for="(value,index) in list" :key="index">{{ value }} - {{ index }}</li>
    </ul>
    <div>line 2</div>
    <button @click="onAddItem"> add</button>
    <input type="range" :min="0" :max="10" :step="1" >
</template>

