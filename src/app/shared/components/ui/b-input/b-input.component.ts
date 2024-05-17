import { CommonModule, NgIf } from '@angular/common';
import { Component, Input, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-b-input',
  standalone: true,
  imports: [NgIf, CommonModule, ReactiveFormsModule],
  templateUrl: './b-input.component.html',
  styleUrls: ['./b-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BInputComponent),
      multi: true,
    },
  ],
})
export class BInputComponent implements ControlValueAccessor, OnInit {
  @Input() label!: string;
  @Input() errorMessage!: string;
  @Input() control!: FormControl;

  value: any = '';
  touched = false;
  disabled = false;

  onChange = (_: any) => { };
  onTouched = () => { };

  constructor() { }

  ngOnInit(): void {
    if (this.disabled) {
      this.control.disable();
    }
  }

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    if (this.control) {
      isDisabled ? this.control.disable() : this.control.enable();
    }
  }

  markAsTouched() {
    if (!this.touched) {
      this.control.markAsTouched();
      this.touched = true;
      this.onTouched();
    }
  }

  onInput(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.value = inputValue;
    this.onChange(inputValue);
  }
}
