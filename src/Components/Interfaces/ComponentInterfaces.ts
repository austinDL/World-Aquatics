export interface Event {
    id: string,
    name: string,
    age_group: string | null,
    comment: string | null,
    discipline_name: string,
    discipline_start_date: string,
    discipline_end_date: string,
    discipline_start_time: string,
    discipline_end_time: string
    official_name: string,
    result_date: string,
    result_time: string,
    heats: Heat[],
    gender: string,
    sport_code: string
}

export interface Heat {
    name: string,
    phase_code: string,
    sport_code: string,
    gender: string,
    phase_name: string,
    date: string,
    time: string,
    end_date: string,
    end_time: string,
    results: Result[],
    is_summary: boolean,
    is_exclude_from_event_summary: boolean,
    distance: number | null,
    result_status: string
}

export interface Result {
    id: string,
    reaction_time: string,
    lane: number,
    swimmer: Swimmer,
    splits: Split[],
    points: number,
    time: number,
    time_behind: number,
    rank: number,
    heat_rank: number,
    scoreboard_photo_id: string, // Need to figure out how to get this photo
    medal_tag: string
}

export interface Swimmer {
    id: string, // Need to figure out how to extract swimmer's details via the api
    first_name: string,
    last_name: string,
    gender: number,
    NAT: string,
    age: number
}

export interface Split {
    time: number,
    distance: number | null,
    order: number,
    differential_time: number
}