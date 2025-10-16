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

calcval : any ='';
subcalcval : any ='';
nextcalcval : boolean = false;
// performcalc : boolean = false;
displayval : any ='';
items = ['AC','%','backspace','/','7','8','9','*','4','5','6','-','1','2','3','+','00','0','.','='];
isEqual : boolean = false;
operator : any;
operatorset : boolean = false;
var_1 : number = 0;
var_2 : number = 0;

OnDisplay(clckval: string){
    if(clckval == '='){
      this.calcval=this.GetTotalValue();
      this.isEqual = true;
      this.var_1 = 0;
      this.var_2 = 0;
      this.operatorset = false;
    }
    
    else if(clckval == 'AC'){
      this.displayval = '';
      this.calcval = '';
    }
    else if(clckval == 'backspace'){
      this.displayval = this.displayval.slice(0, -1);
    }
    else if(this.calcval !== null && this.calcval !== "" && this.isEqual){
      this.displayval = this.calcval;
      this.displayval += clckval; 
      this.isEqual = false;
    } 
    else {
      this.displayval += clckval; 
    }
  }

GetTotalValue() {

    for (let i=0; i<(this.displayval.length); i++) {
          if(this.displayval[i] == '+' || this.displayval[i] == '-' || this.displayval[i] == '*' || this.displayval[i] == '/') {
            if (this.operatorset) {
              this.nextcalcval = true;
              this.PerformCalc();
              // break;
              this.var_1 = this.subcalcval;
              this.var_2 = 0;
              this.operator = this.displayval[i];
            }
            else {
              this.operator = this.displayval[i];
              this.operatorset = true;
            } 
          }
          else if (this.nextcalcval) {
            this.var_2 += this.displayval[i];
          }
          else {
            if(!this.operatorset) {
              this.var_1 += this.displayval[i];
            }
            else {
              this.var_2 += this.displayval[i];
            }
          }
        this.PerformCalc();
        this.nextcalcval = false;
      }   
  return this.subcalcval;
}

PerformCalc() {
  switch (this.operator) {
    case '+' :
      this.subcalcval = Number(this.var_1) + Number(this.var_2);
      break;
    case '-' :
      this.subcalcval = this.var_1 - this.var_2;
      break;
    case '*' :
      this.subcalcval = this.var_1 * this.var_2;
      break;
    case '/' :
      this.subcalcval = this.var_1 / this.var_2;
      break;

    default:
      break;
  }
  // this.performcalc = true;
  return this.subcalcval;
  }
}