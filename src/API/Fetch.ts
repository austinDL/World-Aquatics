import axios from 'axios';
import { Event, Heat, Result, Split } from '../Components/Interfaces/ComponentInterfaces'
import { EventPayload, HeatPayload, ResultPayload, SplitPayload } from '../Components/Interfaces/PayloadInterfaces';
// URL path to API Gateway that gets data from World Aquatics API
const BASE_URL: string = 'https://knuptj4lr9.execute-api.ap-southeast-2.amazonaws.com/dev';

// Helper function for displaying text
function toTitleCase(name:string): string {
    const first_letter = name[0].toUpperCase();
    const remainder = name.slice(1).toLowerCase();

    return first_letter.concat(remainder);
}

// Helper function for getting the float representiation of distance
function extract_distance(distance:string|null): number|null {
    if (distance === null) {
        return null;
    }
    // Extract the number including decimals
    const number_match: RegExpMatchArray | null = distance.match(/[\d.]+/);
    if (number_match === null) {
        return null;
    }
    return parseFloat(number_match[0]);
}

export async function loadEventData(location:string): Promise<Event> {
    // Extract the payload of the event in the selected location
    const url: string = `${BASE_URL}`;
    console.log(`Fetching event data for: ${location}`);
    const response = await axios.get<EventPayload>(url, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = response.data;

    return map_event(data);
}

function map_event(event:EventPayload) {
    return {
        id: event.Id,
        name: event.EventName,
        age_group: event.AgeGroup,
        comment: event.Comment,
        discipline_name: event.DisciplineName,
        discipline_start_date: event.DisciplineStartDate,
        discipline_end_date: event.DisciplineEndDate,
        discipline_start_time: event.DisciplineStartTime,
        discipline_end_time: event.DisciplineEndTime,
        official_name: event.EventOfficialName,
        result_date: event.EventResultDate,
        result_time: event.EventResultTime,
        heats: event.Heats.map(map_heat),
        gender: event.Gender,
        sport_code: event.SportCode
    }
}

function map_heat(heat:HeatPayload): Heat {
    return {
        name: heat.Name,
        phase_code: heat.PhaseCode,
        sport_code: heat.SportCode,
        gender: heat.Gender,
        phase_name: heat.PhaseName,
        date: heat.Date,
        time: heat.Time,
        end_date: heat.EndDate,
        end_time: heat.EndTime,
        results: heat.Results.map(map_result),
        is_summary: heat.IsSummary,
        is_exclude_from_event_summary: heat.ExcludeFromEventSummary,
        distance: extract_distance(heat.Distance),
        result_status: heat.ResultStatus
    }
}

function map_result(result:ResultPayload): Result {
    return {
        id: result.ResultId,
        reaction_time: result.RT,
        lane: result.Lane,
        swimmer: {
            id: result.PersonId,
            first_name: toTitleCase(result.FirstName),
            last_name: toTitleCase(result.LastName),
            gender: result.Gender,
            NAT: result.NAT,
            age: result.AthleteResultAge
        },
        splits: result.Splits.map(map_split),
        points: result.Points,
        time: parseFloat(result.Time),
        time_behind: parseFloat(result.TimeBehind),
        rank: result.Rank,
        heat_rank: result.HeatRank,
        scoreboard_photo_id: result.ScoreboardPhoto, // Need to figure out how to get this photo
        medal_tag: result.MedalTag
    }
}

function map_split(split:SplitPayload): Split {
    return {
        time: parseFloat(split.Time),
        distance: extract_distance(split.Distance),
        order: split.Order,
        differential_time: parseFloat(split.DifferentialTime)
    }
}