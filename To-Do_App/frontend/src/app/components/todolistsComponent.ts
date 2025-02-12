import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodolistsService } from '../services/todolistsServices';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'to-do-list',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
            <h3><img src="../../assets/sunflower.png" alt="Sun icon" class="icon" />{{ list.title }}</h3>
            <p>Nombre de tâches&nbsp;:<span>{{ list.total }}</span></p>

            <svg viewBox="0 0 36 36" class="circle-svg">
  
            <path class="around" [attr.stroke-dasharray]="list.total + ', ' + list.total" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"></path>
            
            <path class="percent" [attr.stroke-dasharray]="list.done + ', ' + list.total" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"></path>
            
            <text x="18" y="14" text-anchor="middle" dy="7" font-size="20"> {{ listPercentage }}%</text>
  
            </svg>
    `,
    styles: `@keyframes progress {
            0% {
                stroke-dasharray: 0 100;
            }
            }
            .circle-svg {
            display: block;
            margin: 10px auto;
            max-height: 100px;
            }
            .circle-svg text {
            text-align:center;
            color:black;
            font-size:10px
            }
            .circle-svg path.percent {
            stroke: #6f6fff;
            fill: none;
            stroke-width: 2.8;
            stroke-linecap: round;
            animation: progress 1s ease-out forwards;
            }
            .circle-svg path.around {
                stroke: #c4c4c4;
                fill: none;
                stroke-width: 2.8;
            }
            body {
            text-align:center;
            }
    `,
})
export class TodolistsComponent {
    @Input() list!: { title: string, total: number, done: number};
    isFormVisible: boolean = false;
    listTitle: string = "";
    listTotal: number = 0;
    listDone: number = 0;
    listPercentage: number = 0;

    constructor(public todolistsService: TodolistsService) {}

    ngOnInit() {
        this.listTitle = this.list.title;
        this.listTotal = this.list.total;
        this.listDone = this.list.done;
        this.listPercentage = this.listDone / this.listTotal * 100;
    }
}