import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodolistsService } from '../services/todolistsServices';
import { TodolistsListComponent } from './todolistsComponent';
import { FormsModule } from '@angular/forms';

@Component({
    selector:'to-do-lists-list',
    standalone: true,
    imports: [CommonModule, TodolistsListComponent, FormsModule],
    template: `
    
    `,
})export class TodolistsListComponent implements OnInit {
    lists: any[] = [];

    constructor(public todolistService: TodolistsService) {}

    ngOnInit() {
        this.todolistService.todolistList$.subscribe(() => this.getAllLists());
    }

    getAllLists() {
        this.todolistService.getAllLists().subscribe({
            next: (alldata) => {
                this.lists = alldata;
            },
            error: (error) => {
                console.log(error);
            }
        })
    }
}