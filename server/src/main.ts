import WebSocket from "ws";
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.WS_PORT;

function runServer() {
    if(!PORT) {
        console.error("PORT is not defined.")
        return;
    }

    const wss = new WebSocket.Server({port: parseInt(PORT)}, () => {
        console.log(`WebSocket server is running on ws://localhost:${PORT}`);
    });
    
    wss.on('connection', (ws) => {
        console.log('New client connected');
    
        // 클라이언트로부터 메시지 수신
        ws.on('message', (message) => {
            console.log(`Received: ${message}`);
            // 클라이언트에 메시지 되돌려주기 (에코)
            ws.send(`Server: ${message}`);
        });
    
        // 클라이언트 연결 종료 처리
        ws.on('close', () => {
            console.log('Client disconnected');
        });
    });
    
    // 에러 처리
    wss.on('error', (error) => {
        console.error(`WebSocket server error: ${error.message}`);
    });
}

runServer();

