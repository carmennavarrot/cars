import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  url : string = "http://localhost:3000/api/vehicles"
  constructor(private http: HttpClient,
    private authService: AuthService
  ) { }
// obtener todos los vehiculos 
  getAll(){
    return this.http.get(this.url)
  }
// obtner un vehiculo específico
  getById(id: string){
    return this.http.get(`${this.url}/${id}`)
  }
  
// eliminar vehiculo
deleteVehicle(vehicleId: string){
  const headers= new HttpHeaders({
    'Authorization': `Bearer ${this.authService.user?.token}`
  })

  return this.http.delete(`${this.url}/${this.authService.user?.id}/${vehicleId}`,{headers});
}
  // añadir vehiculo 
  saveVehicle( brand: string,
    model: string,
    description: string,
    image: string,
    pricePerDay: number,
    year: number,
    available: boolean){
    const headers= new HttpHeaders({
      'Authorization': `Bearer ${this.authService.user?.token}`
    })
  
    return this.http.post(this.url,{
      brand: brand,
      model: model,
      description: description,
      image: image,
      pricePerDay: pricePerDay,
      year: year,
      available: available
    },{headers});

  }
  
}
