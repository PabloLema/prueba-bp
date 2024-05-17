import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-b-dropdown',
  standalone: true,
  imports: [NgFor],
  templateUrl: './b-dropdown.component.html',
  styleUrl: './b-dropdown.component.scss'
})
export class BDropdownComponent {
  @Input() options: string[] = [];
  @Output() selectionChange = new EventEmitter<string>();

  onSelect(value: string | null) {
    if (value) {
      this.selectionChange.emit(value);
    }
  }
}
