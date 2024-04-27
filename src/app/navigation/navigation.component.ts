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

}
