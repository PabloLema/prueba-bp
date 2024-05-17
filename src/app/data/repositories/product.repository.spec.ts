import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ProductRepository } from './product.repository';
import { ProductDatasource } from '../datasources/product.datasource';
import { Product } from '../../core/models/product.model';

describe('ProductRepository', () => {
  let repository: ProductRepository;
  let datasourceSpy: jasmine.SpyObj<ProductDatasource>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ProductDatasource', ['getProudcts', 'createProduct', 'updateProduct', 'verifyProductById', 'deleteProductById']);

    TestBed.configureTestingModule({
      providers: [
        ProductRepository,
        { provide: ProductDatasource, useValue: spy }
      ]
    });

    repository = TestBed.inject(ProductRepository);
    datasourceSpy = TestBed.inject(ProductDatasource) as jasmine.SpyObj<ProductDatasource>;
  });

  it('should be created', () => {
    expect(repository).toBeTruthy();
  });

  it('should return expected products (getProudcts)', (done: DoneFn) => {
    const expectedProducts: Product[] = [
      { id: '1', name: 'Product 1', description: 'Description 1', logo: 'logo1', date_release: '2023-05-01', date_revision: '2024-05-01' },
      { id: '2', name: 'Product 2', description: 'Description 2', logo: 'logo2', date_release: '2023-06-01', date_revision: '2024-06-01' }
    ];
    datasourceSpy.getProudcts.and.returnValue(of(expectedProducts));

    repository.getProudcts().subscribe({
      next: products => {
        expect(products).toEqual(expectedProducts);
        done();
      },
      error: done.fail
    });

    expect(datasourceSpy.getProudcts.calls.count()).toBe(1, 'one call');
  });

  it('should create a product (createProduct)', (done: DoneFn) => {
    const newProduct: Product = { id: '1', name: 'Product 1', description: 'Description 1', logo: 'logo1', date_release: '2023-05-01', date_revision: '2024-05-01' };
    datasourceSpy.createProduct.and.returnValue(of(newProduct));

    repository.createProduct(newProduct).subscribe({
      next: product => {
        expect(product).toEqual(newProduct);
        done();
      },
      error: done.fail
    });

    expect(datasourceSpy.createProduct.calls.count()).toBe(1, 'one call');
  });

  it('should update a product (updateProduct)', (done: DoneFn) => {
    const updatedProduct: Product = { id: '1', name: 'Product 1', description: 'Description 1', logo: 'logo1', date_release: '2023-05-01', date_revision: '2024-05-01' };
    datasourceSpy.updateProduct.and.returnValue(of(updatedProduct));

    repository.updateProduct(updatedProduct).subscribe({
      next: product => {
        expect(product).toEqual(updatedProduct);
        done();
      },
      error: done.fail
    });

    expect(datasourceSpy.updateProduct.calls.count()).toBe(1, 'one call');
  });

  it('should verify a product by ID (verifyProductById)', (done: DoneFn) => {
    const productId = '1';
    datasourceSpy.verifyProductById.and.returnValue(of(true));

    repository.verifyProductById(productId).subscribe({
      next: result => {
        expect(result).toBe(true);
        done();
      },
      error: done.fail
    });

    expect(datasourceSpy.verifyProductById.calls.count()).toBe(1, 'one call');
  });

  it('should delete a product by ID (deleteProductById)', (done: DoneFn) => {
    const productId = '1';
    datasourceSpy.deleteProductById.and.returnValue(of(productId));

    repository.deleteProductById(productId).subscribe({
      next: result => {
        expect(result).toBe(productId);
        done();
      },
      error: done.fail
    });

    expect(datasourceSpy.deleteProductById.calls.count()).toBe(1, 'one call');
  });
});
