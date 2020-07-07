<template>

  <div class="bratenlisteview">
    <h1 class="title">Das aktuelle Angebot</h1>
    <BratenListe/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {defineComponent} from "@vue/composition-api";
import BratenListe from "@/components/BratenListe.vue";

export default defineComponent({
    name: "BratenListeView",
        components: {
            BratenListe
        }
});
</script>