import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CartService } from '../../../services/cart.service';

export interface LayeringPerfumeOption {
  id: number;
  name: string;
  brand: string;
  role: 'base' | 'aura';
  notes: string;
  price: number;
  imageUrl: string;
}

@Component({
  selector: 'app-layering-studio',
  templateUrl: './layering-studio.component.html',
  styleUrls: ['./layering-studio.component.scss'],
  standalone: false
})
export class FragranceLayeringComponent implements OnInit {
  @Output() closeStudio = new EventEmitter<void>();

  public availablePerfumes: LayeringPerfumeOption[] = [
    {
      id: 101,
      name: 'Oud Royale Extrait',
      brand: 'Maison Haute',
      role: 'base',
      notes: 'Oud camboyano, cuero, azafrán',
      price: 285.00,
      imageUrl: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 102,
      name: 'Santal Impérial',
      brand: 'L’Atelier Botanique',
      role: 'base',
      notes: 'Sándalo de Mysore, iris, ámbar',
      price: 240.00,
      imageUrl: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 201,
      name: 'Neroli Lumineux',
      brand: 'Palais des Fragrances',
      role: 'aura',
      notes: 'Neroli amargo, bergamota, rosa blanca',
      price: 215.00,
      imageUrl: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 202,
      name: 'Fleur d’Oranger Solaire',
      brand: 'Maison Solaire',
      role: 'aura',
      notes: 'Flor de azahar, petitgrain, almizcle',
      price: 195.00,
      imageUrl: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=600&q=80'
    }
  ];

  public selectedBase: LayeringPerfumeOption = this.availablePerfumes[0];
  public selectedAura: LayeringPerfumeOption = this.availablePerfumes[2];
  public harmonyScore: number = 94;
  public isAdded: boolean = false;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.recalculateHarmony();
  }

  public selectBase(p: LayeringPerfumeOption): void {
    this.selectedBase = p;
    this.recalculateHarmony();
  }

  public selectAura(p: LayeringPerfumeOption): void {
    this.selectedAura = p;
    this.recalculateHarmony();
  }

  public recalculateHarmony(): void {
    // Cálculo armónico dinámico entre acordes base y tope
    if (this.selectedBase.id === 101 && this.selectedAura.id === 201) {
      this.harmonyScore = 96; // Oud + Neroli: Contraste barroco maestro
    } else if (this.selectedBase.id === 102 && this.selectedAura.id === 201) {
      this.harmonyScore = 93; // Sándalo + Neroli: Calidez meditativa
    } else {
      this.harmonyScore = 91;
    }
  }

  public getRawTotal(): number {
    return this.selectedBase.price + this.selectedAura.price;
  }

  public getDiscountedTotal(): number {
    return this.getRawTotal() * 0.85; // 15% descuento por bundle
  }

  public addDuoToCart(): void {
    const discountedBase = this.selectedBase.price * 0.85;
    const discountedAura = this.selectedAura.price * 0.85;

    this.cartService.addToCart({
      id: 9801,
      name: `Dúo Layering: ${this.selectedBase.name} + ${this.selectedAura.name}`,
      description: `Fórmula de Acordes: 2 atomizaciones base de ${this.selectedBase.name} + 3 atomizaciones tope de ${this.selectedAura.name}. (15% Descuento aplicado)`,
      price: Number(this.getDiscountedTotal().toFixed(2)),
      imageUrl: this.selectedBase.imageUrl,
      brandName: 'Atelier de Layering',
      sizeMl: 200,
      quantity: 1,
      isBundle: true
    });

    this.isAdded = true;
    setTimeout(() => {
      this.closeStudio.emit();
    }, 1500);
  }

  public onClose(): void {
    this.closeStudio.emit();
  }
}
