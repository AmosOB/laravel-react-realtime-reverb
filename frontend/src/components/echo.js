import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

const echo = new Echo({
    broadcaster: 'reverb',
    key: 'yhnfuzrtysxh7fymnnjw',
    wsHost: '127.0.0.1',
    wsPort: 8080,
    wssPort: 443,
    forceTLS: ('http' || 'https') === 'https',
    enabledTransports: ['ws', 'wss'],
});

export default echo;
