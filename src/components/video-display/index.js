import React, { useEffect } from "react"
import { navigate } from "gatsby"

import useTwilioVideo from "../../hooks/use-twilio-video"

import "./styles.css"

const VideoDisplay = ({ roomID }) => {
  const { state, startVideo, leaveRoom, videoRef } = useTwilioVideo()

  useEffect(() => {
    if (!state.token) {
      navigate("/", { state: { roomName: roomID } })
    }

    if (!state.room) {
      startVideo()
    }

    window.addEventListener("beforeunload", leaveRoom)

    return () => {
      window.addEventListener("beforeunload", leaveRoom)
    }
  }, [state, roomID, startVideo, leaveRoom])

  return (
    <>
      <h1>Sala: "{roomID}"</h1>
      {state.room && (
        <button className="leave-room" onClick={leaveRoom}>
          Sair da sala
        </button>
      )}
      <div className="chat" ref={videoRef} />
    </>
  )
}

export default VideoDisplay
