import { Component } from '@angular/core';
import { FormatDatePipe } from '../../../pipes/format-date.pipe';
import { DivisaPipe } from '../../../pipes/divisa.pipe';
import { CanCancelPipe } from '../../../pipes/can-cancel.pipe';
import { Booking } from '../../../interfaces/booking';
import { BookingService } from '../../../services/booking.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [FormatDatePipe, DivisaPipe, CanCancelPipe],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {
  bookings: Booking[] = []

constructor(private bookingService: BookingService,
  private authService: AuthService
){
  bookingService.getByUserId(authService.user!.id).subscribe({
    next:(response)=>{
      this.bookings = response as Booking[]
    },
    error: ()=>{}
  })
}


eliminar(){}
editar(){}
}
