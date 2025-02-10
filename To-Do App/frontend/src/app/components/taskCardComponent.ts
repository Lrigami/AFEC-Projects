import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../services/taskServices';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
      <h4>{{ task.title }}</h4>
      <p *ngIf="task.description">{{ task.description }}</p>
      <p><span class="bold">Completed:</span> {{ task.completed ? 'yes' : 'no' }}</p>
      <p><span class="bold">Created at:</span> {{ task.createdAt | date:'dd/MM/yyyy HH:mm' }}</p>
      <div class="edit-delete-btn">
        <button type="button" class="btn-update" (click)="displayEditForm()">Edit</button>
        <button type="button" class="btn-delete">Delete</button>
      </div>

      <form id="edit-form" *ngIf="isFormVisible" (ngSubmit)="updateTask()">
        <label for="taskTitle">Title:</label>
        <input type="text" placeholder="Task Title" name="taskTitle" required [(ngModel)]="taskTitle"/>
        <label for="taskDescription">Description:</label>
        <textarea id="taskDescription" type="text" name="task-description-field" name="taskDescription" rows="5" cols="20" [(ngModel)]="taskDescription"></textarea>
        <label for="taskCompleteState">Completed:</label>
        <div id="taskCompleteState">
          <input type="radio" id="completed" name="completedState" value="true" [(ngModel)]="completedState"/>
          <label for="completed">Yes</label>

          <input type="radio" id="uncomplete" name="completedState" value="false" [(ngModel)]="completedState"/>
          <label for="uncomplete">No</label>
        </div>
        <div id="new-task-buttons">
            <button id="create-task" type="submit">Validate</button>
            <button id="cancel-task" type="button" (click)="cancelEdit()">Cancel</button>
        </div>
      </form>
  `,
})
export class TaskCardComponent {
  @Input() task!: { _id: string, title: string, description?: string, completed: boolean, createdAt: Date };
  isFormVisible: boolean = false;
  taskTitle: string = "";
  taskDescription: string = "";
  completedState: string = "false";
  @Output() taskUpdated = new EventEmitter<void>();

  constructor(public taskService: TaskService) {}

  ngOnInit() {
    this.taskTitle = this.task.title;
    this.taskDescription = this.task.description ?? "";
    this.completedState = this.task.completed ? "true" : "false"; // Utilisation de string pour `ngModel`
  }

  displayEditForm() {
    this.isFormVisible = true;
  }

  updateTask() {
    const updatedTask = {
      id: this.task._id,
      title: this.taskTitle,
      description: this.taskDescription,
      completed: this.completedState === "true" // Convertit en boolean
    };

    console.log(updatedTask.id);
  
    this.taskService.updateTask(updatedTask).subscribe({
      next: () => {
        console.log("Task updated successfully");
        this.taskUpdated.emit();
        this.isFormVisible = false;
      },
      error: (error) => console.error("Update failed", error)
    });
  }

  cancelEdit() {
    this.taskTitle = this.task.title;
    this.taskDescription = this.task.description ?? "";
    this.completedState = this.task.completed ? "true" : "false";
    this.isFormVisible = false;
  }
}
