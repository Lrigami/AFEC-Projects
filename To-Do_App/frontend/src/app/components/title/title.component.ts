import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'title-comp',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './title.component.html',
    styleUrl: './title.component.css',
})
export class TitleComponent implements OnInit {
    @Input() service!: { getTitle: () => string, setTitle: (title: string) => string }; // Permet d'accepter n'importe quel service ayant getTitle() et un setTitle(string);
    title: string = "";
    newTitle: string = "";
    isFormVisible: boolean = false;

    ngOnInit() {
        if (this.service && typeof this.service.getTitle === 'function') { // Vérifie que le service ait bien un getTitle qui soit une fonction
            this.title = this.service.getTitle(); 
        } else {
            console.error("Le service fourni n'est pas valide !");
        }
    }

    openTitleForm() {
        this.isFormVisible = true;
        this.newTitle = this.title;
    }

    modifyTitle() {
        if (this.newTitle.trim()) {
            if (this.service && typeof this.service.setTitle === 'function') { // Vérifie que le service ait bien un setTitle qui soit une fonction
                this.service.setTitle(this.newTitle);
                this.title = this.newTitle;
            } else {
                console.error("Le service fourni n'est pas valide !");
            }
        }
        this.isFormVisible = false;
    }

    cancelNewTitle() {
        this.newTitle = "";
        this.isFormVisible = false;
    }
}