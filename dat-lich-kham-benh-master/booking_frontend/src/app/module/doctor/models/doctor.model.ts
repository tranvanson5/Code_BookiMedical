export interface Doctor {
    code: string;
    name: string;
    bio: string;
    avatar: string;
    socials: Social[];
}

export interface Social {
    name: string;
    link: string;
    icon?: string;
    image?: string;
}