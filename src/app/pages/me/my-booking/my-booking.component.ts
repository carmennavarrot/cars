import { Component } from '@angular/core';
import { Booking } from '../../../interfaces/booking';
import { BookingService } from '../../../services/booking.service';
import { FormatDatePipe } from '../../../pipes/format-date.pipe';
import { DivisaPipe } from '../../../pipes/divisa.pipe';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';
import { CanCancelPipe } from '../../../pipes/can-cancel.pipe';


@Component({
  selector: 'app-my-booking',
  standalone: true,
  imports: [FormatDatePipe, DivisaPipe, CanCancelPipe],
  templateUrl: './my-booking.component.html',
  styleUrl: './my-booking.component.css'
})
export class MyBookingComponent {
  bookings: Booking[] = [];

  constructor(private bookingService: BookingService, private authService: AuthService){
    this.bookingService.getByUserId(authService.user!.id).subscribe({
      next: (response)=>{
        this.bookings = response as Booking[]
      },
      error: (err)=>{
        console.log("error al obtener las reservas", err)

      }
    })
  }

  eliminar(bookingId: string){
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.bookingService.deleteBooking(bookingId).subscribe({
          next: ()=>{
            Swal.fire({
              title: "¡Reserva eliminada!",
              text: "Tu reserva ha sido eliminada correctamente",
              icon: "success",
              showConfirmButton: false,
              timer: 2000
            });

            this.bookings = this.bookings.filter(x=>x._id !== bookingId)
          },
          error:()=>{
            Swal.fire({
              title: "Oops!",
              text: "Ha ocurrido un error",
              icon: "error",
              showConfirmButton: false,
              timer: 1500
            })
          }
        })

        
      }
    });
  }

  // editar(bookingId: string){
  //   const reservaEditar: Booking|undefined = this.bookings.find(x=>x._id === bookingId)
  //   if(reservaEditar){
  //     Swal.fire({
  //     title: `Tu reserva del ${reservaEditar.vehicle.brand} ${reservaEditar.vehicle.model}`,
  //     html: `<div>
  //       <div>
  //         <label class="form-label">Fecha inicio</label>
  //         <input type="date" class="form-control">
  //       </div>
  //       <div>
  //       <label class="form-label">Fecha fin</label>
  //       <input type="date" class="form-control">
  //     </div>
  //     </div>`,
  //     didClose: ()=>{
  //       // update de la reserva
  //     }
  //     })
  //   }
    
  // }
}
