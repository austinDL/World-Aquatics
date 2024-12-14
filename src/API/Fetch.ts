import axios from 'axios';
import { Event, Heat, Result, Split } from '../Components/Interfaces'
import { EventPayload, HeatPayload, ResultPayload, SplitPayload } from '../Components/PayloadInterfaces';
const BASE_URL: string = 'https://knuptj4lr9.execute-api.ap-southeast-2.amazonaws.com/dev';
const END_POINTS: Record<string, string> = {
    Budapest: 'b344ceee-7bae-4076-a34a-e019524c72ff'
};

export async function loadEventData(location:string): Promise<Event> {
    // Extract the payload of the event in the selected location
    const url: string = `${BASE_URL}/${END_POINTS[location]}`;
    console.log(url);
    const response = await axios.get<EventPayload>(BASE_URL);
    const data = response.data;
    console.log(response);

    const event: Event = {
        id: data.Id,
        name: data.EventName,
        age_group: data.AgeGroup,
        comment: data.Comment,
        discipline_name: data.DisciplineName,
        discipline_start_date: data.DisciplineStartDate,
        discipline_end_date: data.DisciplineEndDate,
        discipline_start_time: data.DisciplineStartTime,
        discipline_end_time: data.DisciplineEndTime,
        official_name: data.EventOfficialName,
        result_date: data.EventResultDate,
        result_time: data.EventResultTime,
        heats: data.Heats.map(map_heat),
        gender: data.Gender,
        sport_code: data.SportCode
    }

    return event;
}

function _extract_distance(distance:string|null): number|null {
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
        distance: _extract_distance(heat.Distance),
        result_status: heat.ResultStatus
    }
}

function map_result(result:ResultPayload): Result {
    return {
        id: result.ResultId,
        RT: result.RT,
        lane: result.Lane,
        swimmer: {
            id: result.PersonId,
            first_name: result.FirstName,
            last_name: result.LastName,
            gender: result.Gender,
            age: result.AthleteResultAge
        },
        splits: result.Splits.map(map_split),
        points: result.Points,
        time: parseFloat(result.Time),
        time_behind: parseFloat(result.TimeBehind),
        rank: result.Rank,
        heat_rank: result.HeatRank,
        NAT: result.NAT,
        scoreboard_photo_id: result.ScoreboardPhoto, // Need to figure out how to get this photo
        medal_tag: result.MedalTag
    }
}

function map_split(split:SplitPayload): Split {
    return {
        time: parseFloat(split.Time),
        distance: _extract_distance(split.Distance),
        order: split.Order,
        differential_tiem: parseFloat(split.DifferentialTime)
    }
}