import Vue from 'vue'
import CompositionApi, { ref, computed } from '@vue/composition-api'
import { Client } from '@stomp/stompjs'
Vue.use(CompositionApi)

const lines = ref(new Array<string>());
const isConnected = ref(Boolean());

const wsurl = "ws://localhost:9090/stompbroker";

let stompClient: Client;



function send(nachricht: string): void{
    const DEST = "/topic/bratchat/toserver";

    try{
        stompClient.publish({destination: DEST, headers: {}, body:nachricht});
    }catch(fehler){
        console.log("Fehler");
    }
    
}

function startChat(): void{
    const DEST = "/topic/bratchat/fromserver"

    if(stompClient==null){
        stompClient = new Client({brokerURL: wsurl});

        stompClient.onConnect = () => {
            isConnected.value = true;
            stompClient.subscribe(DEST,(message)=>{
                if(lines.value.length == 20){
                    lines.value.splice(19, 1);
                }
                lines.value.splice(0,0, message.body);

            })
        }
      stompClient.activate();
    
    }
}

export function useBratChatService(){
    return{
        lines: computed(()=> lines),
        isConnected: computed(()=> isConnected),
        send,
        startChat
    }
}