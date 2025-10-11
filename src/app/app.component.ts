import { Component } from '@angular/core';
import { CalculateComponent } from "./calculate/calculate.component";

@Component({
  selector: 'app-root',
  imports: [CalculateComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Calculator';
}
