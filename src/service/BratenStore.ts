// Wir sind noch auf Vue2, daher muss Vue3-Composition-API nachregistriert werden,
// damit reactive(), compute(), ref() und Co funktionieren
//////////////////////////////////////////////////////////////////////////////
import Vue from 'vue'
import CompositionApi, { reactive, onMounted } from '@vue/composition-api'
Vue.use(CompositionApi)
//////////////////////////////////////////////////////////////////////////////

import { computed } from '@vue/composition-api'

import '@/service/Braten'
import {Client} from '@stomp/stompjs';

/**************************************************/
const wsurl = "ws://localhost:9090/stompbroker";
const DEST = "/topic/braten";

const state = reactive({
  liste: Array<Braten>(),
  errormessage: ""
})

function push(ele: Braten): void {
  state.liste.push(ele)
}


async function update() {

  
  const bratenliste = new Array<Braten>();
  const alt = state.liste; 
  /*const bratenliste = [
    {
      "id": 2, "version": 0, "anbieter": { "loginname": "waldi", "vollname": "Waldemar Wunderlich", "nutzungsbedingungenok": true },
      "abholort": "Eckstrasse 42, 54734 Wohlguck", "haltbarbis": "2021-09-27",
      "beschreibung": "Experimenteller Bratburgerbraten", "vgrad": 100
    },
    {
      "id": 13, "version": 0, "anbieter": { "loginname": "jogi", "vollname": "Joghurta Biffel", "nutzungsbedingungenok": true },
      "abholort": "Am Zipfel 1, 12345 Vollradisroda", "haltbarbis": "2022-11-17",
      "beschreibung": "Super leckerer Bratwurstbraten", "vgrad": 25
    },
    {
      "id": 3, "version": 0, "anbieter": { "loginname": "joebi", "vollname": "Joendhard Biffel", "nutzungsbedingungenok": true },
      "abholort": "Schneisenbruch 645, 01534 Vollradisroda", "haltbarbis": "2024-12-22",
      "beschreibung": "Synthetischer Gummibraten mit Bemmenbröseln", "vgrad": 50
    },
        {
          "id": 6, "version": 0, "anbieter": { "loginname": "mari", "vollname": "Marizzibel", "nutzungsbedingungenok": true },
          "abholort": "Bahnhofplatz 8, 20532 Paddelsdorf", "haltbarbis": "2021-03-12",
          "beschreibung": "Selbstinspirierter Pilzbraten mit Zuckerguss", "vgrad": 100
        },
    {
      "id": 14, "version": 0, "anbieter": { "loginname": "jogi", "vollname": "Joghurta Biffel", "nutzungsbedingungenok": true },
      "abholort": "Am Wackeldackel 21, 12345 Dohanne", "haltbarbis": "2022-09-14",
      "beschreibung": "Schwaebischer Schupfnudelbraten mit Erweiterungen", "vgrad": 25
    },
    {
      "id": 5, "version": 0, "anbieter": { "loginname": "joebi", "vollname": "Joendhard Biffel", "nutzungsbedingungenok": true },
      "abholort": "Schneisenbruch 648, 01534 Vollradisroda", "haltbarbis": "3017-12-31",
      "beschreibung": "Sehr haltbarer Carbon-verstärkter Bratling, trotzdem lecker", "vgrad": 75
    },
    {
      "id": 7, "version": 0, "anbieter": { "loginname": "mari", "vollname": "Marizzibel", "nutzungsbedingungenok": true },
      "abholort": "Bahnhofvorplatz 8, 20532 Paddelsdorf", "haltbarbis": "2022-07-16",
      "beschreibung": "Magenprüfender therapeutischer Pfostenbraten", "vgrad": 75
    },
    {
      "id": 1, "version": 0, "anbieter": { "loginname": "waldi", "vollname": "Waldemar Wunderlich", "nutzungsbedingungenok": true },
      "abholort": "Eckstrasse 42, 54734 Wohlguck", "haltbarbis": "2022-01-07",
      "beschreibung": "Bereits genutzter Anbraten", "vgrad": 0
    },

  ]*/

  fetch(`http://localhost:8080/api/braten`,{
    method: 'GET'
  })
  .then((resp)=>{
    if(!resp.ok){
      return bratenliste;
    }
    state.errormessage="";
    return resp.json();
  })
  .then((jsondata: Array<Braten>)=>{
    for(let i = 0; i < jsondata.length; i++){
        bratenliste.push(jsondata[i]);
    }
    state.liste = bratenliste;
  })
  .catch((fehler)=>{
    fehler.state.errormessage ="Fehler bei der Serverkommunikation";
    state.liste = alt;
  })
  // bei jedem update() Liste verwuseln, damit man einen Effekt sieht
  //state.liste = bratenliste.sort(() => Math.random()-0.5)
}

async function remove(id: number){

  fetch(`http://localhost:8080/api/braten/${id}`,{
    method: 'DELETE'
  })
  .then((response)=>{
    if(!response.ok){
      throw new Error(state.errormessage);
    }
    update();
  })
  .catch((fehler)=>{
    state.errormessage = fehler;
  })

}

/*
 * Die exportierte use..()-Funktion gibt gezielten Zugriff auf von außen nutzbare Features
 * Verwendung einfach mit import und Auswahl gewünschter Features, z.B. so:
 * const { liste, update } = useBraten()
 */



const stompclient = new Client({brokerURL: wsurl})
stompclient.onConnect= ()=>{
  stompclient.subscribe(DEST, (message)=> {
    const x = JSON.parse(message.body) as BratenMessage;

    if( x.operation == "delete"){
      remove(x.braten.id);
      
    }else if(x.operation =="change"){
      update();
    }
  })
}
stompclient.activate();

export function useBraten() {
  return {
    // computed() zur Erzeugung einer zwar reaktiven, aber read-only-Version der Liste und der Fehlermeldung
    liste: computed(() => state.liste),
    errormessage: computed(() => state.errormessage),
    remove,
    update,
    push,
  }
}

