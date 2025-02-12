import { Component } from '@angular/core';
import { TaskListComponent } from '../components/taskListComponent';
import { ListTitleComponent } from '../components/listTitleComponent';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TaskListComponent, ListTitleComponent],
  template: `
  <app-list-title></app-list-title>
  <app-task-list></app-task-list>
  `,
})
export class AppComponent {}