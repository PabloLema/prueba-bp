import { Injectable } from '@angular/core';
import { ProductRepository } from '../../../data/repositories/product.repository';
import { Observable } from 'rxjs';
import { Product } from '../../../core/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private productRepository: ProductRepository) { }

  getProudcts(): Observable<Product[]> {
    return this.productRepository.getProudcts();
  }

  createProduct(product: Product): Observable<Product> {
    return this.productRepository.createProduct(product);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.productRepository.updateProduct(product);
  }

  verifyProductById(id: string): Observable<boolean> {
    return this.productRepository.verifyProductById(id);
  }

  deleteProductById(id: string): Observable<any> {
    return this.productRepository.deleteProductById(id);
  }
}
