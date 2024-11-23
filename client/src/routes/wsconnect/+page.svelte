<style>
    .button-default {
        color: white; 
        background: rgb(61, 123, 255); 
        border-radius: 4px;
        transition: 0.2s;
    }

    .button-default:hover {
        background: rgb(114, 159, 255);
        transition: 0.2s;
    }
</style>
<script lang="ts">
    export let websocket: WebSocket | null = null;

    const connectWebsocket = () => {
        websocket = new WebSocket('ws://localhost:8080');
    };
</script>

<div class="flex h-[44px] items-center pl-2" style='background: skyblue'>
    WS Test
</div>
<hr/>
<div class="flex flex-row h-[36px] items-center pl-2 gap-4">
    <div>
        Tools
    </div>
    <button class="pl-2 pr-2 button-default" onclick={connectWebsocket}>
        Connect Websocket
    </button>
</div>
<hr/>
<div class="flex pl-2 h-[44px] items-center">
    Logs below
</div>
<hr/>
