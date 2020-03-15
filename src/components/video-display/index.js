import React, { useEffect } from "react"
import { navigate } from "gatsby"

import useTwilioVideo from "../../hooks/use-twilio-video"

import "./styles.css"

const VideoDisplay = ({ roomID }) => {
  const { state, startVideo, videoRef } = useTwilioVideo()

  useEffect(() => {
    if (!state.token) {
      navigate("/", { state: { roomName: roomID } })
    }

    if (!state.room) {
      startVideo()
    }
  }, [state, roomID, startVideo])

  return (
    <>
      <h1>Sala: "{roomID}"</h1>
      <div className="chat" ref={videoRef} />
    </>
  )
}

export default VideoDisplay