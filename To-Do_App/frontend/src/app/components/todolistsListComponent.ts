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
        <div id="to-do-lists-list" *ngFor="let list of lists">
            <a href="http://localhost:4200/to-do-list.html"><to-do-list [list]="list" class="to-do-list-card"></to-do-list></a>
        </div>
    `,
    styles: `
        div {
            width: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            gap: 20px;
        }

        a {
            cursor: pointer;
            text-decoration: none;
            color: unset;
        }

        a:hover {
            scale: 1.02;
            transition: 0.1s;
        }

        to-do-list {
            width: 200px;
            height: 250px;
            border-radius: 5px;
            border: 1px solid black;
            filter: drop-shadow(-10px 0px 5px rgb(255, 204, 94));
            background-color:rgb(253, 254, 206);
            display: flex;
            flex-direction: column; 
            align-items: center;
        }

        button {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: transparent;
            border: 1px solid black;
            display: flex;
            justify-content: center;
            align-items: center;
            align-self: flex-end;
            padding: 0;
            cursor: pointer;
        }

        button img {
            width: 60px;
            height: 60px;
        }
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