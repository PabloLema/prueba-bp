import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-b-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './b-button.component.html',
  styleUrl: './b-button.component.scss'
})
export class BButtonComponent {
  @Input() type: 'primary' | 'secondary' = 'primary';
  @Input() disabled = false;
  @Output() onClick = new EventEmitter<void>();

  handleClick() {
    this.onClick.emit();
  }
}
