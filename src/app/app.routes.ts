import { Routes } from '@angular/router';
import { SchemeComponent } from './scheme/scheme.component';
import { CoursesComponent } from './courses/courses.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

// Applikationens rutter
export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'courses', component: CoursesComponent },
    { path: 'scheme', component: SchemeComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '404', component: NotFoundComponent },
    { path: '**', component: NotFoundComponent }
];
