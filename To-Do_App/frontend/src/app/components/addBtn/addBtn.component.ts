import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'add-btn',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './addBtn.component.html',
    styleUrl: './addBtn.component.css',
})
export class AddBtnComponent {
    @Output() addClicked = new EventEmitter<void>();

    onClick() {
        this.addClicked.emit();
    }
}