import React, { useState } from "react"

import "./join.css"

const Join = () => {
  const [identity, setIdentity] = useState("")
  const [roomName, setRoomName] = useState("")

  return (
    <>
      <h1>Comece ou junte-se à uma sala.</h1>
      <form>
        <label htmlFor='identity'>Digite seu nome:</label>
        <input type='text' id='identity' />

        <label htmlFor='room'>Em qual sala deseja se conectar?</label>
        <input type='text' id='room' />

        <button type='submit'>Entrar na sala</button>
      </form>
    </>
  )
}

export default Join
