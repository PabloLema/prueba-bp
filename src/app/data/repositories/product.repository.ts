import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../core/models/product.model';
import { ProductDatasource } from '../datasources/product.datasource';

@Injectable({
  providedIn: 'root'
})
export class ProductRepository {
  constructor(private datasource: ProductDatasource) { }

  getProudcts(): Observable<Product[]> {
    return this.datasource.getProudcts();
  }

  createProduct(product: Product): Observable<Product> {
    return this.datasource.createProduct(product);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.datasource.updateProduct(product);
  }

  verifyProductById(id: string): Observable<boolean> {
    return this.datasource.verifyProductById(id);
  }

  deleteProductById(id: string): Observable<any> {
    return this.datasource.deleteProductById(id);
  }
}

