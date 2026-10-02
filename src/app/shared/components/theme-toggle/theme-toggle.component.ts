import { Component, OnInit } from '@angular/core';
import { ThemeService, LuxuryTheme } from '../../../services/theme.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.scss'],
  standalone: false
})
export class ThemeToggleComponent implements OnInit {
  public theme$!: Observable<LuxuryTheme>;

  constructor(public themeService: ThemeService) {}

  ngOnInit(): void {
    this.theme$ = this.themeService.theme$;
  }

  public onToggle(): void {
    this.themeService.toggleTheme();
  }
}
