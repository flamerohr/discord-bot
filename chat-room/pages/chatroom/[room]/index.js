import { useRouter } from 'next/router'
import { useState } from 'react'

const ChatRoom = () => {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const { room } = router.query

  const handleClick = (e) => {
    e.preventDefault()
    router.push(`/chatroom/${room}/${username}`)
  }
  
  return (
    <div>
      <p>
        Put in your username so you can enter the chatroom <em>{room}</em>.
      </p>
      <div>
        <label htmlFor='username'>Username: </label>
        <input id='username' type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)} />
        <button onClick={handleClick}>Enter</button>
      </div>
    </div>
  )
}

export default ChatRoom;