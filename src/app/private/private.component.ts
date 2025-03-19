import {Component, inject} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-private',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './private.component.html',
  styleUrl: './private.component.scss'
})
export class PrivateComponent {
  private router = inject(Router);

  public navToProducts() {
    this.router.navigate(['products']);
  }
}
