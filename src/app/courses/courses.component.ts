import { Component } from '@angular/core';
import { Course } from '../models/course';
import { CourseService } from '../services/course.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SchemeService } from '../services/scheme.service';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxPaginationModule], // Importerar pagineringsmodul
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {
  // Egenskap för kurslista, av typen Course (interface) som är en array. Initerar en tom array.
  courselist: Course[] = [];
  // Egenskap för filtrerade kurser av typen Course, initeras till tom array
  filteredCourses: Course[] = [];
  // Egenskap av typen sträng för sökinput, initeras till tom sträng
  searchValue: string = "";
  // Egenskap för valt ämne, initeras till tom sträng
  selectedSubject: string = "";
  // Egenskap för ämnen, initieras till tom array
  subjects: string[] = [];
  // Egenskap för antalet kurser som visas, initeras till 0
  displayedCourses: number = 0;
  // Egenskap för aktuell sida, initeras till 1
  thisPage: number = 1;
  // Egenskap för antalet kurser som ska visas på en sida, initieras till 30
  coursesPerPage: number = 30;
  // Egenskap för popupmeddelane
  showPopup: boolean = false;
  popupMessage: string = "";

  // Egenskaper för sorteringskolumn och sorteringsordning
  sortColumn: string = ""; // Initieras till tom textsträng
  sortOrder: boolean = true; // Initieras till true (stigande ordning)

  // Konstruktor som importerar service för kurser samt ramschema
  constructor(private courseservice: CourseService, private schemeservice: SchemeService) { }

  // Initmetod som körs när applikationen är startad och klar
  ngOnInit(): void {
    // Anropar metod för att hämta kurserna och prenumererar på svaret
    this.courseservice.getCourses().subscribe(data => {
      // Tar emot datan och lagrar i kurslistan (array)
      this.courselist = data;
      // Lagrar även datan i arrayen för filtrerade kurser
      this.filteredCourses = data;
      // Lägger till ämnen i subjects-arrayen från hämtade kurser, använder set för endast unika ämnen
      this.subjects = Array.from(new Set(data.map(course => course.subject)));
      // Uppdaterar antalet kurser som visas
      this.updateCourseDisplay();
    });
  }

  // Metod för att uppdatera antalet kurser som visas
  updateCourseDisplay(): void {
    // Sätter displayedCourses till längden på de filtrerade kurserna
    this.displayedCourses = this.filteredCourses.length;
  }

  // Metod för att filtrera kurser baserat på det valda ämnet
  filterBySubject(): void {
    // Kontrollerar om inget ämne är valt
    if (this.selectedSubject === "") {
      this.filteredCourses = this.courselist; // Återställer till att visa alla kurser
    } else {
      // Om ett ämne är valt filreras kurserna baserat på ämnet som har valts
      this.filteredCourses = this.courselist.filter(course => course.subject === this.selectedSubject);
    }
    // Uppdaterar antalet kurser som visas
    this.updateCourseDisplay();
  }

  // Metod för att söka efter kurs och lagra filtrerade kurser, returnerar inget värde
  searchCourse(): void {
    // Filtrerar kurser utifrån kurslistan
    this.filteredCourses = this.courselist.filter((course) =>
      // Kontrollerar om söksträngen matchar kursnamn eller kurskod, gör om till gemener
      course.courseName.toLowerCase().includes(this.searchValue.toLowerCase()) ||
      course.courseCode.toLowerCase().includes(this.searchValue.toLowerCase())
    );
    // Uppdaterar antalet kurser som visas
    this.updateCourseDisplay();
  }

  // Metod för att sortera kurserna baserat på den valda kolumnen
  // Använder keyof Course för att säkerställa att column är en giltig egenskap inom Course (code, coursename, progression eller syllabus)
  sortCourses(column: keyof Course): void {
    // Kontrollerar om den kolumn som klickats på för sortering är samma som den tidigare sorterade kolumnen
    if (this.sortColumn === column) {
      // Växlar isåfall sorteringsordningen mellan stigande och fallande
      this.sortOrder = !this.sortOrder;
    } else {
      // Uppdaterar annars till den nya valda kolumnen och ändrar sorteringsordning till stigande sortering
      this.sortColumn = column;
      this.sortOrder = true;
    }

    // Sorterar kurserna
    this.filteredCourses.sort((a, b) => {
      // Hämtar värdena från den valda kolumnen för två kurser som ska jämföras
      const firstRow = a[column];
      const secondRow = b[column];

      // Jämför radernas innehåll och returnerar beroende på aktuell sorteringsordning
      if (this.sortOrder) {
        // Om sortOrder är true (stigande ordning), returneras 1 om första raden är större än andra, annars returneras -1
        return firstRow > secondRow ? 1 : -1;
        // Om sortOrder är false (fallande ordning), returneras 1 om andra raden är större än första, annars returneras -1
      } else {
        return secondRow > firstRow ? 1 : -1;
      }
    });
  }

  // Metod för att lägga till kurs i ramschemat när användaren klickar på lägg till-knappen
  addToScheme(course: Course): void {
    this.schemeservice.addToSchedule(course); // Anropar metod för att lägga till kurs i ramschemat (service).
    this.displayPopup(); // Anropar metod för att visa popup
  }

  // Metod för att visa popup
  displayPopup() {
    this.showPopup = true; // Visar popup
    this.popupMessage = "Kurs tillagd i ramschema" // Sätter innehållet på meddelandet
    setTimeout(() => this.showPopup = false, 3000); // Sätter timeout, döljs efter 3 sekunder
  }
}