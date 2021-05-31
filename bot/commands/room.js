const { stripIndents } = require('common-tags');
var Peer = require('simple-peer');
var wrtc = require('wrtc');

const { COOP_ROOM_URL, COOP_ROOM_PREFIX } = process.env;

module.exports = async (client, message, { }) => {
  const key = Math.random().toString(36).replace('0.', '').substr(0, 5);

  var peer = new Peer({ initiator: true, wrtc, channelName: `${COOP_ROOM_PREFIX}-${key}` });

  peer.on('error', (err) => console.log('error', err))

  peer.on('signal', (data) => peer.signal(data));

  message.channel.send(stripIndents`
    Your channel for co-op is here: ${COOP_ROOM_URL}${key}
    This link will invalidate after an hour.
  `);
};
