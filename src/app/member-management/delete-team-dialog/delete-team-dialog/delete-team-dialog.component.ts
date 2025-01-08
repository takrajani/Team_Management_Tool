import { Component,  } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-team-dialog',
  standalone: true,
  imports: [MatButtonModule,MatDialogModule],
  templateUrl: './delete-team-dialog.component.html',
  styleUrl: './delete-team-dialog.component.scss',
})
export class DeleteTeamDialogComponent {

}
