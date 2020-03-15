import React, { useState } from "react"

import useTwilioVideo from "../../hooks/use-twilio-video"

import "./styles.css"

const Join = () => {
  const { state, getRoomToken } = useTwilioVideo()
  const [identity, setIdentity] = useState("")
  const [roomName, setRoomName] = useState("")

  const handleSubmit = event => {
    event.preventDefault()

    getRoomToken({ identity, roomName })
  }

  return (
    <>
      <h1>Comece ou junte-se à uma sala.</h1>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <form onSubmit={handleSubmit}>
        <label htmlFor="identity">Digite seu nome:</label>
        <input
          type="text"
          id="identity"
          value={identity}
          onChange={event => setIdentity(event.target.value)}
        />

        <label htmlFor="room">Qual sala deseja criar ou se conectar?</label>
        <input
          type="text"
          id="room"
          value={roomName}
          onChange={event => setRoomName(event.target.value)}
        />

        <button type="submit">Entrar na sala</button>
      </form>
    </>
  )
}

export default Join
