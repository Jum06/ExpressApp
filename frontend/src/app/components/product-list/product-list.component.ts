import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '../product/product.component';
import { ProductService } from '../../services/product.service';
import { WebSocketService } from '../../services/websocket.service';
import { Router } from '@angular/router';

interface Product {
  id: string;
  name: string;
  imageUrl: string;
  stock: number;
  demand: number;
}

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private websocketService: WebSocketService,
    private router: Router
  ) {}

  goToDetail(product: Product) {
    this.router.navigate(['/products', product.id]);
  }

  ngOnInit() {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });

    this.websocketService.getProductUpdates().subscribe((update: any) => {
      const idx = this.products.findIndex(p => p.id == update.id);
      if (idx !== -1) {
        this.products[idx].stock = update.stock;
        this.products[idx].demand = update.demand;
      }
    });
  }
}
