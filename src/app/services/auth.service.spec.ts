import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  const API_URL = `${environment.apiUrl}/api`;

  beforeEach(() => {
    localStorage.clear();

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should authenticate user and store token in localStorage', () => {
    const mockResponse = {
      token: 'mock-jwt-token-12345',
      user: {
        id: 1,
        email: 'test@example.com',
        fullName: 'Test User',
        role: 'CLIENTE'
      }
    };

    service.login('test@example.com', 'password123').subscribe(response => {
      expect(response.token).toBe('mock-jwt-token-12345');
      expect(localStorage.getItem('authToken')).toBe('mock-jwt-token-12345');
      expect(service.isAuthenticated()).toBeTrue();
      expect(service.getCurrentUser()?.email).toBe('test@example.com');
    });

    const req = httpMock.expectOne(`${API_URL}/auth/login`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should clear token and user state on logout', () => {
    localStorage.setItem('authToken', 'sample-token');
    localStorage.setItem('currentUser', JSON.stringify({ id: 1, role: 'CLIENTE' }));

    service.logout();

    expect(localStorage.getItem('authToken')).toBeNull();
    expect(localStorage.getItem('currentUser')).toBeNull();
    expect(service.isAuthenticated()).toBeFalse();
    expect(service.getCurrentUser()).toBeNull();
  });

  it('should correctly identify user roles', () => {
    service.saveUserData({ id: 2, role: 'VENDEDOR' });
    expect(service.isSeller()).toBeTrue();
    expect(service.isAdmin()).toBeFalse();

    service.saveUserData({ id: 3, role: 'ADMIN' });
    expect(service.isAdmin()).toBeTrue();
    expect(service.isSeller()).toBeFalse();
  });
});
