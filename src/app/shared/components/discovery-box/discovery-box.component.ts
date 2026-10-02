import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CartService } from '../../../services/cart.service';

export interface DiscoveryVial {
  id: number;
  name: string;
  brand: string;
  family: string;
  notes: string;
}

@Component({
  selector: 'app-discovery-box',
  templateUrl: './discovery-box.component.html',
  styleUrls: ['./discovery-box.component.scss'],
  standalone: false
})
export class DiscoveryBoxComponent implements OnInit {
  @Output() closeBox = new EventEmitter<void>();

  public availableVials: DiscoveryVial[] = [
    { id: 1, name: 'Oud Royale Extrait', brand: 'Maison Haute', family: 'Oriental', notes: 'Oud, Azafrán, Cuero' },
    { id: 2, name: 'Santal Impérial', brand: 'L’Atelier Botanique', family: 'Amaderado', notes: 'Sándalo, Cardamomo, Iris' },
    { id: 3, name: 'Neroli Lumineux', brand: 'Palais des Fragrances', family: 'Cítrico', notes: 'Neroli, Bergamota, Rosa Blanca' },
    { id: 4, name: 'Ambre Mystique', brand: 'Le Niche Paris', family: 'Ámbar', notes: 'Ámbar Gris, Vainilla, Incienso' },
    { id: 5, name: 'Cuir Sublime', brand: 'Atelier Cuir', family: 'Cuero', notes: 'Cuero de Rusia, Abedul, Vetiver' },
    { id: 6, name: 'Rose Nocturne', brand: 'Parfums de Grasse', family: 'Floral', notes: 'Rosa Centifolia, Pachulí, Miel' },
    { id: 7, name: 'Vetiver Céleste', brand: 'Botanica Nobilis', family: 'Aromático', notes: 'Vetiver de Haití, Pomelo, Salvia' },
    { id: 8, name: 'Fleur d’Oranger', brand: 'Maison Solaire', family: 'Floral Blanco', notes: 'Azahar, Petitgrain, Almizcle' }
  ];

  public selectedVials: DiscoveryVial[] = [];
  public readonly maxVials: number = 5;
  public boxPrice: number = 35.00;
  public rebateCoupon: number = 30.00;
  public isAdded: boolean = false;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    // Inicializar con los 3 primeros pre-cargados
    this.selectedVials = this.availableVials.slice(0, 3);
  }

  public toggleVial(vial: DiscoveryVial): void {
    const idx = this.selectedVials.findIndex(v => v.id === vial.id);
    if (idx !== -1) {
      this.selectedVials.splice(idx, 1);
    } else {
      if (this.selectedVials.length < this.maxVials) {
        this.selectedVials.push(vial);
      }
    }
  }

  public isVialSelected(vial: DiscoveryVial): boolean {
    return this.selectedVials.some(v => v.id === vial.id);
  }

  public removeVial(index: number): void {
    if (index >= 0 && index < this.selectedVials.length) {
      this.selectedVials.splice(index, 1);
    }
  }

  public addBoxToCart(): void {
    if (this.selectedVials.length !== this.maxVials) return;

    const vialNames = this.selectedVials.map(v => v.name).join(', ');

    this.cartService.addToCart({
      id: 9993,
      name: 'Cofre Discovery Box (5 Viales x 2ml)',
      description: `Selección personalizada: ${vialNames}. Incluye cupón de reintegro de $${this.rebateCoupon} USD.`,
      price: this.boxPrice,
      imageUrl: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=600&q=80',
      brandName: 'Haute Parfumerie Atelier',
      sizeMl: 10,
      quantity: 1,
      discoveryBoxItems: this.selectedVials.map(v => v.name)
    });

    this.isAdded = true;
    setTimeout(() => {
      this.closeBox.emit();
    }, 1500);
  }

  public onClose(): void {
    this.closeBox.emit();
  }
}
