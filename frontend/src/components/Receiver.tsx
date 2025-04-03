import { useEffect } from "react"

export function Receiver(){


    useEffect(()=>{
        const socket = new WebSocket('ws://localhost:8080')

         socket.onopen=()=>{
          socket.send(JSON.stringify({type:"receiver"}))
         }

         socket.onmessage= async (event)=>{
          const message = JSON.parse(event.data)
          let pc:RTCPeerConnection | null = null
          console.log(message)
          if(message.type === 'createOffer'){
             pc = new RTCPeerConnection()
            pc.setRemoteDescription(message.sdp)

            pc.onicecandidate = (event)=>{
              console.log(event )
              if(event.candidate){
                socket?.send(JSON.stringify({type:'iceCandidate', candidate:event.candidate}))
              }}

              pc.ontrack = (track)=>{
                console.log(track)

              }


            const answer = await pc.createAnswer()
            await pc.setLocalDescription(answer)
            socket.send(JSON.stringify({type:'createAnswer', sdp:pc.localDescription}))
            
          }else if (message.type ==='iceCandidate'){
            if(pc!==null){
              //@ts-ignore
              pc.addIceCandidate(message.candidate)
            }
            
            
          }
         }
    },[])

     



  return <div> 








    receiver
  </div>
}