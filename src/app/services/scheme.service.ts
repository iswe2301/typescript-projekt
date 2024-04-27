import { Injectable } from '@angular/core';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})

export class SchemeService {
  // Egenskaper
  scheme: Course[] = []; // Array för att lagra kurser i ramschemat, initeras till tom array av typen interfacet Course

  constructor() {
  }

  // Metod för att lägga till en kurs till ramschemat
  addToSchedule(course: Course): void {
    // Lägger till kursen i arrayen
    this.scheme.push(course);
    // Anropar metod för att spara kursen i localStorage
    this.saveSchedule();
  }

  // Metod för att spara ramschemat i localStorage
  saveSchedule(): void {
    // Sparar ramschemat under nyckeln "scheme"
    localStorage.setItem("scheme", JSON.stringify(this.scheme));
  }
}
