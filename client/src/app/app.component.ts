import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    DashboardComponent
  ]
})
export class AppComponent {

}
