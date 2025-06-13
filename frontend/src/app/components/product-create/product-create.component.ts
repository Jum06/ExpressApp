import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-create',
  imports: [CommonModule, FormsModule],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.scss',
  standalone: true
})
export class ProductCreateComponent {
  @Output() close = new EventEmitter<void>();
  name = '';
  description = '';
  price = 0;
  stock = 0;
  demand = 0;

  constructor(private productService: ProductService) {}

  submit() {
    this.productService.createProduct({
      name: this.name,
      description: this.description,
      price: this.price,
      stock: this.stock,
      demand: this.demand
    }).subscribe(() => {
      this.close.emit();
      window.location.reload();
    });
  }
}
