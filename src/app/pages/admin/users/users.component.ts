import { Component } from '@angular/core';
import { User } from '../../../interfaces/user';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

user!: User

constructor(private authService: AuthService){
  authService.getAllReservations().subscribe({
    next:(response)=>{
      this.user = response as User
    },
    error:()=>{}
  })
}

}
