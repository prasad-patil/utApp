import { OldAuthService } from './old-auth-service';

describe('Service: auth', () => {
  let authService: OldAuthService;

  beforeEach(() => {
    authService = new OldAuthService();
  });
  afterEach(() => {
    authService = null;
    localStorage.removeItem('token');
  });

  it('should return true from isAuthenticated if token is set', () => {
    localStorage.setItem('token', '1234456');
    expect(authService.isAutheticated()).toBeTruthy();
  });

  it('should retun false from isAuthenticated if token is not set', () => {
    expect(authService.isAutheticated()).toBeFalsy();
  });
});
