import { Component } from '@angular/core';
import { User } from '../../../interfaces/user';
import { AuthService } from '../../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-my-info',
  standalone: true,
  imports: [],
  templateUrl: './my-info.component.html',
  styleUrl: './my-info.component.css'
})
export class MyInfoComponent {
user: User | null = null

constructor(private authService: AuthService,
  private cookieSercice: CookieService
){}
}
