import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
// import { of } from 'rxjs';
import { ProductRegisterComponent } from './product-register.component';
import { ProductService } from '../../services/product.service';
import { DateService } from '../../../../core/services/date.service';
import { Product } from '../../../../core/models/product.model';
// import { fakeAsync, tick } from '@angular/core/testing';

describe('ProductRegisterComponent', () => {
  let component: ProductRegisterComponent;
  let fixture: ComponentFixture<ProductRegisterComponent>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;
  let dateServiceSpy: jasmine.SpyObj<DateService>;

  beforeEach(async () => {
    const productService = jasmine.createSpyObj('ProductService', ['verifyProductById', 'createProduct']);
    const dateService = jasmine.createSpyObj('DateService', ['parseDate', 'isValidDate', 'addOneYear', 'formatDate', 'transformDateToISO']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, ProductRegisterComponent],
      providers: [
        { provide: ProductService, useValue: productService },
        { provide: DateService, useValue: dateService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductRegisterComponent);
    component = fixture.componentInstance;
    productServiceSpy = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
    dateServiceSpy = TestBed.inject(DateService) as jasmine.SpyObj<DateService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    const form = component.productRegisterForm;
    expect(form).toBeDefined();
    expect(form.get('id')?.value).toBe('');
    expect(form.get('name')?.value).toBe('');
    expect(form.get('description')?.value).toBe('');
    expect(form.get('logo')?.value).toBe('');
    expect(form.get('date_release')?.value).toBe('');
    expect(form.get('date_revision')?.value).toBe('');
  });

  it('should mark the form as invalid if required fields are empty', () => {
    component.sendForm();
    expect(component.productRegisterForm.invalid).toBeTrue();
  });

  // it('should call verifyProductById and createProduct when form is valid and product does not exist', () => {
  //   const product: Product = {
  //     id: 'test-id',
  //     name: 'test-name',
  //     description: 'test-description',
  //     logo: 'test-logo',
  //     date_release: '2024-05-16',
  //     date_revision: '2025-05-16'
  //   };
  //   component.productRegisterForm.setValue({
  //     id: product.id,
  //     name: product.name,
  //     description: product.description,
  //     logo: product.logo,
  //     date_release: '16/05/2024',
  //     date_revision: '16/05/2025'
  //   });
  //
  //   productServiceSpy.verifyProductById.and.returnValue(of(false));
  //   productServiceSpy.createProduct.and.returnValue(of(product));
  //   dateServiceSpy.transformDateToISO.and.callFake((date) => date);
  //
  //   component.sendForm();
  //
  //   expect(productServiceSpy.verifyProductById).toHaveBeenCalledWith(product.id);
  //   expect(productServiceSpy.createProduct).toHaveBeenCalledWith(product);
  // });

  // it('should not call createProduct when form is valid but product exists', fakeAsync(() => {
  //   const product: Product = {
  //     id: '11111',
  //     name: 'test-name',
  //     description: 'test-description',
  //     logo: 'test-logo',
  //     date_release: '2024-05-16',
  //     date_revision: '2025-05-16'
  //   };
  //   component.productRegisterForm.setValue({
  //     id: product.id,
  //     name: product.name,
  //     description: product.description,
  //     logo: product.logo,
  //     date_release: '16/05/2024',
  //     date_revision: '16/05/2025'
  //   });
  //
  //   productServiceSpy.verifyProductById.and.returnValue(of(true));
  //   dateServiceSpy.transformDateToISO.and.callFake((date) => {
  //     const [day, month, year] = date.split('/');
  //     return `${year}-${month}-${day}`;
  //   });
  //
  //   component.sendForm();
  //
  //   tick(); // Avanza el tiempo simulado para completar las operaciones asíncronas
  //
  //   expect(productServiceSpy.verifyProductById).toHaveBeenCalledWith(product.id);
  //   expect(productServiceSpy.createProduct).not.toHaveBeenCalled();
  // }));

  it('should build product correctly from form values', () => {
    const product: Product = {
      id: 'test-id',
      name: 'test-name',
      description: 'test-description',
      logo: 'test-logo',
      date_release: '2024-05-16',
      date_revision: '2025-05-16'
    };
    component.productRegisterForm.setValue({
      id: product.id,
      name: product.name,
      description: product.description,
      logo: product.logo,
      date_release: '16/05/2024',
      date_revision: '16/05/2025'
    });

    dateServiceSpy.transformDateToISO.and.callFake((date) => {
      const [day, month, year] = date.split('/');
      return `${year}-${month}-${day}`;
    });

    expect(component.buildProduct()).toEqual(product);
  });

  it('should reset the form after product creation', () => {
    component.resetForm();
    const form = component.productRegisterForm;
    expect(form.get('id')?.value).toBe(null);
    expect(form.get('name')?.value).toBe(null);
    expect(form.get('description')?.value).toBe(null);
    expect(form.get('logo')?.value).toBe(null);
    expect(form.get('date_release')?.value).toBe(null);
    expect(form.get('date_revision')?.value).toBe(null);
  });
});
