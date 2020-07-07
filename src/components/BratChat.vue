<template>
    <div class="bratchat">
        <input v-model="nachricht" placeholder="Nachricht" />
        <button @click="sendMessage()">abschicken</button>
        <ul>
            <li v-for="(l,id) in lines" :key="id">{{l}}</li>
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import {useBratChatService} from "@/service/BratChatService";
import {ref, onMounted} from  "@vue/composition-api";

export default defineComponent({
    name: "BratChat",

    setup(){
        const {lines, send, startChat} = useBratChatService();

        const nachricht= ref("");

        onMounted(async () => {
            startChat();
        });

        function sendMessage(): void{
            send(nachricht.value);

        }
        return {
            lines,
            send, 
            startChat,
            nachricht, 
            sendMessage

        }
    }
});
</script>