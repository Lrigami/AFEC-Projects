import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../services/taskServices';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-list-title',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `<h2 id="list-title">{{ title }}</h2>

            <button type="button" id="modify-title" (click)="openTitleForm()">Change title</button>

            <form id="change-title-interface" *ngIf="isFormVisible" (ngSubmit)="modifyTitle()">
                <label id="change-title-label" for="change-title">Choose a new title:</label>
                <input id="change-title" type="text" name="title-field" [(ngModel)]="newTitle">
                <button type="submit" id="validate-new-title" (click)="modifyTitle()">Validate</button>
                <button type="button" id="cancel-new-title" (click)="cancelNewTitle()">Cancel</button>
            </form>
            `,
})
export class ListTitleComponent implements OnInit {
    title: string = "";
    newTitle: string = "";
    isFormVisible: boolean = false;

    constructor(public taskService: TaskService) {}

    ngOnInit() {
        this.title = this.taskService.getTitle();
    }

    openTitleForm() {
        this.isFormVisible = true;
        this.newTitle = this.title;
    }

    modifyTitle() {
        if (this.newTitle.trim()) {
            this.taskService.setTitle(this.newTitle);
            this.title = this.newTitle;
        }
        this.isFormVisible = false;
    }

    cancelNewTitle() {
        this.newTitle = "";
        this.isFormVisible = false;
    }
}