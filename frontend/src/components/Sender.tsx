import { useEffect } from "react"

export function Sender(){


    useEffect(()=>{
        const socket = new WebSocket('ws://localhost:8000')

         socket.onopen=()=>{
          socket.send(JSON.stringify({type:"sender"}))
         }
    },[])





  return <div> 








    sender
  </div>
}