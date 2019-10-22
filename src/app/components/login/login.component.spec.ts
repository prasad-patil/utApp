import { User } from './../../models/user.model';
import {
  TestBed,
  ComponentFixture,
  async,
  fakeAsync,
  tick
} from '@angular/core/testing';
import { AuthService } from './../../services/auth.service';
import { LoginComponent } from './login.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HoverFocusDirective } from 'src/app/directives/hover-focus.directive';

// #region without ATB
// describe('component: LoginComponent', () => {
//   let component = null;
//   let service = null;
//   let spy: any;

//   beforeEach(() => {
//     service = new AuthService();
//     component = new LoginComponent(service);
//   });

//   afterEach(() => {
//     service = null;
//     component = null;
//   });

//   it('needsLogin return true if user is authenticated', () => {
//     spy = spyOn(service, 'isAuthenticated').and.returnValue(false);
//     expect(component.needsLogin()).toBeTruthy();
//     expect(service.isAuthenticated).toHaveBeenCalled();
//   });

//   it('needsLogin returns fasle if user is already authenticated', () => {
//     spy = spyOn(service, 'isAuthenticated').and.returnValue(true);
//     expect(component.needsLogin()).toBeFalsy();
//     expect(service.isAuthenticated).toHaveBeenCalled();
//   });
// });
// #endregion

describe('component: LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service: AuthService;
  let el: DebugElement;
  let emailEl: DebugElement;
  let passwordEl: DebugElement;
  let submitEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent, HoverFocusDirective],
      imports: [ReactiveFormsModule]
      // providers: [AuthService]
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    // service = TestBed.get(AuthService);
    emailEl = fixture.debugElement.query(By.css('#email'));
    passwordEl = fixture.debugElement.query(By.css('#password'));
    submitEl = fixture.debugElement.query(By.css('#submit'));
    component.ngOnInit();
  });

  // #region part one without async code
  // it('needsLogin return true if user is not authenticated', () => {
  //   spyOn(service, 'isAuthenticated').and.returnValue(false);
  //   expect(component.needsLogin()).toBeTruthy();
  //   expect(service.isAuthenticated).toHaveBeenCalled();
  // });

  // it('needsLogin return false if user is authenticated', () => {
  //   spyOn(service, 'isAuthenticated').and.returnValue(true);
  //   expect(component.needsLogin()).toBeFalsy();
  //   expect(service.isAuthenticated).toHaveBeenCalled();
  // });

  // it('login button should be hidden when user is authenticated', () => {
  //   const spy = spyOn(service, 'isAuthenticated').and.returnValue(false);
  //   fixture.detectChanges();
  //   el = fixture.debugElement.query(By.css('a'));
  //   expect(el.nativeElement.textContent.trim()).toBe('Click here to login.');

  //   spy.and.returnValue(true);
  //   expect(el.nativeElement.textContent.trim()).toBe('Click here to login.');
  //   fixture.detectChanges();
  //   el = fixture.debugElement.query(By.css('a'));
  //   expect(el.nativeElement.textContent.trim()).toBe('Logout');
  // });
  // #endregion

  // #region using jasmine done function
  // it('login button should be hidden if user is logged in', done => {
  //   const spy = spyOn(service, 'isAuthenticated').and.returnValue(
  //     Promise.resolve(true)
  //   );
  //   component.ngOnInit();
  //   spy.calls.mostRecent().returnValue.then(() => {
  //     fixture.detectChanges();
  //     el = fixture.debugElement.query(By.css('a'));
  //     expect(el.nativeElement.textContent.trim()).toBe('Logout');
  //     done();
  //   });
  // });
  // #endregion

  // #region async and WhenStable.
  // it('login button should be hidden if user is logged in', async () => {
  //   spyOn(service, 'isAuthenticated').and.returnValue(Promise.resolve(true));
  //   fixture.detectChanges();
  //   fixture.whenStable().then(() => {
  //     fixture.detectChanges();
  //     el = fixture.debugElement.query(By.css('a'));
  //     expect(el.nativeElement.textContent.trim()).toBe('Logout');
  //   });
  //   component.ngOnInit();
  // });
  // #endregion

  xit('login button should be hidden if user is logged in', fakeAsync(() => {
    spyOn(service, 'isAuthenticated').and.returnValue(Promise.resolve(true));
    component.ngOnInit();
    tick();
    fixture.detectChanges();
    el = fixture.debugElement.query(By.css('a'));
    expect(el.nativeElement.textContent.trim()).toBe('Logout');
  }));

  xit('login button should be enabled if enabled falg is true', () => {
    component.enabled = true;
    expect(submitEl.nativeElement.disabled).toBe(false);
  });

  xit('should emit User instance when login is cliked', () => {
    emailEl.nativeElement.value = 'test@email.com';
    passwordEl.nativeElement.value = '123567';
    let user;
    component.loggedIn.subscribe((value: User) => {
      // expect(value instanceof User).toBeTruthy();
      // expect(value.email).toBe('test@email.com');
      // expect(value.password).toBe('123567');
      user = value;
    });
    submitEl.triggerEventHandler('click', null);
    expect(user instanceof User).toBeTruthy();
    expect(user.email).toBe('test@email.com');
    expect(user.password).toBe('123567');
  });

  // form related unit tests
  it('form should be invalid if empty', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('email field validity', () => {
    const emailControl = component.form.controls['email'];
    let errors: any = {};
    errors = emailControl.errors || {};

    expect(emailControl.valid).toBeFalsy();
    expect(errors.required).toBeTruthy();

    emailControl.setValue('test');
    expect(emailControl.errors.email).toBeTruthy();

    emailControl.setValue('test@value.com');
    expect(emailControl.errors).toBeNull();
  });

  it('password field validity', () => {
    const passwordCtrl = component.form.controls['password'];
    let errors: any = {};
    errors = passwordCtrl.errors || {};

    expect(passwordCtrl.valid).toBeFalsy();
    expect(errors.required).toBeTruthy();

    passwordCtrl.setValue('test');
    errors = passwordCtrl.errors || {};
    expect(errors.minlength).toBeTruthy();

    passwordCtrl.setValue('test@value.com');
    expect(passwordCtrl.errors).toBeNull();
  });

  it('submitting a form emmits the user', () => {
    let user: User;

    expect(component.form.valid).toBeFalsy();
    component.form.controls['email'].setValue('test@t.com');
    component.form.controls['password'].setValue('123456789');

    expect(component.form.valid).toBeTruthy();

    component.loggedIn.subscribe(u => (user = u));
    component.login();

    expect(user instanceof User).toBeTruthy();
    expect(user.email).toBe('test@t.com');
    expect(user.password).toBe('123456789');
  });
});
