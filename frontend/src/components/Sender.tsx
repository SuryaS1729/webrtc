import { useEffect, useState } from "react"

export function Sender(){

  const [socket, setSocket] = useState<WebSocket | null>(null)


    useEffect(()=>{
        const socket = new WebSocket('ws://localhost:8000')

         socket.onopen=()=>{
          socket.send(JSON.stringify({type:"sender"}))
         }
    },[])


        async function startSendingVideo(){
          //create a video 
          const pc = new RTCPeerConnection()
          const offer = await pc.createOffer()
          await pc.setLocalDescription(offer)
          socket?.send(JSON.stringify({type:'createOffer', sdp:pc.localDescription}))
          
        }






  return <div> 





    <button onClick={startSendingVideo}>send video</button>


    sender
  </div>
}