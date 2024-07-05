// ablyClient.ts
import Ably from '/ably/promises';

const ablyApiKey = process.env.ABLY_API_KEY

const ably = new Ably.Realtime.Promise(ablyApiKey);

export default ably;
