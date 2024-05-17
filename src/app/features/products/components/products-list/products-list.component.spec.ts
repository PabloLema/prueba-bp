import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { ProductsListComponent } from './products-list.component';
import { ProductService } from '../../services/product.service';
import { ContainerComponent } from '../../../../shared/components/container/container.component';
import { BTableComponent } from '../../../../shared/components/ui/b-table/b-table.component';
import { BInputComponent } from '../../../../shared/components/ui/b-input/b-input.component';
import { BButtonComponent } from '../../../../shared/components/ui/b-button/b-button.component';
import { BDropdownComponent } from '../../../../shared/components/ui/b-dropdown/b-dropdown.component';

describe('ProductsListComponent', () => {
  let component: ProductsListComponent;
  let fixture: ComponentFixture<ProductsListComponent>;
  let productServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    productServiceMock = {
      getProudcts: jasmine.createSpy('getProudcts').and.returnValue(of([
        {
          id: 'Product 1',
          name: 'Product 1',
          description: 'test-description',
          logo: 'test-logo',
          date_release: '2024-05-16',
          date_revision: '2025-05-16'
        },
        {
          id: 'test-id-2',
          name: 'test-name-2',
          description: 'test-description-2',
          logo: 'test-logo-2',
          date_release: '2024-05-16',
          date_revision: '2025-05-16'
        },
      ]))
    };

    routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    await TestBed.configureTestingModule({
      imports: [
        ProductsListComponent,
        ReactiveFormsModule,
        ContainerComponent,
        BTableComponent,
        BInputComponent,
        BButtonComponent,
        BDropdownComponent
      ],
      providers: [
        { provide: ProductService, useValue: productServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on initialization', () => {
    expect(productServiceMock.getProudcts).toHaveBeenCalled();
    expect(component.products.length).toBe(2); // Assuming 2 mock products
    expect(component.filteredProducts.length).toBe(2); // Initially, all products should be in filteredProducts
  });

  it('should filter products based on search input', () => {
    component.search.setValue('Product 1');
    expect(component.filteredProducts.length).toBe(1);
    expect(component.filteredProducts[0].name).toBe('Product 1');

    component.search.setValue('Nonexistent');
    expect(component.filteredProducts.length).toBe(0);
  });

  it('should filter products based on dropdown selection', () => {
    component.onSelectionChange('1');
    expect(component.filteredProducts.length).toBe(1);

    component.onSelectionChange('Todos');
    expect(component.filteredProducts.length).toBe(2); // Assuming 2 mock products
  });

  it('should navigate to register-product on addProductNavigate', () => {
    component.addProductNavigate();
    expect(routerMock.navigate).toHaveBeenCalledWith(['register-product']);
  });

  it('should handle editProduct event', () => {
    spyOn(console, 'log');
    const product = {
      id: 'test-id',
      name: 'test-name',
      description: 'test-description',
      logo: 'test-logo',
      date_release: '2024-05-16',
      date_revision: '2025-05-16'
    };
    component.onEditProduct(product);
    expect(console.log).toHaveBeenCalledWith('Editar producto:', product);
  });

  // it('should handle deleteProduct event', () => {
  //   spyOn(console, 'log');
  //   const product = {
  //     id: 'test-id',
  //     name: 'test-name',
  //     description: 'test-description',
  //     logo: 'test-logo',
  //     date_release: '2024-05-16',
  //     date_revision: '2025-05-16'
  //   };
  //   component.onDeleteProduct(product);
  //   expect(console.log).toHaveBeenCalledWith('Eliminar producto:', product.id);
  // });
});
