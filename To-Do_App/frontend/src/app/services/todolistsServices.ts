import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root', // portée : application entière
})
export class TodolistsService {
    private todolistListSubject = new BehaviorSubject<void>(null!);
    todolistList$ = this.todolistListSubject.asObservable();
    private apiURL = 'http://localhost:3000/api/collections';

    constructor(private http: HttpClient) {}

    getAllCollections(): Observable<any[]> {
        return this.http.get<any[]>(this.apiURL);
    }

    // ajouter les méthodes pour créer une nouvelle collection
}