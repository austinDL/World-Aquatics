import React, { useEffect, useState } from 'react';

import { loadEventData } from '../API/Fetch';
import { Event } from './Interfaces';

loadEventData('budapest').then(
    event => {
        console.log(event.name);
        console.log(event.heats);
    }
)

const event_location: string = 'Budapest';

const EventDisplay = () => {
    const [event_data, set_event_data] = useState<Event|null>(null);
    const [is_loading, set_is_loading] = useState<boolean>(true);
    const [error_message, set_error_message] = useState<string|null>(null);

    useEffect(() => {
        try {
            const data: Event = await loadEventData(event_location);
            set_event_data(data);
        } catch (err) {
            set_error_message(`Failed while fetching the event data for ${event_location}`);
            set_is_loading(false);
        }
    }, []);

    // Check if we are still loading or loading yielded no results
    if (is_loading) {
        return <div>Loading...</div>;
    }
    
    // Display error message -> Need an error component
    if (error_message !== null) {
        return <div>{error_message}</div>;
    }

    if (event_data === null) {
        return <div>Event data is empty after loading. Please refresh the page...</div>
    }

    return (
        <div>
            <h1>Swimming Event at: {event_location}</h1>
            <h2>{event_data.name}</h2>
            <ul>
                {event_data.heats.map(heat => (
                    <li key={heat.name}>
                        {heat.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default EventDisplay;