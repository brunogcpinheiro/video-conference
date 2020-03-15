import React, { useState, useEffect } from "react"
import { navigate } from "gatsby"

import useTwilioVideo from "../../hooks/use-twilio-video"

import "./styles.css"

const Join = ({ location }) => {
  const defaultRoom =
    (location && location.state && location.state.roomName) || ""
  const { state, getRoomToken } = useTwilioVideo()
  const [identity, setIdentity] = useState("")
  const [roomName, setRoomName] = useState(defaultRoom)
  // const [password, setPassword] = useState("")

  useEffect(() => {
    if (state.token && state.roomName) {
      navigate(`/sala/${state.roomName}`)
    }
  }, [state])

  const handleSubmit = event => {
    event.preventDefault()

    getRoomToken({ identity, roomName /*password*/ })
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

        {/* <label htmlFor="room-password">
          Digite uma senha para criação ou acesso à sala:
        </label>
        <input
          type="password"
          id="room-password"
          value={password}
          onChange={event => setPassword(event.target.value)}
        /> */}

        <button type="submit">Entrar na sala</button>
      </form>
    </>
  )
}

export default Join
