import { Component, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  imports: [MatButtonModule, MatTableModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  displayedColumns: string[] = ['Sl','name', 'position'];
  employees : any[] = [
    {id: 1, name: 'John Doe', position: 'Software Engineer'},
    {id: 2, name: 'Jane Smith', position: 'Project Manager'},
    {id: 3, name: 'Sam Johnson', position: 'UX Designer'}
  ]
}
