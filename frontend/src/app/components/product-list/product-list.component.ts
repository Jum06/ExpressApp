import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '../product/product.component';
import { ProductService } from '../../services/product.service';
import { WebsocketService } from '../../services/websocket.service';

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
    private websocketService: WebsocketService
  ) {}

  ngOnInit() {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });

    this.websocketService.getStockUpdates().subscribe(update => {
      const idx = this.products.findIndex(p => p.id == update.productId);
      if (idx !== -1) {
        this.products[idx].stock = update.stock;
        this.products[idx].demand = update.demand;
      }
    });
  }
}
