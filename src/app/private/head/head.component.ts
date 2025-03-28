import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-head',
  standalone: true,
  imports: [],
  templateUrl: './head.component.html',
  styleUrl: './head.component.scss'
})
export class HeadComponent {
  private router = inject(Router);

  public navToProducts() {
    this.router.navigate(['products']);
  }

  public navToCarts() {
    this.router.navigate(['cart']);
  }
}
