import React, { createContext, useContext, useReducer, useRef } from "react"
import axios from "axios"
import { connect } from "twilio-video"

const INITIAL_STATE = {
  identity: false,
  roomName: false,
  // password: false,
  token: false,
  room: false,
}

const reducer = (state, action) => {
  switch (action.type) {
    case "join":
      return {
        ...state,
        token: action.token,
        identity: action.identity,
        roomName: action.roomName,
        // password: action.password,
      }

    case "set-active-room":
      return { ...state, room: action.room }

    case "disconnect":
      state.room && state.room.disconnect()
      return INITIAL_STATE

    default:
      return INITIAL_STATE
  }
}

const TwilioVideoContext = createContext()

const TwilioVideoProvider = ({ children }) => (
  <TwilioVideoContext.Provider value={useReducer(reducer, INITIAL_STATE)}>
    {children}
  </TwilioVideoContext.Provider>
)

export const wrapRootElement = ({ element }) => (
  <TwilioVideoProvider>{element}</TwilioVideoProvider>
)

const useTwilioVideo = () => {
  const [state, dispatch] = useContext(TwilioVideoContext)
  const videoRef = useRef()

  const getRoomToken = async ({ identity, roomName /*password*/ }) => {
    const result = await axios.post(process.env.TWILIO_TOKEN_URL, {
      identity,
      room: roomName,
      // password,
    })

    dispatch({
      type: "join",
      token: result.data,
      identity,
      roomName /*password*/,
    })
  }

  const handleRemoteParticipant = (container, participant) => {
    const id = participant.sid

    const el = document.createElement("div")
    el.id = id
    el.className = "remote-participant"

    const name = document.createElement("h6")
    name.innerText = participant.identity
    el.appendChild(name)

    container.appendChild(el)

    const addTrack = track => {
      const participantDiv = document.getElementById(id)
      const media = track.attach()

      participantDiv.appendChild(media)
    }

    participant.tracks.forEach(publication => {
      if (publication.isSubscribed) {
        addTrack(publication.track)
      }
    })

    participant.on("trackSubscribed", addTrack)

    participant.on("trackUnsubscribed", track => {
      track.detach().forEach(el => el.remove())

      const container = document.getElementById(id)
      if (container) container.remove()
    })
  }

  const connectToRoom = async () => {
    if (!state.token) {
      return
    }

    const room = await connect(state.token, {
      name: state.roomName,
      audio: true,
      video: { width: 360 },
      networkQuality: true,
      logLevel: "info",
    }).catch(error => {
      console.error(`Unable to join the room: ${error.message}`)
    })

    const localTrack = [...room.localParticipant.videoTracks.values()][0].track

    if (!videoRef.current.hasChildNodes()) {
      const localEl = localTrack.attach()

      videoRef.current.appendChild(localEl)
    }

    const handleParticipant = participant => {
      handleRemoteParticipant(videoRef.current, participant)
    }

    room.participants.forEach(handleParticipant)
    room.on("participantConnected", handleParticipant)

    dispatch({ type: "set-active-room", room })
  }

  const startVideo = () => connectToRoom()
  const leaveRoom = () => dispatch({ type: "disconnect" })

  return { state, getRoomToken, startVideo, leaveRoom, videoRef }
}

export default useTwilioVideo
