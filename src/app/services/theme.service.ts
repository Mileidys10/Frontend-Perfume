import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type LuxuryTheme = 'midnight' | 'ivory';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentTheme$ = new BehaviorSubject<LuxuryTheme>('midnight');

  constructor() {
    this.initTheme();
  }

  private initTheme(): void {
    const saved = localStorage.getItem('luxury_theme') as LuxuryTheme;
    if (saved === 'ivory' || saved === 'midnight') {
      this.setTheme(saved);
    } else {
      // Por defecto Midnight Obsidian
      this.setTheme('midnight');
    }
  }

  public get theme$(): Observable<LuxuryTheme> {
    return this.currentTheme$.asObservable();
  }

  public get activeTheme(): LuxuryTheme {
    return this.currentTheme$.value;
  }

  public toggleTheme(): void {
    const nextTheme: LuxuryTheme = this.currentTheme$.value === 'midnight' ? 'ivory' : 'midnight';
    this.setTheme(nextTheme);
  }

  public setTheme(theme: LuxuryTheme): void {
    this.currentTheme$.next(theme);
    localStorage.setItem('luxury_theme', theme);

    if (theme === 'ivory') {
      document.body.classList.add('theme-ivory');
      document.body.classList.remove('theme-midnight');
    } else {
      document.body.classList.add('theme-midnight');
      document.body.classList.remove('theme-ivory');
    }
  }
}
