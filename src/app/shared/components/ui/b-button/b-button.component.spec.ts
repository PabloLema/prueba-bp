import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BButtonComponent } from './b-button.component';

describe('BButtonComponent', () => {
  let component: BButtonComponent;
  let fixture: ComponentFixture<BButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BButtonComponent], // Asegúrate de importar el componente
    }).compileComponents();

    fixture = TestBed.createComponent(BButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default type "primary"', () => {
    expect(component.type).toEqual('primary');
  });

  it('should apply "primary" class when type is "primary"', () => {
    component.type = 'primary';
    fixture.detectChanges();
    const buttonElement: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(buttonElement.classList.contains('primary')).toBeTrue();
    expect(buttonElement.classList.contains('secondary')).toBeFalse();
  });

  it('should apply "secondary" class when type is "secondary"', () => {
    component.type = 'secondary';
    fixture.detectChanges();
    const buttonElement: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(buttonElement.classList.contains('primary')).toBeFalse();
    expect(buttonElement.classList.contains('secondary')).toBeTrue();
  });

  it('should be disabled when disabled input is true', () => {
    component.disabled = true;
    fixture.detectChanges();
    const buttonElement: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(buttonElement.disabled).toBeTrue();
  });

  it('should not be disabled when disabled input is false', () => {
    component.disabled = false;
    fixture.detectChanges();
    const buttonElement: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(buttonElement.disabled).toBeFalse();
  });

  it('should emit onClick event when button is clicked', () => {
    const spy = spyOn(component.onClick, 'emit');
    const buttonElement: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    buttonElement.click();
    expect(spy).toHaveBeenCalled();
  });
});
