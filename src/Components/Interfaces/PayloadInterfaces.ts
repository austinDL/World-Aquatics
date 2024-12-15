export interface EventPayload {
    "AgeGroup": string | null,
    "Comment": string | null,
    "DisciplineName": string,
    "DisciplineStartDate": string,
    "DisciplineStartTime": string,
    "DisciplineEndDate": string,
    "DisciplineEndTime": string,
    "EventName": string,
    "EventOfficialName": string,
    "EventResultDate": string,
    "EventResultTime": string,
    "EventResultUtcDateTime": string,
    "Heats": HeatPayload[],
    "Gender": string,
    "TimingAndScoringPartnerName": string | null,
    "TimingAndScoringPartnerLogo1": string | null,
    "TimingAndScoringPartnerLogo2": string | null,
    "TimingAndScoringPartnerLogo3": string | null,
    "TimingAndScoringPartnerLogo4": string | null,
    "DisciplineCode": string,
    "SportCode": string,
    "Id": string,
    "LastChange": string
}

export interface HeatPayload {
    "EndDate": string,
    "EndTime": string,
    "EndUtcDateTime": string,
    "Name": string,
    "UnitCode": string,
    "PhaseId": string,
    "PhaseCode": string,
    "DisciplineCode": string,
    "SportCode": string,
    "Gender": string,
    "PhaseName": string,
    "Order": string | null,
    "Date": string,
    "Time": string,
    "UtcDateTime": string,
    "Results": ResultPayload[],
    "IsSummary": boolean,
    "ExcludeFromEventSummary": boolean,
    "Distance": string | null,
    "ObjectState": number,
    "ResultStatus": string
}

export interface ResultPayload {
    "RT": string,
    "Lane": number,
    "RecordType": string,
    "Splits": SplitPayload[],
    "Points": number,
    "TimeBehind": string,
    "Time": string,
    "ResultId": string,
    "GmsId": string,
    "Rank": number,
    "HeatRank": number,
    "NAT": string,
    "FullName": string,
    "FirstName": string,
    "LastName": string,
    "ScoreboardPhoto": string,
    "MedalTag": string,
    "Gender": number,
    "AthleteResultAge": number,
    "PersonId": string
}

export interface SplitPayload {
    "Time": string,
    "Distance": string,
    "Order": number,
    "DifferentialTime": string
}