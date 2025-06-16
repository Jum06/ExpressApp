import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { EditFieldComponent } from '../edit-field/edit-field.component';
import { FormsModule } from '@angular/forms';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  demand: number;
  category?: { id: number; name: string };
}

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
  imports: [
    EditFieldComponent,
    FormsModule
  ],
  standalone: true
})
export class ProductDetailComponent implements OnInit {
  product?: Product;
  private apiUrl = 'http://localhost:3000/api/v1/products';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.http.get<Product>(`${this.apiUrl}/${id}`).subscribe(product => {
        this.product = product;
      });
    }
  }

  updateField(field: keyof Product, value: any) {
    if (!this.product) return;
    const updated: any = {
      name: this.product.name,
      description: this.product.description,
      price: this.product.price,
      stock: this.product.stock,
      demand: this.product.demand,
      category_id: this.product.category?.id // include category_id if available
    };
    updated[field] = value;
    this.http.put<Product>(`${this.apiUrl}/${this.product.id}`, updated)
      .subscribe(product => {
        this.product = product;
      });
  }

  goBack() {
    this.router.navigate(['/products']);
  }

  deleteProduct() {
    if (!this.product) return;
    this.http.delete(`${this.apiUrl}/${this.product.id}`).subscribe(() => {
      this.router.navigate(['/products']);
    });
  }
}
