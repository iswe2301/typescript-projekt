import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

// Importerar routerlink + active för navmenyn
@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  // Skapat en egenskap av typen boolean för att definiera mobilmenyns synlighet, sätter initalt till false (dold)
  isVisible: boolean = false;

  // Metod för att visa/dölja menyn, växlar värdet på isVisible som anropas när användaren klickar på menyknappen
  toggleMenu(): void {
    this.isVisible = !this.isVisible; // Väclar mellan true och false
  }

  // Metod för att dölja menyn vid klick på menylänk eller overlay
  hideMenu(): void {
    this.isVisible = false;
  }
}
