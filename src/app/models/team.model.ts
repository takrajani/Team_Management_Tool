import { IMember } from './member.model';

export interface ITeam {
  id: number;
  name: string;
  members: IMember[];
  totalMembers: number;
}
