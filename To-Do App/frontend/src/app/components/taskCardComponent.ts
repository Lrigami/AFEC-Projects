import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule],
  template: `
      <h4>{{ task.title }}</h4>
      <p *ngIf="task.description">{{ task.description }}</p>
      <p><span class="bold">Completed:</span> {{ task.completed ? 'yes' : 'no' }}</p>
      <p><span class="bold">Created at:</span> {{ task.createdAt | date:'dd/MM/yyyy HH:mm' }}</p>
      <div class="edit-delete-btn">
        <button class="btn-update">Edit</button>
        <button class="btn-delete">Delete</button>
      </div>
  `,
})
export class TaskCardComponent {
  @Input() task!: { id: number, title: string, description?: string, completed: boolean, createdAt: Date };
}
