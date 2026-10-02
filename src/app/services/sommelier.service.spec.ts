import { TestBed } from '@angular/core/testing';
import { SommelierService } from './sommelier.service';

describe('SommelierService', () => {
  let service: SommelierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SommelierService);
  });

  it('debe crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('debe proveer las 4 preguntas esenciales de cata', () => {
    const questions = service.getQuestions();
    expect(questions.length).toBe(4);
    expect(questions.map(q => q.id)).toEqual(['occasion', 'sillage', 'family', 'aura']);
  });

  it('debe calcular recomendación oriental cuando predominan acordes orientales', () => {
    const answers = {
      occasion: { label: 'Gala Nocturna', description: '', icon: '', family: 'oriental' },
      sillage: { label: 'Opulento', description: '', icon: '', family: 'oriental' },
      family: { label: 'Ámbar y Vainilla', description: '', icon: '', family: 'oriental' },
      aura: { label: 'Misterioso', description: '', icon: '', family: 'oriental' }
    };

    const result = service.calculateRecommendation(answers);
    expect(result).toBeTruthy();
    expect(result.fragranceName).toContain('Oud Royale');
    expect(result.matchPercentage).toBeGreaterThanOrEqual(95);
  });

  it('debe calcular recomendación amaderada cuando predominan maderas nobles', () => {
    const answers = {
      occasion: { label: 'Ejecutivo', description: '', icon: '', family: 'woody' },
      sillage: { label: 'Equilibrado', description: '', icon: '', family: 'woody' },
      family: { label: 'Maderas Nobles', description: '', icon: '', family: 'woody' },
      aura: { label: 'Clásico Imperial', description: '', icon: '', family: 'woody' }
    };

    const result = service.calculateRecommendation(answers);
    expect(result).toBeTruthy();
    expect(result.fragranceName).toContain('Santal Impérial');
    expect(result.matchPercentage).toBeGreaterThanOrEqual(90);
  });
});
