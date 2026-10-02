import { TestBed } from '@angular/core/testing';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { RoleGuard } from './role.guard';
import { AuthService } from '../services/auth.service';

describe('RoleGuard', () => {
  let guard: RoleGuard;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['getCurrentUser']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        RoleGuard,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    guard = TestBed.inject(RoleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow access when user has expected role', () => {
    authServiceSpy.getCurrentUser.and.returnValue({ id: 1, email: 'vendedor@perfumes.com', role: 'VENDEDOR' });
    const routeSnapshot = {
      data: { roles: ['VENDEDOR', 'ADMIN'] }
    } as unknown as ActivatedRouteSnapshot;

    const result = guard.canActivate(routeSnapshot);

    expect(result).toBeTrue();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should redirect to /home when CLIENTE tries to access VENDEDOR route', () => {
    authServiceSpy.getCurrentUser.and.returnValue({ id: 2, email: 'cliente@perfumes.com', role: 'CLIENTE' });
    const routeSnapshot = {
      data: { roles: ['VENDEDOR'] }
    } as unknown as ActivatedRouteSnapshot;

    const result = guard.canActivate(routeSnapshot);

    expect(result).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should redirect to /login when user is not logged in', () => {
    authServiceSpy.getCurrentUser.and.returnValue(null);
    const routeSnapshot = {
      data: { roles: ['ADMIN'] }
    } as unknown as ActivatedRouteSnapshot;

    const result = guard.canActivate(routeSnapshot);

    expect(result).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });
});
