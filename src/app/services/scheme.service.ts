import { Injectable } from '@angular/core';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})

export class SchemeService {
  // Egenskaper
  scheme: Course[] = []; // Array för att lagra kurser i ramschemat, initeras till tom array av typen interfacet Course

  constructor() {
    // Läser in in ramschemat från localStorage vid start
    this.loadSchedule();
  }

  // Metod för att lägga till en kurs till ramschemat
  addToSchedule(course: Course): void {
    // Lägger till kursen i arrayen
    this.scheme.push(course);
    // Anropar metod för att spara kursen i localStorage
    this.saveSchedule();
  }

  // Metod för att ta bort en kurs från ramschemat
  removeFromSchedule(course: Course): void {
    // Filtrerar bort aktuell kurs baserat på kurskod
    this.scheme = this.scheme.filter(currentCourse => currentCourse.courseCode !== course.courseCode);
    // Anropar metod för att spara kurserna i localStorage
    this.saveSchedule();
  }

  // Metod för att hämta kurserna i ramschemat
  getSchedule(): Course[] {
    // Hämtar ramschemat från localStorage
    const storedSchedule = localStorage.getItem("scheme");
    // Kontrollerar om ramschemat finns i localStorage
    if (storedSchedule) {
      // Returnerar det sparade ramschemat om det finns
      return JSON.parse(storedSchedule);
    } else {
      // Annars returneras en tom array
      return [];
    }
  }

  // Metod för att hämta totala antalet högskolepoäng i ramschemat
  getTotalPoints(): number {
    let totalPoints = 0; // Initierar den totala poängen till 0
    // Loopar igenom schemat
    for (let i = 0; i < this.scheme.length; i++) {
      totalPoints += this.scheme[i].points; // Lägger till poängen för varje kurs till den totala summan
    }
    return totalPoints; // Returnerar den totala summan av poängen
  }

  // Metod för att spara ramschemat i localStorage
  saveSchedule(): void {
    // Sparar ramschemat under nyckeln "scheme"
    localStorage.setItem("scheme", JSON.stringify(this.scheme));
  }

  // Metod för att läsa in ramschemat från localStorage
  loadSchedule(): void {
    // Hämtar ramschemat från localStorage
    const storedSchedule = localStorage.getItem("scheme");
    if (storedSchedule) {
      this.scheme = JSON.parse(storedSchedule);
    }
  }
}
