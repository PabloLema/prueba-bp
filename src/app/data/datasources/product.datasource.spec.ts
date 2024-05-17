import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductDatasource } from './product.datasource';
import { Product } from '../../core/models/product.model';
import { environment } from '../../../enviroments/enviroment';
import { ApiPaths } from '../../core/enums/api-paths.enum';

describe('ProductDatasource', () => {
  let datasource: ProductDatasource;
  let httpMock: HttpTestingController;
  const apiUrl = environment.apiUrl;
  const path = ApiPaths.Products;
  const verificationPath = ApiPaths.Verification;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductDatasource]
    });

    datasource = TestBed.inject(ProductDatasource);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(datasource).toBeTruthy();
  });

  it('should retrieve products from the API via GET', () => {
    const dummyProducts: Product[] = [
      { id: '1', name: 'Product 1', description: 'Description 1', logo: 'logo1', date_release: '2023-05-01', date_revision: '2024-05-01' },
      { id: '2', name: 'Product 2', description: 'Description 2', logo: 'logo2', date_release: '2023-06-01', date_revision: '2024-06-01' }
    ];

    datasource.getProudcts().subscribe(products => {
      expect(products.length).toBe(2);
      expect(products).toEqual(dummyProducts);
    });

    const request = httpMock.expectOne(`${apiUrl}${path}`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyProducts);
  });

  it('should create a product via POST', () => {
    const newProduct: Product = { id: '3', name: 'Product 3', description: 'Description 3', logo: 'logo3', date_release: '2023-07-01', date_revision: '2024-07-01' };

    datasource.createProduct(newProduct).subscribe(product => {
      expect(product).toEqual(newProduct);
    });

    const request = httpMock.expectOne(`${apiUrl}${path}`);
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(newProduct);
    request.flush(newProduct);
  });

  it('should update a product via PUT', () => {
    const updatedProduct: Product = { id: '1', name: 'Updated Product', description: 'Updated Description', logo: 'updated-logo', date_release: '2023-05-01', date_revision: '2024-05-01' };

    datasource.updateProduct(updatedProduct).subscribe(product => {
      expect(product).toEqual(updatedProduct);
    });

    const request = httpMock.expectOne(`${apiUrl}${path}`);
    expect(request.request.method).toBe('PUT');
    expect(request.request.body).toEqual(updatedProduct);
    request.flush(updatedProduct);
  });

  it('should verify a product by id via GET', () => {
    const productId = '1';
    const verificationResult = true;

    datasource.verifyProductById(productId).subscribe(result => {
      expect(result).toBe(verificationResult);
    });

    const request = httpMock.expectOne(`${apiUrl}${verificationPath}?id=${productId}`);
    expect(request.request.method).toBe('GET');
    request.flush(verificationResult);
  });

  it('should delete a product by id via DELETE', () => {
    const productId = '1';
    const deleteResult = '1';

    datasource.deleteProductById(productId).subscribe(result => {
      expect(result).toBe(deleteResult);
    });

    const request = httpMock.expectOne(`${apiUrl}${path}?id=${productId}`);
    expect(request.request.method).toBe('DELETE');
    request.flush(deleteResult);
  });
});
