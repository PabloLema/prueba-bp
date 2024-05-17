import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BTableComponent } from './b-table.component';
import { Product } from '../../../../core/models/product.model';

describe('BTableComponent', () => {
  let component: BTableComponent;
  let fixture: ComponentFixture<BTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BTableComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(BTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit editProduct event when onEdit is called', () => {
    const product: Product = {
      id: 'test-id',
      name: 'Test Product',
      description: 'Test description',
      logo: 'https://example.com/logo.png',
      date_release: '2023-01-01',
      date_revision: '2023-01-02',
    };
    const spy = spyOn(component.editProduct, 'emit');
    component.onEdit(product);
    expect(spy).toHaveBeenCalledWith(product);
  });

  it('should emit deleteProduct event when onDelete is called', () => {
    const product: Product = {
      id: 'test-id',
      name: 'Test Product',
      description: 'Test description',
      logo: 'https://example.com/logo.png',
      date_release: '2023-01-01',
      date_revision: '2023-01-02',
    };
    const spy = spyOn(component.deleteProduct, 'emit');
    component.onDelete(product);
    expect(spy).toHaveBeenCalledWith(product);
  });
});
