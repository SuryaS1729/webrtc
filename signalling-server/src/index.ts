import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });


let senderSocket: null| WebSocket = null;
let receiverSocket: any= null;



wss.on('connection',function connection(ws){
    ws.on('error',console.error)
    ws.on('message', function message(data: any) {
        const message = JSON.parse(data);
        console.log(message)
        //we have to support the following messages to establisha a webrtc connection
        //identify-as-sender
        //identify-as-receiver

        if(message.type==="identify-as-sender"){
            senderSocket = ws;
        }else if(message.type==="identify-as-receiver"){
            receiverSocket = ws;
        }else if (message.type === 'create-offer'){
            receiverSocket.send(JSON.stringify({type:'offer', offer:message.offer}))
        }
        
        //create Offer
        //create Answer
        //add ice candidate

      });
})