import { CommonModule, NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../../core/models/product.model';
import { LocalDatePipe } from '../../../pipes/local-date.pipe';

@Component({
  selector: 'app-b-table',
  standalone: true,
  imports: [
    NgFor,
    CommonModule,
    LocalDatePipe,
  ],
  templateUrl: './b-table.component.html',
  styleUrl: './b-table.component.scss'
})
export class BTableComponent {
  @Input() products: Product[] = [];

  @Output() editProduct = new EventEmitter<Product>();
  @Output() deleteProduct = new EventEmitter<Product>();

  onEdit(product: Product): void {
    this.editProduct.emit(product);
  }

  onDelete(product: Product): void {
    this.deleteProduct.emit(product);
  }
}
