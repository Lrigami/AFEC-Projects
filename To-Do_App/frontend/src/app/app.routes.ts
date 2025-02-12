import { Routes } from '@angular/router';
import { AppComponent } from './app.component/app.component';
import { TodolistsListComponent } from './components/todolistsListComponent';

export const routes: Routes = [
    {
        path: '',
        title: 'App to-do-lists list page',
        component: TodolistsListComponent,
    },
    {
        path: 'todolists',
        title: 'App to-do-list page',
        component: AppComponent,
    }
];
