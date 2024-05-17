import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

import { ContainerComponent } from '../../../../shared/components/container/container.component';
import { BTableComponent } from '../../../../shared/components/ui/b-table/b-table.component';
import { BInputComponent } from '../../../../shared/components/ui/b-input/b-input.component';
import { BButtonComponent } from '../../../../shared/components/ui/b-button/b-button.component';
import { BDropdownComponent } from '../../../../shared/components/ui/b-dropdown/b-dropdown.component';

import { Product } from '../../../../core/models/product.model';
import { ProductService } from '../../services/product.service';
import { BDialogComponent } from '../../../../shared/components/ui/b-dialog/b-dialog.component';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [
    ContainerComponent,
    BTableComponent,
    BInputComponent,
    BButtonComponent,
    BDropdownComponent,
    BDialogComponent,
    NgIf,
    NgFor,
  ],
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  product: Product = {} as Product;
  products: Product[] = [];
  filteredProducts: Product[] = [];

  dropdownOptions: string[] = ['5', '10', '20', 'Todos'];
  selectedValue: string = '5';
  search: FormControl = new FormControl('');

  messageDialog: string = '';
  showDialog: boolean = false;
  showSuccessDialog: boolean = false;

  constructor(
    private router: Router,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.loadProducts();
    this.setupSearch();
  }

  private loadProducts(): void {
    this.productService.getProudcts().subscribe((products) => {
      this.products = products;
      this.applyFilters();
    });
  }

  private setupSearch(): void {
    this.search.valueChanges.subscribe(() => {
      this.applyFilters();
    });
  }

  onEditProduct(product: Product): void {
    console.log('Editar producto:', product);
  }

  onDeleteProduct(product: Product): void {
    this.product = product;
    this.messageDialog = `¿Estás seguro de eliminar el producto ${product.name}?`;
    this.showDialog = true;
  }

  onDialogConfirmed(value: boolean) {
    if (value) {
      this.deleteProduct();
      this.showDialog = false;
    }
  }

  deleteProduct() {
    this.productService.deleteProductById(this.product.id).subscribe({
      next: (_) => { },
      error: (error) => {
        if (error.status === 200) {
          this.messageDialog = `Producto eliminado con éxito: ${this.product.id} - ${this.product.name}`;
          this.showSuccessDialog = true;
          this.loadProducts();
          return;
        }
        console.error('Error:', error);
        this.messageDialog = `Error al eliminar el producto: ${error.message || error}`;
        this.showSuccessDialog = true;
      },
      complete: () => console.log('Complete'),
    });
  }

  addProductNavigate(): void {
    this.router.navigate(['register-product']);
  }

  onSelectionChange(selectedValue: string): void {
    this.selectedValue = selectedValue;
    this.applyFilters();
  }

  private applyFilters(): void {
    const searchValue = this.search.value.toLowerCase();
    const filtered = this.filterBySearchValue(this.products, searchValue);
    this.filteredProducts = this.filterByDropdownValue(filtered, this.selectedValue);
  }

  private filterBySearchValue(products: Product[], searchValue: string): Product[] {
    return products.filter(product =>
      Object.values(product).some(value =>
        value.toString().toLowerCase().includes(searchValue),
      ),
    );
  }

  private filterByDropdownValue(products: Product[], selectedValue: string): Product[] {
    const count = selectedValue === 'Todos' ? products.length : parseInt(selectedValue, 10);
    return products.slice(0, count);
  }

  onDialogCanceled(value: boolean) {
    this.showDialog = false;
    if (value) {
      this.product = {} as Product;
    }
  }

  successDialog(_: boolean) {
    this.showSuccessDialog = false;
  }
}
