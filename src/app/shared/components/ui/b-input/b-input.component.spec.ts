import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { BInputComponent } from './b-input.component';

describe('BInputComponent', () => {
  let component: BInputComponent;
  let fixture: ComponentFixture<BInputComponent>;
  let control: FormControl;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BInputComponent, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(BInputComponent);
    component = fixture.componentInstance;

    control = new FormControl('', Validators.required);
    component.control = control;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display label', () => {
    component.label = 'Nombre';
    fixture.detectChanges();
    const labelElement = fixture.nativeElement.querySelector('label');
    expect(labelElement.textContent.trim()).toEqual('Nombre');
  });

  it('should apply "error" class when control is invalid', () => {
    component.label = 'Nombre';
    control.setValue('');
    fixture.detectChanges();
  
    // Simula un cambio de foco a otro input
    const otherInputElement = fixture.nativeElement.querySelector('input');
    otherInputElement.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
  
    const inputElement = fixture.nativeElement.querySelector('input');
    expect(inputElement.classList.contains('error')).toBeTrue();
  });

  it('should display error message when control is invalid', () => {
    component.label = 'Nombre';
    component.errorMessage = 'Campo requerido';
    control.setValue('');
    fixture.detectChanges();
  
    // Simula un cambio de foco a otro input
    const otherInputElement = fixture.nativeElement.querySelector('input');
    otherInputElement.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
  
    const errorMessageElement = fixture.nativeElement.querySelector('.error-message');
    expect(errorMessageElement.textContent.trim()).toEqual('Campo requerido');
  });

  it('should call markAsTouched on blur', () => {
    const spy = spyOn(component, 'markAsTouched');
    const inputElement = fixture.nativeElement.querySelector('input');
    inputElement.dispatchEvent(new Event('blur'));
    expect(spy).toHaveBeenCalled();
  });

  it('should update value and call onChange on input', () => {
    const spy = spyOn(component, 'onChange');
    const inputElement = fixture.nativeElement.querySelector('input');
    inputElement.value = 'Test';
    inputElement.dispatchEvent(new Event('input'));
    expect(component.value).toEqual('Test');
    expect(spy).toHaveBeenCalledWith('Test');
  });

  it('should call onTouched on blur', () => {
    const spy = spyOn(component, 'onTouched');
    const inputElement = fixture.nativeElement.querySelector('input');
    inputElement.dispatchEvent(new Event('blur'));
    expect(spy).toHaveBeenCalled();
  });

  it('should set disabled state', () => {
    component.setDisabledState(true);
    fixture.detectChanges();
    const inputElement = fixture.nativeElement.querySelector('input');
    expect(inputElement.disabled).toBeTrue();
  });
});
