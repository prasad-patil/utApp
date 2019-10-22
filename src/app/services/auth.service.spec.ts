import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

// describe('AuthService', () => {
//   beforeEach(() => TestBed.configureTestingModule({}));

//   it('should be created', () => {
//     const service: AuthService = TestBed.get(AuthService);
//     expect(service).toBeTruthy();
//   });
// });

describe('Service: auth', () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService();
  });
  afterEach(() => {
    authService = null;
    localStorage.removeItem('token');
  });

  xit('should return true from isAuthenticated if token is set', () => {
    localStorage.setItem('token', '1234456');
    expect(authService.isAuthenticated()).toEqual(Promise.resolve(true));
  });

  xit('should retun false from isAuthenticated if token is not set', () => {
    expect(authService.isAuthenticated()).toEqual(Promise.resolve(false));
  });
});
