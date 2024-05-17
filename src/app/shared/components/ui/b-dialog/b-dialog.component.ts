import {NgIf} from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {BButtonComponent} from '../b-button/b-button.component';

@Component({
  selector: 'app-b-dialog',
  standalone: true,
  imports: [
    NgIf,
    BButtonComponent,
  ],
  templateUrl: './b-dialog.component.html',
  styleUrl: './b-dialog.component.scss'
})
export class BDialogComponent {
  @Input() message: string = '';
  @Input() show: boolean = false;
  @Input() showCancelButton: boolean = true;

  @Output() confirmed: EventEmitter<boolean> = new EventEmitter();
  @Output() canceled: EventEmitter<boolean> = new EventEmitter();

  close() {
    this.show = false;
  }

  confirm() {
    this.confirmed.emit(true);
    this.close();
  }

  cancel() {
    this.canceled.emit(true);
    this.close();
  }
}
