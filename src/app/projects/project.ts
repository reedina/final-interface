import { ITeam } from  '../teams/team';

export interface IProject {
    id: number;
    name: string;
    team: ITeam;
    }
    