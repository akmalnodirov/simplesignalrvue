import {HubConnectionBuilder, LogLevel} from '@aspnet/signalr'

/*
class CallHub {
    constructor() {
        this.client = new HubConnectionBuilder()
            .withUrl('http://localhost:5279/metrics-hub')
            .build();
    }

    start() {
        Object.defineProperty(WebSocket, 'OPEN', {value: 1,});
        this.client.start();
    }
}

export default new CallHub();*/


const connection = new HubConnectionBuilder()
    .withUrl("http://localhost:5279/metrics-hub")
    .configureLogging(LogLevel.Information)
    .build();

async function start() {
    try {
        Object.defineProperty(WebSocket, 'OPEN', {value: 1,});
        await connection.start();
        console.log("SignalR Connected.");
    } catch (err) {
        console.log(err);
        setTimeout(start, 5000);
    }
};

connection.onclose(async () => {
    await start();
});

// Start the connection.
start();

export { connection };