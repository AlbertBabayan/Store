import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeadComponent} from './head/head.component';
import {ProductService} from './product.service';

@Component({
  selector: 'app-private',
  standalone: true,
  imports: [
    RouterOutlet,
    HeadComponent
  ],
  providers: [ProductService],
  templateUrl: './private.component.html',
  styleUrl: './private.component.scss'
})
export class PrivateComponent {
}
