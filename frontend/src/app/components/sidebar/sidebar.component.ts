import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductCreateComponent } from '../product-create/product-create.component';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, ProductCreateComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  standalone: true
})
export class SidebarComponent {
  constructor(private router: Router) {}
  showProductModal = false;

  openCreateDialog() {
    const url = this.router.url;
    if (url.includes('products')) {
      this.showProductModal = true;
    } else if (url.includes('categories')) {
      alert('Open create category dialog');
    }
  }
  closeProductModal() {
    this.showProductModal = false;
  }
}
