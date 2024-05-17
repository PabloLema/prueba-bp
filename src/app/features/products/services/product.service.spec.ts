import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ProductService } from './product.service';
import { ProductRepository } from '../../../data/repositories/product.repository';
import { Product } from '../../../core/models/product.model';

describe('ProductService', () => {
  let service: ProductService;
  let repository: jasmine.SpyObj<ProductRepository>;

  beforeEach(() => {
    const repositorySpy = jasmine.createSpyObj(
      'ProductRepository',
      [
        'getProudcts',
        'createProduct',
        'updateProduct',
        'verifyProductById',
        'deleteProductById',
      ]
    );

    TestBed.configureTestingModule({
      providers: [
        ProductService,
        { provide: ProductRepository, useValue: repositorySpy }
      ]
    });
    service = TestBed.inject(ProductService);
    repository = TestBed.inject(ProductRepository) as jasmine.SpyObj<ProductRepository>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getProudcts and return a list of products', (done: DoneFn) => {
    const expectedProducts: Product[] = [{
      id: 'test-trj',
      name: 'test test',
      description: 'test test test',
      logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/…20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
      date_release: '2024-05-17T00:00:00.000+00:00',
      date_revision: '2025-05-17T00:00:00.000+00:00'
    }];
    repository.getProudcts.and.returnValue(of(expectedProducts));

    service.getProudcts().subscribe(products => {
      expect(products).toEqual(expectedProducts);
      done();
    });

    expect(repository.getProudcts).toHaveBeenCalled();
  });

  it('should call createProduct and return the created product', (done: DoneFn) => {
    const newProduct: Product = {
      id: 'test-trj',
      name: 'test test',
      description: 'test test test',
      logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/…20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
      date_release: '2024-05-17',
      date_revision: '2025-05-17'
    };

    repository.createProduct.and.returnValue(of(newProduct));

    service.createProduct(newProduct).subscribe(product => {
      expect(product).toEqual(newProduct);
      done();
    });

    expect(repository.createProduct).toHaveBeenCalledWith(newProduct);
  });

  it('should call updateProduct and return the updated product', (done: DoneFn) => {
    const updatedProduct: Product = {
      id: 'test-trj',
      name: 'test test',
      description: 'test test test',
      logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/…20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
      date_release: '2024-05-17',
      date_revision: '2025-05-17'
    };
    repository.updateProduct.and.returnValue(of(updatedProduct));

    service.updateProduct(updatedProduct).subscribe(product => {
      expect(product).toEqual(updatedProduct);
      done();
    });

    expect(repository.updateProduct).toHaveBeenCalledWith(updatedProduct);
  });

  it('should call verifyProductById and return true if product exists', (done: DoneFn) => {
    const productId = '11111';
    repository.verifyProductById.and.returnValue(of(true));

    service.verifyProductById(productId).subscribe(result => {
      expect(result).toBeTrue();
      done();
    });

    expect(repository.verifyProductById).toHaveBeenCalledWith(productId);
  });

  it('should call deleteProductById and return the id of the deleted product', (done: DoneFn) => {
    const productId = '11111';
    repository.deleteProductById.and.returnValue(of(productId));
  
    service.deleteProductById(productId).subscribe(result => {
      expect(result).toBe(productId);
      done();
    });
  
    expect(repository.deleteProductById).toHaveBeenCalledWith(productId);
  });
});

