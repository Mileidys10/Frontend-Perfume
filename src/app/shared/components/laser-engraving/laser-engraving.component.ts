import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export type LuxuryFont = 'serif' | 'script' | 'sans';

export interface EngravingConfig {
  text: string;
  font: LuxuryFont;
  active: boolean;
}

@Component({
  selector: 'app-laser-engraving',
  templateUrl: './laser-engraving.component.html',
  styleUrls: ['./laser-engraving.component.scss'],
  standalone: false
})
export class LaserEngravingComponent implements OnInit {
  @Input() bottleImageUrl: string = '';
  @Input() perfumeName: string = '';
  @Output() engravingChanged = new EventEmitter<EngravingConfig>();

  public isEnabled: boolean = false;
  public engravingText: string = '';
  public selectedFont: LuxuryFont = 'serif';
  public readonly maxChars: number = 15;
  public engravingPrice: number = 15.00;

  ngOnInit(): void {}

  public toggleEngraving(): void {
    this.isEnabled = !this.isEnabled;
    this.notifyChange();
  }

  public onTextInput(val: string): void {
    // Sanitizar texto: alfanumérico, espacios y puntos
    this.engravingText = val.slice(0, this.maxChars);
    this.notifyChange();
  }

  public selectFont(font: LuxuryFont): void {
    this.selectedFont = font;
    this.notifyChange();
  }

  public getFontFamily(): string {
    switch (this.selectedFont) {
      case 'serif': return "'Cinzel', 'Playfair Display', serif";
      case 'script': return "'Great Vibes', 'Playfair Display', cursive";
      case 'sans': return "'Montserrat', -apple-system, sans-serif";
      default: return 'serif';
    }
  }

  private notifyChange(): void {
    this.engravingChanged.emit({
      text: this.engravingText,
      font: this.selectedFont,
      active: this.isEnabled && this.engravingText.trim().length > 0
    });
  }
}
