import { Component, Input, OnInit } from '@angular/core';

export type OlfactoryTier = 'top' | 'heart' | 'base';

@Component({
  selector: 'app-olfactory-pyramid',
  templateUrl: './olfactory-pyramid.component.html',
  styleUrls: ['./olfactory-pyramid.component.scss'],
  standalone: false
})
export class OlfactoryPyramidComponent implements OnInit {
  @Input() topNotes: string[] = ['Bergamota de Calabria', 'Pimienta Rosa', 'Mandarina Siciliana'];
  @Input() heartNotes: string[] = ['Rosa de Mayo', 'Jazmín Sambac', 'Iris Florentino'];
  @Input() baseNotes: string[] = ['Oud Real', 'Sándalo de Mysore', 'Ámbar Gris', 'Vainilla Bourbon'];
  @Input() perfumeName: string = 'Fragancia de Alta Gama';

  public activeTier: OlfactoryTier = 'heart';

  ngOnInit(): void {
    // Inicializar con notas de corazón destacadas
  }

  public selectTier(tier: OlfactoryTier): void {
    this.activeTier = tier;
  }

  public getActiveTitle(): string {
    switch (this.activeTier) {
      case 'top': return 'Notas de Salida (Top Notes)';
      case 'heart': return 'Notas de Corazón (Heart Notes)';
      case 'base': return 'Notas de Fondo (Base Notes)';
      default: return 'Pirámide Olfativa';
    }
  }

  public getActiveDuration(): string {
    switch (this.activeTier) {
      case 'top': return '0 a 15 minutos · Primera impresión chispeante y volátil';
      case 'heart': return '2 a 4 horas · El alma y personalidad de la creación';
      case 'base': return '6 a 12+ horas · Estela profunda y fijación en piel';
      default: return '';
    }
  }

  public getActiveNotes(): string[] {
    switch (this.activeTier) {
      case 'top': return this.topNotes;
      case 'heart': return this.heartNotes;
      case 'base': return this.baseNotes;
      default: return [];
    }
  }
}
