import { Injectable } from '@angular/core';
import { Course } from '../models/course';
import { jsPDF } from 'jspdf'; // Importerar jsPDF för att kunna ladda ner ramschema som pdf

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

  // Metod för att skapa en nedladdningsbar PDF (ramschema av typen course-interace)
  generatePDF(schedule: Course[]): void {
    const PDF = new jsPDF(); // Skapar en pdf

    // Egenskaper
    const x: number = 10; // X-positionen för texten
    let y: number = 20; // Y-positionen för texten
  
    // Lägger till huvudrubrik och storlek på rubriken
    PDF.setFontSize(20);
    PDF.text("Ramschema", x, y);
    y += 15; // Ökar Y-positionen för nästa text
  
    // Loopar igenom schemat och lägger till information om varje kurs på PDF:en
    schedule.forEach(course => {
      // Kontrollerar om nästa kurs ryms på sidan, annars läggs en ny sida till
      if (y + 40 > PDF.internal.pageSize.height) {
        PDF.addPage(); // Lägger till ny sida
        y = 20; // Återställer Y-positionen för den nya sidan
      }
      PDF.setFontSize(12); // Minskar typsnittets storlek för kursinformationen
      PDF.text(`Kurskod: ${course.courseCode}`, x, y); // Placeras 10 punkter från vänster (x)
      PDF.text(`Kursnamn: ${course.courseName}`, x, y + 10); // Placeras 20 punkter nedanför y:s tidigare värde
      PDF.text(`Poäng: ${course.points}`, x, y + 20);
      PDF.text(`Ämne: ${course.subject}`, x, y + 30);
      y += 50; // Ökar Y-positionen för nästa kurs
    });
    // Laddar ner/sparar PDF:en
    PDF.save("ramschema.pdf");
  }  

}