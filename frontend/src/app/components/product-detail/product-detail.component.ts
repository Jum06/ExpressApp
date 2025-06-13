import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {ActivatedRoute, Router} from '@angular/router';


export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  demand: number;
  category?: { name: string };
}

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
  standalone: true,
})

export class ProductDetailComponent implements OnInit {
  product!: Product;
  isEditing = false;
  editedProduct!: Product;
  isSaving = false;
  error: string | null = null;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProduct(id).subscribe({
        next: (data) => this.product = data,
        error: () => this.error = 'Product not found'
      });
    } else {
      this.error = 'No product ID provided';
    }
  }

  goBack() {
    this.router.navigate(['/products']);
  }

  startEdit() {
    this.isEditing = true;
    this.editedProduct = { ...this.product };
    this.error = null;
  }

  cancelEdit() {
    this.isEditing = false;
    this.error = null;
  }

  deleteProduct() {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(this.product.id).subscribe(() => {
        this.router.navigate(['/products']);
      });
    }
  }

  async saveEdit() {
    this.isSaving = true;
    this.error = null;
    try {
      this.product = await this.productService.updateProduct(this.editedProduct.id, this.editedProduct).toPromise();
      this.isEditing = false;
    } catch (err: any) {
      this.error = err?.message || 'Failed to update product';
    } finally {
      this.isSaving = false;
    }
  }
}
