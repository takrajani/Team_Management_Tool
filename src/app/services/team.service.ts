import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITeam } from '../models/team.model';
import { IMember } from '../models/member.model';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private mockTeams: ITeam[] = [
    {
      id: 1,
      name: 'Asgard',
      members: [
        {
          id: 1,
          name: 'Varsha Kulharme',
          experience: 1,
          email: 'varsha.kulharme@domain.com',
          username: 'eu\\kulhdar',
        },
        {
          id: 2,
          name: 'Snehal Katekekar',
          experience: 1,
          email: 'snehal.katekekar@domain.com',
          username: 'eu\\katkesne',
        },
      ] as IMember[],
      totalMembers: 2,
    },
    {
      id: 2,
      name: 'Stella',
      members: [
        {
          id: 1,
          name: 'Aman Jha',
          experience: 1,
          email: 'aman.jha@domain.com',
          username: 'eu\\jhamaama',
        },
        {
          id: 2,
          name: 'Shirin A Khan',
          experience: 1,
          email: 'shirin.khan@domain.com',
          username: 'eu\\khanshi',
        },
      ] as IMember[],
      totalMembers: 2,
    },
    {
      id: 3,
      name: 'Team A',
      members: [
        {
          id: 1,
          name: 'Aman Jha',
          experience: 1,
          email: 'aman.jha@domain.com',
          username: 'eu\\jhamaama',
        },
        {
          id: 2,
          name: 'Shirin A Khan',
          experience: 1,
          email: 'shirin.khan@domain.com',
          username: 'eu\\khanshi',
        },
      ] as IMember[],
      totalMembers: 2,
    },
    {
      id: 4,
      name: 'Team B',
      members: [
        {
          id: 1,
          name: 'Aman Jha',
          experience: 1,
          email: 'aman.jha@domain.com',
          username: 'eu\\jhamaama',
        },
        {
          id: 2,
          name: 'Shirin A Khan',
          experience: 1,
          email: 'shirin.khan@domain.com',
          username: 'eu\\khanshi',
        },
      ] as IMember[],
      totalMembers: 2,
    },
  ];

  constructor(private http: HttpClient) {}
  getTeams(): Observable<ITeam[]> {
    return new Observable((observer) => {
      observer.next(this.mockTeams);
      observer.complete();
    });
  }

  createTeam(team: { name: string }): Observable<ITeam> {
    const mockTeam: ITeam = {
      id: this.mockTeams.length+1,
      name: team.name,
      members: [],
      totalMembers: 0,
    };
    this.mockTeams.push(mockTeam);
    return new Observable((observer) => {
      observer.next(mockTeam);
      observer.complete();
    });
  }

  deleteTeam(id: number): Observable<void> {
    const deletedTeam= this.mockTeams.find((team)=>team.id===id);
    if(deletedTeam)
    {
      this.mockTeams.splice(id-1,1);
      this.mockTeams.map((team,index)=>team.id=index+1);
    }

    return new Observable((observer) => {
      observer.next();
      observer.complete();
    });
  }

  updateTeam(updateTeam: ITeam): Observable<ITeam> {
    const team = this.mockTeams.find((t) => t.id === updateTeam.id);
    if (team) {
      team.name = updateTeam.name;
    }

    return new Observable((observer) => {
      observer.next(team);
      observer.complete();
    });
  }
    updateMember(teamId: number, member: IMember): Observable<IMember> {
    // Mocking the API endpoint
    return new Observable((observer) => {
      // Simulate a successful response with a delay
      setTimeout(() => {
        const updatedMember = this.mockTeams[teamId].members.find((m) => m.id === member.id);
        if (updatedMember) {
          updatedMember.name = member.name;
          updatedMember.experience = member.experience;
          updatedMember.email = member.email;
          updatedMember.username = member.username;
          observer.next(updatedMember);
        } else {
          observer.error(new Error('Member not found'));
        }
        observer.complete();
      }, 1000);
    });
  }
    deleteMember(teamId: number,memberId: number, ): Observable<void> {
    // Mocking the API endpoint
    return new Observable((observer) => {
      const deletedData = this.mockTeams[teamId-1].members.findIndex((m) => m.id === memberId);
      // console.log(deletedData);

      if (deletedData === -1) {
        observer.error(new Error('Member not found'));
      } else {
        this.mockTeams[teamId-1].members.splice(deletedData, 1);
        this.mockTeams[teamId-1].totalMembers= this.mockTeams[teamId-1].totalMembers-1;
        this.mockTeams[teamId-1].members.map((member, index)=>member.id=index+1);
        // Simulate a successful response with a delay
        setTimeout(() => {
          observer.next();
          observer.complete();
        }, 1000);
      }
    });
  }
    moveMemberToTeam(team1Id: number,team2Id: number, memberId: number): Observable<IMember> {
    // Mocking the API endpoint
    return new Observable((observer) => {
      // Simulate a successful response with a delay
      setTimeout(() => {
        const updatedMemberIndex = this.mockTeams[team1Id-1].members.findIndex(
          (member) => member.id === memberId
        );
        const updatedMember = this.mockTeams[team1Id-1].members.find(
          (member) => member.id === memberId
        );
        if (updatedMember && updatedMemberIndex!==-1) {
          this.mockTeams[team1Id-1].members.splice(updatedMemberIndex, 1);
          this.mockTeams[team1Id-1].totalMembers= this.mockTeams[team1Id-1].totalMembers-1;
          this.mockTeams[team1Id-1].members.map((member, index)=>member.id=index+1);
          updatedMember.id= this.mockTeams[team2Id-1].members.length+1;
          this.mockTeams[team2Id-1].members.push(updatedMember);
          this.mockTeams[team2Id-1].totalMembers= this.mockTeams[team2Id-1].totalMembers+1;
          observer.next(updatedMember);
        } else {
          observer.error(new Error('Member not found'));
        }
        observer.complete();
      }, 1000);
    });
  }
  addMember(teamId: number,member: IMember): Observable<IMember>
  {
   // Mocking the API endpoint
    return new Observable((observer) => {
      // Simulate a successful response with a delay
      setTimeout(() => {
        const newMember: IMember = {
          id: this.mockTeams[teamId-1].members.length+1,
          email: member.email,
          name: member.name,
          experience: member.experience,
          username: member.username,
        };
        this.mockTeams[teamId-1].members.push(newMember);
        this.mockTeams[teamId-1].totalMembers= this.mockTeams[teamId-1].totalMembers+1;
        observer.next(newMember);
        observer.complete();
      }, 100);
    });
  }
}
