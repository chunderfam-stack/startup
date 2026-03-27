const GameEvent = {
    System: "system",
    End: "gameEnd",
    Start: "gameStart",
}

class EventMessage{
    constructor(from, type, value){
        this.from = from;
        this.type = type;
        this.value = value;
    }
}

class GameEventNotifier{
    events = [];
    handlers = [];

    constructor() {
        let port = window.location.port;
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
        this.socket.onopen = (event) => {
            
        };
        this.socket.onclose = (event) => {

        };
        this.socket.onmsg = async (msg) => {
            try{}
            catch{}
        };
    }
    
    broadcastEvent(from, type, value){
        const event = new EventMessage(from, type, value);
        this.socket.send(JSON.stringify(event));
    }

    addHandler(handler){
        this.handlers.push(handler);
    }

    removeHandler(handler){
        this.handlers.filter((h) => h !== handler);
    }

    recieveEvent(event){
        this.events.push(event)
    }
}