import { ITeam } from  '../teams/team';

export interface IUser {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    team: ITeam;
    }
    