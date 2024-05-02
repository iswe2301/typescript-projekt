import { Component } from '@angular/core';
import { CourseService } from '../services/course.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subject } from '../models/subject'; // Importerar interface-struktur för ämnen
import { SubjectStyle } from '../models/subjectstyle'; // Importerar interface för styling av ämnen

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  
  // Egenskaper
  totalSubjects: number = 0;  // Håller räkningen på det totala antalet unika ämnen
  counter: number = 0;   // Håller koll på nuvarande antal räknade kurser
  totalTime: number = 5000; // Total tid för räkningen av kurser (5 sek)
  intervalTime: number = 10; // Tidsintervall mellan varje ökning i räkningen
  courseSubjects: Subject[] = [];  // Lista för att lagra kursämnen med tillhörande stilar, av typen Subject-interface

  // Konstruktor som importerar service för kurser
  constructor(private courseService: CourseService) { }

  // Initmetod som körs när applikationen är startad och klar
  ngOnInit(): void {
    // Anropar metod för att hämta kurserna och prenumererar på svaret
    this.courseService.getCourses().subscribe(courses => {
      // Anropar metod för att räkna antalet kurser, skickar med längden på kurslistan
      this.countCourses(courses.length);
      // Skapar ett Set för att endast få unika ämnen
      const uniqueSubjects = new Set(courses.map(course => course.subject));
      // Konverterar till en Array och skapar ett objekt för varje ämne med namn och styling
      this.courseSubjects = Array.from(uniqueSubjects).map(subject => ({
        name: subject, // Namn på ämnet
        style: this.randomStyle() // Skapar en slumpmässig styling för ämnet
      }));
    });
  }

  // Metod för att räkna antalet kurser
  countCourses(total: number): void {
    // Beräknar hur många ämnen som ska läggas till per intervall
    const subjectsPerInterval = Math.ceil(total / (this.totalTime / this.intervalTime));
    // Skapar ett intervall för att räkna upp antalet ämnen
    const interval = setInterval(() => {
      // Ökar räknaren med det beräknade värdet
      this.counter += subjectsPerInterval;
      // Kontrollerar om räknaren nått det totala antalet ämnen
      if (this.counter > total) {
        this.totalSubjects = total; // Sätter totalSubjects till total när gränsen nås
        clearInterval(interval); // Stoppar intervallet när max nåtts
      } else {
        this.totalSubjects = this.counter; // Uppdaterar totalSubjects med det nuvarande värdet av counter
      }
    }, this.intervalTime); // Uppdaterar räknaren med tidsintervallet tills den når totalt antal kurser
  }

  // Metod för att styla kursämnen randomiserat
  randomStyle(): SubjectStyle {
    const size = Math.random() * (1.4 - 0.8) + 0.8;  // // Slumpar en fontstorlek mellan 0.8em och 1.4em
    const rotation = Math.random() * 30 - 15;  // Slumpar en rotationsvinkel mellan -15 och +15 grader
    
    let weight: string; // Deklarerar variabel för fontvikt
    // Bestämmer fontvikt baserat på slumpmässigt värde
    if (Math.random() > 0.5) {
      weight = "bold"; // Om värdet är större än 0.5 sätts fontvikt till bold.
    } else {
      weight = "normal"; // Annars normal
    }

    const marginX = Math.random() * 20 + 10;  // Horisontellt mellanrum
    const marginY = Math.random() * 20 + 10;  // Vertikalt mellanrum

    // Returnerar styling enligt interface-struktur (objekt)
    return {
      "font-size": `${size}em`,
      "font-weight": weight,
      "transform": `rotate(${rotation}deg)`,
      "display": "inline-block",
      "margin": `${marginY}px ${marginX}px`
    };
  }
}