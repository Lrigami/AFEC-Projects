import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodolistsService } from '../services/todolistsServices';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'to-do-list',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
            <h3><img src="./assets/sunflower.png" alt="Sun icon" class="icon" />{{ list.title }}</h3>
            <p>Nombre de tâches&nbsp;:<span>{{ list.total }}</span></p>

            <svg viewBox="0 0 36 36" class="circle-svg">
  
            <path class="around" stroke-dasharray="{{list.total}}, {{list.total}}" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"></path>
            
            <path class="percent" stroke-dasharray="{{list.done}}, {{list.total}}" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"></path>
            
            <text x="18" y="14" text-anchor="middle" dy="7" font-size="20">{{list.done}}/{{list.total}}%</text>
  
            </svg>
    `,
})
export class TodolistsListComponent {
    @Input() list!: { title: string, total: number, done: number};
    todolists: any[] = [];
    alltodolists: any[] = [];
    isFormVisible: boolean = false;
    listTitle: string = "";

    constructor(public todolistsService: TodolistsService) {}

}