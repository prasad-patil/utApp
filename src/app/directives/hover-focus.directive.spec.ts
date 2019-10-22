import { By } from '@angular/platform-browser';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HoverFocusDirective } from './hover-focus.directive';
import { LoginComponent } from '../components/login/login.component';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

describe('HoverFocusDirective', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let inputEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent, HoverFocusDirective],
      imports: [ReactiveFormsModule]
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('input'));
  });

  it('on focus color of input shoudl change', () => {
    inputEl.triggerEventHandler('mouseover', null);
    fixture.detectChanges();
    expect(inputEl.nativeElement.style.backgroundColor).toBe('blue');

    inputEl.triggerEventHandler('mouseout', null);
    fixture.detectChanges();
    expect(inputEl.nativeElement.style.backgroundColor).toBe('inherit');
  });
});
