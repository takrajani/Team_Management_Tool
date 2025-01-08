import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TeamService } from '../services/team.service';
import { MatDialog } from '@angular/material/dialog';
import { ITeam } from '../models/team.model';
import { CommonModule } from '@angular/common';
import { AddTeamDialogComponent } from './add-team-dialog/add-team-dialog/add-team-dialog.component';
import { NotificationService } from './shared/component/select-team/service/notification.service';
import { DeleteTeamDialogComponent } from './delete-team-dialog/delete-team-dialog/delete-team-dialog.component';
import { AddTeamMemberDailogComponent } from './member-list/add-team-member-dailog/add-team-member-dailog.component';
import { MatIconModule } from '@angular/material/icon';
import { IMember } from '../models/member.model';
import { DeleteTeamMemberDailogComponent } from './shared/component/select-team/dialog/delete-team-member-dailog/delete-team-member-dailog.component';
import { MoveTeamMemberDailogComponent } from './member-list/move-team-member-dailog/move-team-member-dailog.component';
import { MatTooltipModule } from '@angular/material/tooltip';
@Component({
  selector: 'app-member-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './member-management.component.html',
  styleUrl: './member-management.component.scss',
})
export class MemberManagementComponent {
  profile:string='';
  get totalUnits(): number {
    return this.teams.reduce((sum, team) => sum + team.totalMembers, 0);
  }
  public teams: ITeam[] = [];
  constructor(
    private teamService: TeamService,
    private dialog: MatDialog,
    private notifier: NotificationService
  ) {}

  ngOnInit() {
    this.getTeams();
  }
  getTeams() {
    this.teamService.getTeams().subscribe((response) => {
      this.teams = response;
    });
  }
  addTeamDialog() {
    const dialogRef = this.dialog.open(AddTeamDialogComponent, {
      width: '450px',
      data: { team: null, isEdit: false },
    });

    dialogRef.afterClosed().subscribe((result: ITeam) => {
      if (result && result.id === 0 && result.name) {
        this.teamService.createTeam(result).subscribe((response) => {
          this.getTeams();
          this.notifier.success('Team added successful!');
          console.log('The dialog was closed', response);
        });
      }
    });
  }
  openAddMemberDialog(teamId: number) {
    const dialogRef = this.dialog.open(AddTeamMemberDailogComponent, {
      width: '450px',
      data: { teamMember: null },
    });

    dialogRef.afterClosed().subscribe((result: IMember) => {
      if (!result) {
        return;
      } // If the dialog is closed without any data
      this.teamService.addMember(teamId, result).subscribe((response) => {
        if (response) {
          this.getTeams();
          console.log('addMember', response);
          this.notifier.success(
            `member added to team ${result.name} successful!`
          );
        }
      });
    });
  }

  deleteTeamDialog(teamId: number) {
    const dialogRef = this.dialog.open(DeleteTeamDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        this.teamService.deleteTeam(teamId).subscribe(() => {
          this.getTeams();
          this.notifier.success(`Team deleted successful!`);
        });
      }
    });
  }

  updateTeamMember(teamId: number, member: IMember) {
    const dialogRef = this.dialog.open(AddTeamMemberDailogComponent, {
      width: '450px',
      data: { teamMember: member },
    });
    dialogRef.afterClosed().subscribe((result: IMember) => {
      if (!result) {
        return;
      } // If the dialog is closed without any data
      this.teamService.updateMember(teamId, result).subscribe((response) => {
        if (response) {
          this.getTeams();
          console.log('updateMember', response);
          this.notifier.success(`member updated successful!`);
        }
      });
    });
  }

  moveMemberToOtherTeam(teamId: number, memberId: number) {
    const dialogRef = this.dialog.open(MoveTeamMemberDailogComponent, {
      width: '450px',
      data: { selectedTeamId: teamId },
    });

    dialogRef.afterClosed().subscribe((result: number) => {
      if (!result) {
        return;
      }
      this.teamService
        .moveMemberToTeam(teamId, result, memberId)
        .subscribe((response) => {
          if (response) {
            this.getTeams();
            console.log('updateMember', response);
            this.notifier.success(`member moved to another team successful!`);
          }
        });
    });
  }

  deleteTeamMember(teamId: number, memberId: number) {
    const dialogRef = this.dialog.open(DeleteTeamMemberDailogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        this.teamService.deleteMember(teamId, memberId).subscribe(() => {
          this.getTeams();
          this.notifier.success(`member deleted successful!`);
        });
      }
    });
  }

  editTeamDialog(team: ITeam) {
    const dialogRef = this.dialog.open(AddTeamDialogComponent, {
      width: '450px',
      data: { team: team, isEdit: true },
    });

    dialogRef.afterClosed().subscribe((result: ITeam) => {
      this.teamService.updateTeam(result).subscribe((response) => {
        if (response) {
          this.getTeams();
          this.notifier.success('Team update successful!');
        }

        console.log('The dialog was closed', response);
      });
    });
  }
}
