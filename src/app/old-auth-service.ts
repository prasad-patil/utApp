export class OldAuthService {
  isAutheticated() {
    return !!localStorage.getItem('token');
  }
}
