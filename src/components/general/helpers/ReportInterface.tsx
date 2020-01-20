export interface Report {
    id: number;
    suspectId: number;
    dateOfSighting?: string;
    location?: string
    description: string;
}
