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

    export let logs: {time: Date, message: string}[] = [];

    const connectWebsocket = () => {
        websocket = new WebSocket(`${process.env.VITE_WS_URL}:${process.env.VITE_WS_PORT}`);

        websocket.onopen = () => {
            const time = new Date();
            logs = [...logs, { time, message: 'WebSocket connected' }];
        };

        websocket.onmessage = (event) => {
            const time = new Date();
            logs = [...logs, { time, message: `Message received: ${event.data}` }];
        };

        websocket.onerror = (error) => {
            const time = new Date();
            logs = [...logs, { time, message: 'WebSocket error' }];
        };

        websocket.onclose = () => {
            const time = new Date();
            logs = [...logs, { time, message: 'WebSocket disconnected' }];
        };
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
    <button class="pl-2 pr-2 button-default" onclick={() => logs = []}>
        Clear Logs
    </button>
</div>
<hr/>
<div class="flex pl-2 h-[44px] items-center">
    Logs below
</div>
<hr/>
<div class="flex flex-col p-2 h-full border-b" style="height: 600px; overflow-y: auto;">
    {#each logs as log (log.time)}
        <div class="log-entry">
            <span>[{log.time.toLocaleTimeString()}]</span> - <span>{log.message}</span>
        </div>
    {/each}
</div>

