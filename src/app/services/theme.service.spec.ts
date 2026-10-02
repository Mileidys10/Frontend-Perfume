import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  afterEach(() => {
    localStorage.clear();
    document.body.classList.remove('theme-ivory', 'theme-midnight');
  });

  it('debe crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('debe iniciar por defecto en tema midnight', (done) => {
    service.theme$.subscribe(theme => {
      expect(theme).toBe('midnight');
      done();
    });
  });

  it('debe alternar de midnight a ivory y actualizar el DOM', () => {
    service.setTheme('ivory');
    expect(service.activeTheme).toBe('ivory');
    expect(localStorage.getItem('luxury_theme')).toBe('ivory');
    expect(document.body.classList.contains('theme-ivory')).toBeTrue();
    expect(document.body.classList.contains('theme-midnight')).toBeFalse();

    service.toggleTheme();
    expect(service.activeTheme).toBe('midnight');
    expect(document.body.classList.contains('theme-midnight')).toBeTrue();
  });
});
