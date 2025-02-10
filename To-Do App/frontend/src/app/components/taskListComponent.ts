import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../services/taskServices';
import { TaskCardComponent } from './taskCardComponent'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  standalone: true, 
  imports: [CommonModule, TaskCardComponent, FormsModule], 
  template: `<h3> List of tasks: </h3>

            <div id="generated-tasks-list" type="none">
                <div *ngFor="let task of tasks">
                    <app-task-card [task]="task" class="task-card"></app-task-card>
                </div>
            </div>

            <!-- Affichage et navigation des pages -->
            <div id="page-navigation">
                <button id="previous" (click)="navigate('previous')" [disabled]="page === 0" >Previous</button>
                <button id="next" (click)="navigate('next')">Next</button>
            </div>

            <!-- Formulaire pour ajouter une nouvelle tâche -->
            <button type="button" id="add-new-task" (click)="openNewTaskForm()">Add new task</button> 

            <form *ngIf="isFormVisible" (ngSubmit)="addNewTask()">
                <label for="taskTitle">Title:</label>
                <input #taskTitle type="text" placeholder="Task Title" required [(ngModel)]="taskTitle"/>
                <label for="taskDescription">Description:</label>
                <textarea id="taskDescription" type="text" name="task-description-field" rows="5" cols="20" [(ngModel)]="taskDescription"></textarea>
                <div id="new-task-buttons">
                    <button id="create-task" type="submit">Validate</button>
                    <button id="cancel-task" type="button" (click)="cancelNewTask()">Cancel</button>
                </div>
            </form>`,
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];
  alltasks: any[] = [];
  page = 0;
  limit = 5;
  completed = 'false';  // 'all', 'true', 'false'
  displayedTaskNbr = 5;
  isFormVisible: boolean = false;
  taskTitle: string = "";
  taskDescription: string = "";

  constructor(public taskService: TaskService) {}

  ngOnInit() {
    this.getTasks();
    this.getAllTasks();
  }

  getAllTasks() {
    this.taskService.getAllTasks().subscribe({
        next: (alldata) => {
          this.alltasks = alldata;
        },
        error: (error) => {
          console.log(error);
        }
    });
  }

  getTasks() {
    if(this.completed === 'all') {
        this.taskService.getAllTasks(this.page, this.limit).subscribe({
            next: (data) => {
              this.tasks = data;
            },
            error: (error) => {
              console.log(error);
            }
          });
    } else {
        this.taskService.getAllTasks(this.page, this.limit, this.completed).subscribe({
        next: (data) => {
            this.tasks = data;
        },
        error: (error) => {
            console.log(error);
        }
        });
    }
    console.log(this.alltasks.length);
  }

  openNewTaskForm() {
    this.isFormVisible = true;
  }

  addNewTask() {
    let title = this.taskTitle;
    let description = this.taskDescription;
    this.taskService.createTask(title, description).subscribe({
      next: (task) => {
        console.log('Task added:', task);
        this.getTasks();  // Récupérer les tâches mises à jour
        this.isFormVisible = false;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  cancelNewTask() {
    this.isFormVisible = false;
  }

  navigate(direction: string) {
    if (direction === 'previous' && this.page > 0) {
      this.page--;
    } else if (direction === 'next' && this.page * this.limit < this.alltasks.length) {
      this.page++;
    }
    this.getTasks();
  }

  updateFilter(completedState: string) {
    this.completed = completedState;
    this.getTasks();
  }
}
