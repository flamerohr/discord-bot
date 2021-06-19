import { useRouter } from 'next/router'
import { useState } from 'react'

const ChatRoom = () => {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [room, setRoom] = useState('')

  const handleClick = (e) => {
    e.preventDefault()
    router.push(`/chatroom/${room}/${username}`)
  }

  return (
    <div>
      <p>
        Put in the room name and your username so you can enter the chatroom.
      </p>
      <div>
        <label htmlFor='room'>Room: </label>
        <input id='room' type='text'
          value={room}
          onChange={(e) => setRoom(e.target.value)} />
        <br />
        <label htmlFor='username'>Username: </label>
        <input id='username' type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)} />

        <br/>
        <button onClick={handleClick}>Enter</button>
      </div>
    </div>
  )
}

export default ChatRoom;
