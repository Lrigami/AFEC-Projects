import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component/app.component';
import { TodolistsListComponent } from './app/components/todolistsListComponent';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
bootstrapApplication(TodolistsListComponent, appConfig)
  .catch((err) => console.error(err));