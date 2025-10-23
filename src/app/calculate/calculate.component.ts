import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calculate',
  standalone: true,
  imports: [MatCardModule, MatIconModule, CommonModule, FormsModule],
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
operator_1 : boolean = false;
operator_2 : boolean = false;

onKeyPress(event: KeyboardEvent) {
  const allowedKeys = ['Backspace', 'Enter'];
  const numOrOperator = /^[0-9+\-*/%.]$/.test(event.key);

  if (!numOrOperator && !allowedKeys.includes(event.key)) {
    event.preventDefault();
  } else {
    this.OnDisplay(event.key);
  }
}

OnDisplay(clckval: string){
  const expression = this.calcval;
  if(this.displayval.length >= 20) {
      this.displayval = this.displayval.slice(0, 20);
  }
  const arthval = ['+', '-', '*', '/', '%'];
  this.operator_1 = arthval.some(arth => clckval.includes(arth));
    if(this.operator_1) {
      // this.displayval.length.includes(arthval);
      this.operator_2 = arthval.some(arth => this.displayval.slice(-1).includes(arth));
      if (this.operator_2) {
        return;
      }
      if(this.displayval == null || this.displayval == "") {
        return;
      }
    }
   
    if(clckval == '=' || clckval == 'Enter'){
      if(this.displayval.slice(-1) == '%') {
        this.calcval=this.GetTotalValue();
      }
      this.operator_2 = arthval.some(arth => this.displayval.slice(-1).includes(arth));
      if (this.operator_2 || this.displayval.slice(-1) == '=' || this.displayval.slice(-1) == 'Enter') {
        return;
      }
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
    else if(clckval == 'backspace' || clckval == 'Backspace'){
      this.displayval = this.displayval.slice(0, -1);
      if(this.displayval == null || this.displayval == "") {
        this.calcval = '';
      }
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
          if(this.displayval[i] == '+' || this.displayval[i] == '-' || this.displayval[i] == '*' || this.displayval[i] == '/' || this.displayval[i] == '%') {
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
    case '%' :
      if(this.displayval.slice(-1) == '%' && this.var_2 == 0) {
        this.subcalcval = this.var_1 / 100;
      }
      else {
        this.subcalcval = (this.var_1 / 100) * this.var_2;
      }
      break;

    default:
      break;
  }
  // this.performcalc = true;
  return this.subcalcval;
  }
}