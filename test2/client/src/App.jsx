import { useState, useEffect } from 'react';
import Pusher from 'pusher-js';
import Events from './components/events/Events';

function App() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
            cluster: 'eu',
        });
        const channel = pusher.subscribe('events');

        function updateEvents(data) {
            const newArray = events.slice(0, 2);
            newArray.unshift(data);

            setEvents(newArray);
        }

        channel.bind('created', updateEvents);
        channel.bind('updated', updateEvents);
        channel.bind('deleted', updateEvents);

        return () => {
            channel.unbind();
            pusher.unsubscribe('events');
        };
    }, [events]);

    return (
        <div>
            <Events events={events} />
        </div>
    );
}

export default App;
