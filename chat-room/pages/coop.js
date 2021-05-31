import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react';
import SimplePeer from 'simple-peer';

const CoopKey = () => {
  const router = useRouter();
  const { key } = router.query;

  const peerRef = useRef();
  const [connected, setConnected] = useState();

  useEffect(() => {
    const peer = new SimplePeer();

    peer.on('signal', (data) => peer.signal(data));

    peer.on('connect', () => setConnected(true));
  }, []);
  return (
    <p>
      Hello {key}!
      Connected: {connected ? 'true' : 'false'}
    </p>
  );
}

export default CoopKey;
