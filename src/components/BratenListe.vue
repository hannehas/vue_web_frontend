<template>
  <div class="bratenliste">    
    <button @click="reloadList()">
      <i class="fas fa-sync" />
    </button>
    <input v-model="suchwort" placeholder="Suchbegriff" />
    <table class="table">
      <thead>
        <th>Beschreibung</th>
        <th>Haltbar bis</th>
        <th>Vegetarizität</th>
        <th>Anbieter / Abholort</th>
      </thead>
      <tbody>
        <BratenListeZeile :braten="br" v-for="br in anzeigeliste" :key="br.id" @delete-zeile="removeZeile($event)"/> 
      </tbody>
    </table>
    <div class="message is-danger">{{errormessage}}</div>
    
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
    computed
} from "@vue/composition-api";

import BratenListeZeile from "@/components/BratenListeZeile.vue";
import { useBraten } from "@/service/BratenStore";

export default defineComponent({
  name: "BratenListe",
  components: {
    BratenListeZeile
  },
  setup() {
    const { liste, update, errormessage, remove } = useBraten(); 
    
    
    // Variable "suchwort" vereinbaren
    const suchwort = ref("");



    
    // sobald Komponente initialisiert ist, update() zum Füllen der "liste" ausführen
    onMounted(async () => {
     update();
    });


    // Funktion reloadList() soll auf Button-Druck Liste neu laden
    function reloadList(): void{
      location.reload();
    }
    
    function removeZeile(id: number){
      remove(id);
    }




    // Variable "anzeigeliste" soll nur diejenigen Einträge aus "liste" enthalten,
    // die "suchwort" enthalten (Groß-/Kleinschreibung egal) in
    // einem der Felder "beschreibung", "vollname" oder "abholort"
    // Wenn "suchwort" weniger als 3 Zeichen lang ist, soll "anzeigeliste"
    // die ganze Liste enthalten. 
    // Bei Änderungen von "suchwort" muss "anzeigeliste" sich sofort anpassen
    
    const anzeigeliste =  computed( () => {
      if(suchwort.value.length < 3){
        return liste.value;
      }else{
        return liste.value.filter(e => e.beschreibung.toLowerCase().includes(suchwort.value.toLowerCase()) || e.anbieter.vollname.toLowerCase().includes(suchwort.value.toLowerCase()) || 
        e.abholort.toLowerCase().includes(suchwort.value.toLowerCase()));
      }
    })
    
 
    

    return {
      anzeigeliste, reloadList, errormessage, suchwort, removeZeile
      /*
      removeZeile
      reloadList,
      errormessage,
      suchwort
      */
    };
  }
});
</script>

<style scoped>
.bratenlistetabelle {
  border: 1px solid #ccc;
}
</style>
