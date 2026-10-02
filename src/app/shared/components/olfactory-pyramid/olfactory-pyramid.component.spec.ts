import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OlfactoryPyramidComponent } from './olfactory-pyramid.component';
import { IonicModule } from '@ionic/angular';

describe('OlfactoryPyramidComponent', () => {
  let component: OlfactoryPyramidComponent;
  let fixture: ComponentFixture<OlfactoryPyramidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OlfactoryPyramidComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OlfactoryPyramidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debe iniciar con el nivel corazón seleccionado por defecto', () => {
    expect(component.activeTier).toBe('heart');
    expect(component.getActiveTitle()).toContain('Notas de Corazón');
  });

  it('debe alternar a nivel salida al llamar selectTier(top)', () => {
    component.selectTier('top');
    expect(component.activeTier).toBe('top');
    expect(component.getActiveTitle()).toContain('Notas de Salida');
    expect(component.getActiveDuration()).toContain('0 a 15 minutos');
  });

  it('debe alternar a nivel fondo al llamar selectTier(base)', () => {
    component.selectTier('base');
    expect(component.activeTier).toBe('base');
    expect(component.getActiveTitle()).toContain('Notas de Fondo');
    expect(component.getActiveDuration()).toContain('6 a 12+ horas');
  });
});
