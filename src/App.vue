<template>
  <section id="app">
    <div class="hero is-primary">
      <div class="hero-body">
        <h1 class="title">Braten deluxe</h1>
        <h2 class="subtitle">... jetzt mit noch mehr Klicken</h2>
      </div>
    </div>

    <div class="block">
        <div class="navbar-menu is-active">
         <!-- <a href="/liste" class="navbar-item">Bratenliste</a>
          <a href="/chat" class="navbar-item">Bratenwelt</a>-->
          <router-link to ="/liste" class="navbar-item">Bratenliste </router-link>
          <router-link to ="/chat" class="navbar-item"> Bratenchat</router-link>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <a href="/logout" class="navbar-item">Logout</a>
          </div>
        </div>
    </div>

    <div class="columns">
      <div class="column is-three-quarters">
        <div class="block">
          <div class="box">
            <router-view/>
          </div>
        </div>
      </div>
      <div class="column">
        <VegetarizitaetsRechner/>
        <BratChat/>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import VegetarizitaetsRechner from "@/components/VegetarizitaetsRechner.vue"
import BratChat from "@/components/BratChat.vue"
import router from "@/router"

export default Vue.extend({
  name: "App",
  components: {
    VegetarizitaetsRechner,
    BratChat
  }
});
</script>

<style>
</style>
