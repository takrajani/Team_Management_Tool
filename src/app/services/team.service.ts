import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITeam } from '../models/team.model';
import { IMember } from '../models/member.model';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private apiUrl = 'http://localhost:5031/api';

  constructor(private http: HttpClient) {}

  getTeams(): Observable<ITeam[]> {
    return this.http.get<ITeam[]>(`${this.apiUrl}/Teams`);
  }

  createTeam(team: { name: string }): Observable<ITeam> {
    const addTeamReq = {
      id: 0,
      name: team.name,
      members: [],
    };
    return this.http.post<ITeam>(`${this.apiUrl}/Teams`, addTeamReq);
  }

  deleteTeam(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Teams/${id}`);
  }

  updateTeam(updateTeam: ITeam): Observable<void> {
    const updtaeTeamReq = {
      id: updateTeam.id,
      name: updateTeam.name,
      members: [],
    };

    return this.http.put<void>(
      `${this.apiUrl}/Teams/${updateTeam.id}`,
      updtaeTeamReq
    );
  }

  updateMember(teamId: number,member: IMember): Observable<IMember> {
    member.teamId= teamId;
    return this.http.put<IMember>(
      `${this.apiUrl}/Members/${member.id}`,
      member
    );
  }

  deleteMember(memberId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Members/${memberId}`);
  }

  moveMemberToTeam(newTeamId: number, member: IMember): Observable<IMember> {
    member.teamId = newTeamId;
    return this.http.put<IMember>(
      `${this.apiUrl}/Members/${member.id}`,
      member
    );
  }

  addMember(teamId: number, member: IMember): Observable<IMember> {
    member.teamId = teamId;

    return this.http.post<IMember>(`${this.apiUrl}/Members`, member);
  }
}
