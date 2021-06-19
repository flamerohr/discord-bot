import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { socket } from '../../../../scripts/api'

const styles = {
  notification: {
    fontSize: '0.8em',
    color: '#777777'
  },
}

const ChatRoom = () => {
  const router = useRouter()
  const { room, username } = router.query

  const [messageToSend, setMessageToSend] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSendMessage = () => {
    if (messageToSend) {
      socket.emit('sendMessage', messageToSend)
      setMessageToSend('')
    }
  }

  useEffect(() => {
    if (room && username) {
      socket.emit('joinRoom', {
        room,
        name: username,
      }, (err) => {
        if (err)
          alert(err);
      })
    }
  }, [room, username])

  useEffect(() => {
    const handler = msg => {
      setMessages(messages => [...messages, {...msg, type: 'message'}]);
    };
    socket.on('message', handler)
    return () => {
      socket.off('message', handler)
    }
  })

  useEffect(() => {
    const handler = notif => {
      setMessages(messages => [...messages, {...notif, type: 'notification'}]);
    };

    socket.on('notification', handler)
    return () => {
      socket.off('message', handler)
    }
  })

  return (
    <div>
      <input type="text" value={messageToSend} onChange={(e) => setMessageToSend(e.target.value)} />
      <button type="button" onClick={handleSendMessage}>Send</button>
      <div id="message-container">
        {messages.map((message, index) =>
          <div key={index}>
          { message.type === 'message' &&
            <div>
              <strong>{message.username}</strong>: {message.content}
            </div>
            || message.type === 'notification' &&
            <div style={styles.notification}>
              <em>{message.title}</em> - {message.description}
            </div>
          }
          </div>
        )}
      </div>
    </div>
  )
}

export default ChatRoom;
