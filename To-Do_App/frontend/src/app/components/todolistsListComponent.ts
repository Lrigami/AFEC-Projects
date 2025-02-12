import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodolistsService } from '../services/todolistsServices';
import { TodolistsComponent } from './todolistsComponent';
import { FormsModule } from '@angular/forms';

@Component({
    selector:'to-do-lists-list',
    standalone: true,
    imports: [CommonModule, TodolistsComponent, FormsModule],
    template: `
        <div *ngFor="let list of lists">
            <to-do-list [list]="list" class="to-do-list-card"></to-do-list>

            <button id="add-to-do-list"><img src="../assets/bee-add.png" alt="icon of a happy bee and a plus" class="add-to-do-list"/></button>
        </div>
    `,
    styles: `
        
    `,
})export class TodolistsListComponent implements OnInit {
    lists: any[] = [];
    alltodolists: any[] = [];

    constructor(public todolistService: TodolistsService) {}

    ngOnInit() {
        this.todolistService.todolistList$.subscribe(() => this.getAllLists());
    }

    getAllLists() {
        this.todolistService.getAllCollections().subscribe({
            next: (alldata) => {
                this.lists = alldata;
            },
            error: (error) => {
                console.log(error);
            }
        })
    }
}