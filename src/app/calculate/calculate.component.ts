import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-calculate',
  standalone: true,
  imports: [MatCardModule, MatIconModule, CommonModule],
  templateUrl: './calculate.component.html',
  styleUrl: './calculate.component.scss'
})
export class CalculateComponent {

calcval : string = '';
displayval : string = '';
items = ['AC','%','backspace','/','7','8','9','*','4','5','6','-','1','2','3','+','00','0','.','='];

OnDisplay(clckval: string){
    if(clckval == '='){
      this.calcval = eval(this.displayval);
    }
    else if(clckval == 'AC'){
      this.displayval = '';
      this.calcval = '';
    }
    else if(clckval == 'backspace'){
      this.displayval = this.displayval.slice(0, -1);
    }
    else{
      this.displayval += clckval; 
    }
  }

}
