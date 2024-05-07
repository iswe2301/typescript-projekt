import { Component } from '@angular/core';
import { Course } from '../models/course';
import { SchemeService } from '../services/scheme.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-scheme',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scheme.component.html',
  styleUrl: './scheme.component.scss'
})
export class SchemeComponent {

  // Egenskaper
  scheme: Course[] = []; // Array för att lagra kurser i ramschemat, initeras till tom array av typen interfacet Course
  totalPoints: number = 0; // Totala antalet högskolepoäng i ramschemat, initeras till 0
  courseCount: number = 0;  // Antal kurser, initeras till 0

    // Konstruktor som importerar service för ramschema
  constructor(private schemeservice: SchemeService) { }

  // Initmetod som körs när applikationen är startad och klar
  ngOnInit(): void {
    // Hämtar ramschemat från servicen
    this.scheme = this.schemeservice.getSchedule();
    // Hämtar totala antalet högskolepoäng i ramschemat
    this.totalPoints = this.schemeservice.getTotalPoints();
    this.courseCount = this.scheme.length // Hämtar längden på antalet kurser i ramschemat
  }

  // Metod för att ta bort en kurs från ramschemat
  removeFromScheme(course: Course): void {
    // Anropar metod för att ta bort kursen, skickar med kursobjektet
    this.schemeservice.removeFromSchedule(course);
    // Uppdaterar visningen ramschemat och antalet högskolepoäng efter att kursen har tagits bort (anropar metoderna i servicen)
    this.scheme = this.schemeservice.getSchedule();
    this.totalPoints = this.schemeservice.getTotalPoints();
    this.courseCount = this.scheme.length // Hämtar längden på antalet kurser i ramschemat
  }

  // Metod för att ladda ner ramschema som PDF
  downloadPDF(): void {
    this.schemeservice.generatePDF(this.scheme); // Anropar service för att ladda ner ramschemat, skickar med ramschemat som arg.
  }
}
