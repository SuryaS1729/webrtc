import { useEffect, useState } from "react"

export function Sender(){

  const [socket, setSocket] = useState<WebSocket | null>(null)


    useEffect(()=>{
        const socket = new WebSocket('ws://localhost:8080')

         socket.onopen=()=>{
          socket.send(JSON.stringify({type:"sender"}))
         }
         setSocket(socket)
    },[])


        async function startSendingVideo(){
          if(!socket)return
          //create a video 
          const pc = new RTCPeerConnection()
          pc.onnegotiationneeded = async ()=>{
            console.log('negotiation needed')
            const offer = await pc.createOffer()
            await pc.setLocalDescription(offer)
            socket?.send(JSON.stringify({type:'createOffer', sdp:pc.localDescription}))
  
          }
         
          pc.onicecandidate = (event)=>{
            console.log(event )
            if(event.candidate){

              socket?.send(JSON.stringify({type:'iceCandidate', candidate:event.candidate}))
              


            }}
        
          socket.onmessage= (event)=>{
            const data = JSON.parse(event.data)
            if(data.type === 'createAnswer'){
              pc.setRemoteDescription(data.sdp)
            }else if(data.type === 'iceCandidate' ){
              pc.addIceCandidate(data.candidate)
            }
          }
          const stream =  await navigator.mediaDevices.getUserMedia({video:true, audio:true})
          pc.addTrack(stream.getVideoTracks()[0])
          // pc.addTrack(stream.getAudioTracks()[0])
          
        }






  return <div> 





    <button onClick={startSendingVideo}>send video</button>


    sender
  </div>
}