import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { NotificationService } from '../member-management/shared/component/select-team/service/notification.service';
import { CommonModule } from '@angular/common';
import { errorContext } from 'rxjs/internal/util/errorContext';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  roleName?='';
  credentials = { email: '', password: '' };
  errorMessage:string='';

  constructor(
    private authService: AuthService,
    private notifier: NotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const email = params['email'];
      if (email) {
        this.credentials.email = email;
      }
    });
  }

  onSubmit() {
    this.authService.login(this.credentials).subscribe(
      (response) => {
        // Handle successful login
        if(response.isSuccess)
        {
          this.roleName=response.roleName;
          console.log('Logged in:', response);
          this.notifier.success('Login successful');
          this.router.navigate(['/team-member'],{ queryParams: { roleName:  this.roleName } });
        }
        else{
          this.notifier.error('Login failed');
          console.error('Login failed:', response.message);
          this.errorMessage=response.message;
        }
      },
      (error)=>{
        this.notifier.error('Login failed');
        console.error('Login failed:', error);
        this.errorMessage=error.error.message;
      }
    );
  }
}
