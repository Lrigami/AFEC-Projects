import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  public apiUrl = 'http://localhost:3000/api/tasks';

  constructor(private http: HttpClient) {}

  // Récupérer toutes les tâches
  getAllTasks(page?: number, limit?: number, completed?: string): Observable<any[]> {
    let url = `${this.apiUrl}?`
    if (page) {
        url += `page=${page}&`;
    }
    if (limit) {
        url += `limit=${limit}&`
    } 
    if (completed) {
        url += `completed=${completed}`
    }
    console.log(url);
    return this.http.get<any[]>(url);
  }

  // Créer une nouvelle tâche
  createTask(title: string, description: string): Observable<any> {
    const task = { title, description };
    return this.http.post<any>(this.apiUrl, task);
  }

  // Modifier le titre de la liste de tâches (si nécessaire)
  setTitle(title: string) {
    localStorage.setItem("title", title);
  }

  getTitle(): string {
    return localStorage.getItem("title") ?? 'My To-Do List';
  }
}
