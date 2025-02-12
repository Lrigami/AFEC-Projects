import { Component } from '@angular/core';
import { TaskListComponent } from './components/taskListComponent';
import { ListTitleComponent } from './components/listTitleComponent';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TaskListComponent, ListTitleComponent],
  templateUrl:'./app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}