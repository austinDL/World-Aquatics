import axios from 'axios';
import Event from '../Components/Interfaces'

const BASE_URL: string = 'https://api.worldaquatics.com/fina/events';
const END_POINTS: Record<string, string> = {
    budapest: 'b344ceee-7bae-4076-a34a-e019524c72ff'
};

export async function loadEventData(location:string): Promise<Event> {
    const url: string = `${BASE_URL}/${END_POINTS[location]}`;
    const response = await axios.get<Event>(url);
    return response.data;
}

loadEventData('budapest').then(
    event => {
        console.log(event.name);
        console.log(event.heats);
    }
)