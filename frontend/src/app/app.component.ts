import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ProductComponent} from './components/product/product.component';
import {HeadComponent} from './components/head/head.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProductComponent, HeadComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
}
