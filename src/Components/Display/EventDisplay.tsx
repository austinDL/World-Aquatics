import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { List, ListItem } from '@mui/material';
import { loadEventData } from '../../API/Fetch';
import { Event, Heat } from '../Interfaces/ComponentInterfaces';
import '../Components.css';

const event_location: string = 'Budapest';

const EventDisplay: React.FC = () => {
    const [event_data, set_event_data] = useState<Event|null>(null);
    const [is_loading, set_is_loading] = useState<boolean>(true);
    const [error_message, set_error_message] = useState<string|null>(null);

    const navigate = useNavigate();
    function handle_heat_click(heat:Heat, all_heats:Heat[]) {
        navigate(`heat/${heat.name.replace(' ', '_').toLowerCase()}`, {
            state: { heat, all_heats}
        });
    }

    // Helper functions
    function filter_heats(event: Event, include_str:string, exclude_str:string|null = null): Heat[] {
        // Get heats including a name
        let filtered_heats = event.heats.filter(
            heat => heat.name.toLowerCase().includes(
                include_str.toLowerCase()
        )
        )
        // Exclude names that are unwanted
        if (exclude_str !== null) {
            filtered_heats = filtered_heats.filter(
                heat => ! heat.name.toLowerCase().includes(
                    exclude_str.toLowerCase()
                )
            );
        }
        return filtered_heats;
    }

    function get_heat_selectors(heats:Heat[], is_summary:boolean=false): JSX.Element {
        const heats_to_display: Heat[] = heats.filter(
            heat => is_summary ? heat.is_summary : ! heat.is_summary
        );
        return (
            <List>
                { heats_to_display.map(
                    heat => <ListItem key={heat.name} onClick={() => handle_heat_click(heat, heats_to_display)} className='clickable'>{heat.name}</ListItem>
                )}
            </List>
        )
    }

    // Load in the data from the API
    useEffect(() => {
        const fetch_data = async () => {
            if (event_data !== null) return;
            try {
                const data: Event = await loadEventData(event_location);
                set_event_data(data);
                set_is_loading(false);
            } catch (err) {
                set_error_message(`Failed while fetching the event data for ${event_location}`);
                set_is_loading(false);
            }
        }

        fetch_data();
    }, [event_data]);

    // Check if we are still loading or loading yielded no results
    if (is_loading) {
        return <div>Loading...</div>;
    }
    
    // Display error message -> Need an error component
    if (error_message !== null) {
        return <div>{error_message}</div>;
    }
    // Catch the possibility that event_data is still null after loading
    if (event_data === null) {
        return <div>Event data is empty after loading. Please refresh the page...</div>
    }

    // Partition the heats
    const finalHeats: Heat[] = filter_heats(event_data, "final", "semi");
    const semiFinalHeats: Heat[] = filter_heats(event_data, "semifinal");
    const standardHeats: Heat[] = filter_heats(event_data, "heat");


    return (
        <div>
            <h1>Swimming Event at: {event_location}</h1>
            <h2>{event_data.name}</h2>
            <h3>Finals Heats</h3>
            {get_heat_selectors(finalHeats)}
            <h3>Semi-Final Heats</h3>
            {get_heat_selectors(semiFinalHeats)}
            <hr />
            {get_heat_selectors(semiFinalHeats, true)}
            <h3>First Round Heats</h3>
            {get_heat_selectors(standardHeats)}
            <hr />
            {get_heat_selectors(standardHeats, true)}
        </div>
    );
}

export default EventDisplay;