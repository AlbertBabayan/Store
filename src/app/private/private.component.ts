import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeadComponent} from './head/head.component';

@Component({
  selector: 'app-private',
  standalone: true,
  imports: [
    RouterOutlet,
    HeadComponent
  ],
  templateUrl: './private.component.html',
  styleUrl: './private.component.scss'
})
export class PrivateComponent {
}
