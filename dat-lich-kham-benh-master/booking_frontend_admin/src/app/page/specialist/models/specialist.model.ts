export interface Specialist {
    id: number;
    name: string;
    status: number;
    createdDate: string;
}

export interface SpecialistSearch {
    name: string;
    status: number;
}