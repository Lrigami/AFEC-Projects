import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../services/taskServices';
import { TaskCardComponent } from './taskCardComponent'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  standalone: true, 
  imports: [CommonModule, TaskCardComponent, FormsModule], 
  template: `
            <div id="params">
                <h2>Parameters</h2>
                <label for="displayed-task-nbr">Number of tasks displayed per page:</label>
                <select id="displayed-task-nbr" (change)="changeLimit($event)">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="25">25</option>
                    <option value="30">30</option>
                </select>
                <label for="completed-state">Display tasks:</label>
                <select id="completed-state" (change)="changeCompletedState($event)">
                    <option value="true">Completed</option>
                    <option value="false">In progress</option>
                    <option value="" selected>All</option>
                </select>
            </div>
  
            <h3> List of tasks: </h3>

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
                <input type="text" placeholder="Task Title" name="taskTitle" required [(ngModel)]="taskTitle"/>
                <label for="taskDescription">Description:</label>
                <textarea id="taskDescription" type="text" name="task-description-field" name="taskDescription" rows="5" cols="20" [(ngModel)]="taskDescription"></textarea>
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
  completed = 'false';
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

  changeLimit(event: Event) {
    const value = Number((event.target as HTMLSelectElement).value);
    this.limit = value;
    this.getTasks();
  }

  changeCompletedState(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.completed = value;
    this.getTasks();
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
        this.taskTitle = "";
        this.taskDescription = "";
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
