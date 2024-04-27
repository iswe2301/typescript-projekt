import { Injectable } from '@angular/core';
import { Course } from '../models/course';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  // Privat egenskap för url, av typen sträng
  private url: string = "https://matdah.github.io/DT208G---Programmering-i-TypeScript/Moment%205%20-%20Projekt/miun_courses.json";

  // Konstruktor
  constructor(private http: HttpClient) { } // Läser in http-klienten för att få tillgång i klassen

  // Metod för att hämta kurser, tar emot en array av kurser enligt interfacet
  getCourses(): Observable<Course[]> {
    // Returnerar datat från URL:en genom get-metoden
    return this.http.get<Course[]>(this.url);
  }
}
