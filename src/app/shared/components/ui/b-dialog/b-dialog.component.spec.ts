import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BDialogComponent } from './b-dialog.component';
import { BButtonComponent } from '../b-button/b-button.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('BDialogComponent', () => {
  let component: BDialogComponent;
  let fixture: ComponentFixture<BDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BDialogComponent, BButtonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(BDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog when close() is called', () => {
    component.show = true;
    component.close();
    expect(component.show).toBe(false);
  });

  it('should emit confirmed event when confirm() is called', () => {
    spyOn(component.confirmed, 'emit');
    component.confirm();
    expect(component.confirmed.emit).toHaveBeenCalledWith(true);
    expect(component.show).toBe(false);
  });

  it('should render message input', () => {
    component.message = 'Test message';
    component.show = true;
    fixture.detectChanges();
    const messageElement: HTMLElement = fixture.debugElement.query(By.css('.dialog-body')).nativeElement;
    expect(messageElement.textContent).toContain('Test message');
  });

  it('should render cancel button when showCancelButton is true', () => {
    component.showCancelButton = true;
    component.show = true;
    fixture.detectChanges();
    const cancelButton: DebugElement = fixture.debugElement.query(By.css('app-b-button[type="primary"]'));
    expect(cancelButton).toBeTruthy();
  });

  it('should not render cancel button when showCancelButton is false', () => {
    component.showCancelButton = false;
    component.show = true;
    fixture.detectChanges();
    const cancelButton: DebugElement = fixture.debugElement.query(By.css('app-b-button[type="primary"]'));
    expect(cancelButton).toBeNull();
  });

  it('should call close when cancel button is clicked', () => {
    spyOn(component, 'close');
    component.showCancelButton = true;
    component.show = true;
    fixture.detectChanges();
    const cancelButton: DebugElement = fixture.debugElement.query(By.css('app-b-button[type="primary"]'));
    cancelButton.triggerEventHandler('onClick', null);
    expect(component.close).toHaveBeenCalled();
  });

  it('should call confirm when confirm button is clicked', () => {
    spyOn(component, 'confirm');
    component.show = true;
    fixture.detectChanges();
    const confirmButton: DebugElement = fixture.debugElement.query(By.css('app-b-button[type="secondary"]'));
    confirmButton.triggerEventHandler('onClick', null);
    expect(component.confirm).toHaveBeenCalled();
  });
});
