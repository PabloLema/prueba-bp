import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BDropdownComponent } from './b-dropdown.component';
import { By } from '@angular/platform-browser';

describe('BDropdownComponent', () => {
  let component: BDropdownComponent;
  let fixture: ComponentFixture<BDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BDropdownComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(BDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render options correctly', () => {
    const options = ['5', '10', '20'];
    component.options = options;
    fixture.detectChanges();

    const optionElements = fixture.debugElement.queryAll(By.css('option'));
    expect(optionElements.length).toBe(options.length);
    optionElements.forEach((optionEl, index) => {
      expect(optionEl.nativeElement.value).toBe(options[index]);
      expect(optionEl.nativeElement.textContent.trim()).toBe(options[index]);
    });
  });

  it('should emit selectionChange with the selected value', () => {
    const options = ['5', '10', '20'];
    component.options = options;
    fixture.detectChanges();

    spyOn(component.selectionChange, 'emit');

    const selectEl = fixture.debugElement.query(By.css('select')).nativeElement;
    selectEl.value = options[1];
    selectEl.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(component.selectionChange.emit).toHaveBeenCalledWith(options[1]);
  });

  it('should not emit selectionChange if value is null', () => {
    spyOn(component.selectionChange, 'emit');

    component.onSelect(null);

    expect(component.selectionChange.emit).not.toHaveBeenCalled();
  });
});
