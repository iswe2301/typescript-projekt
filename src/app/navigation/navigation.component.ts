import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'; // Importerar slide toggle modul från Angular Material
import { FormsModule } from '@angular/forms';

// Importerar routerlink + active för navmenyn
@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatSlideToggleModule, FormsModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  // Skapat en egenskap av typen boolean för att definiera mobilmenyns synlighet, sätter initalt till false (dold)
  isVisible: boolean = false;

  // Egenskap för headerbild, av typen sträng som sätts till bildens URL
  headerImage: string = "./assets/images/header1.jpg";

  // Egenskap för darkmode, sätts initalt till false
  darkMode: boolean = false;

// Initmetod som körs när applikationen är startad och klar
  ngOnInit() {
    // Kontrollerar om dark mode är aktiverat i användarens inställningar
    this.darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches; // Slår på knappen om darkmode är påslaget för användaren (true)
    document.body.classList.toggle("dark-mode", this.darkMode); // Lägger till klassen dark-mode till bodyn vid true, tar bort vid false
  }

  // Metod för att toggla darkmode-knapp
  toggleDarkMode() {
    this.darkMode = !this.darkMode; // Togglar värdet på egenskap (false - true)
    document.body.classList.toggle("dark-mode", this.darkMode); // Togglar klass för sidans body
  }

  // Metod för att visa/dölja menyn, växlar värdet på isVisible som anropas när användaren klickar på menyknappen
  toggleMenu(): void {
    this.isVisible = !this.isVisible; // Väclar mellan true och false
  }

  // Metod för att dölja menyn vid klick på menylänk eller overlay
  hideMenu(): void {
    this.isVisible = false;
  }

  // Metod för att byta headerbild
  changeImage(newImage: string): void {
    this.headerImage = newImage; // Byter bilden
  }
}
