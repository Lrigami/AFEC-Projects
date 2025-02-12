import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

// modifier ce fichier pour que cela s'applique à n'importe quelle collection 

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private taskListSubject = new BehaviorSubject<void>(null!);
  taskList$ = this.taskListSubject.asObservable();
  private apiUrl = 'http://localhost:3000/api/tasks';

  constructor(private http: HttpClient) {}

  setTitle(title: string) {
    localStorage.setItem("title", title);
  }

  getTitle(): string {
    return localStorage.getItem("title") ?? 'My To-Do List';
  }

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

  createTask(title: string, description: string): Observable<any> {
    const task = { title, description };
    return this.http.post<any>(this.apiUrl, task).pipe(
      tap(() => {
          this.taskListSubject.next();
      })
    );
  }

  updateTask(task: {id: string, title: string, description?: string, completed: boolean}): Observable<any> {
    return this.http.put<any>(`http://localhost:3000/api/tasks/${task.id}`, task).pipe(
        tap(() => {
            this.taskListSubject.next();
        })
    );
  }

  deleteTask(id: string) {
    return this.http.delete<any>(`http://localhost:3000/api/tasks/${id}`).pipe(
        tap(() => {
            this.taskListSubject.next();
        })
    )
  }
}
