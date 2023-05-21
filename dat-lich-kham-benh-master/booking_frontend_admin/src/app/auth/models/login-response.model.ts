export interface LoginResponse {
    jwt: string,
    user: {
        active: boolean;
        address: string;
        avatar: string;
        dob: string;
        email: string;
        fullName: string;
        gender: string;
        id: number;
        phone: string;
        authoritiesList: {
            code: string;
            name: string;
        }[];
        departments: any[];
    }
}