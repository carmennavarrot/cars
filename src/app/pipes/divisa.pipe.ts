import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'divisa',
  standalone: true
})
export class DivisaPipe implements PipeTransform {

  transform(value: number): string {
    const idioma = navigator.language

    if(idioma.includes("US")){
      return "$"+value
    }
    else{
      return "E"+ (value *0.93).toFixed(2)
    }

  }

}
