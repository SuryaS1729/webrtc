import { useEffect } from "react"

export function Receiver(){


    useEffect(()=>{
        const socket = new WebSocket('ws://localhost:8000')

         socket.onopen=()=>{
          socket.send(JSON.stringify({type:"receiver"}))
         }
    },[])





  return <div> 








    receiver
  </div>
}