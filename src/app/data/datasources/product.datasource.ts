import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../core/models/product.model';
import { ApiPaths } from '../../core/enums/api-paths.enum';
import { environment } from '../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ProductDatasource {
  private path = ApiPaths.Products;
  private verificationPath = ApiPaths.Verification;
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getProudcts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl + this.path);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl + this.path, product);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(this.apiUrl + this.path, product);
  }

  verifyProductById(id: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl + this.verificationPath}?id=${id}`);
  }

  deleteProductById(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl + this.path}?id=${id}`);
  }
}

