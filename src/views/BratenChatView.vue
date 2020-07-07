<template>

  <div class="bratenchatview">
    <h1 class="title">Dein BratenChat</h1>
    <BratChat/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { defineComponent } from '@vue/composition-api';
import BratChat from "@/components/BratChat.vue";

export default defineComponent({
    name:"BratenChatView",
    components: {
            BratChat
        }
})
</script>
