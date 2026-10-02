import { Injectable } from '@angular/core';

export interface QuizQuestion {
  id: string;
  title: string;
  subtitle: string;
  options: QuizOption[];
}

export interface QuizOption {
  label: string;
  description: string;
  icon: string;
  family: string;
}

export interface SommelierRecommendation {
  matchPercentage: number;
  fragranceName: string;
  brand: string;
  family: string;
  character: string;
  description: string;
  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
  price: number;
  samplePrice: number;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class SommelierService {
  public getQuestions(): QuizQuestion[] {
    return [
      {
        id: 'occasion',
        title: '1. ¿En qué atmósfera desplegarás tu estela?',
        subtitle: 'El momento dicta la energía de la creación',
        options: [
          { label: 'Gala Nocturna & Alta Sociedad', description: 'Intriga, misterio y magnetismo bajo luces tenues', icon: 'moon', family: 'oriental' },
          { label: 'Encuentro Ejecutivo & Negocios', description: 'Autoridad serena, sofisticación pulcra y presencia', icon: 'briefcase', family: 'woody' },
          { label: 'Romance Íntimo & Sensualidad', description: 'Cercanía cálida, susurros y terciopelo en piel', icon: 'heart', family: 'floral' },
          { label: 'Escapada Solar & Verano', description: 'Brisa marina, cítricos silvestres y vitalidad luminosa', icon: 'sunny', family: 'citrus' }
        ]
      },
      {
        id: 'sillage',
        title: '2. ¿Qué intensidad y proyección buscas?',
        subtitle: 'La huella que deseas dejar en el espacio',
        options: [
          { label: 'Skin Scent (Íntimo & Sutil)', description: 'Solo perceptible en el abrazo más cercano', icon: 'sparkles', family: 'citrus' },
          { label: 'Estela Clásica & Equilibrada', description: 'Acompaña tu paso con distinción sin abrumar', icon: 'rose', family: 'floral' },
          { label: 'Monumento Olfativo (Opulento)', description: 'Firma inconfundible que anuncia tu llegada', icon: 'flame', family: 'oriental' }
        ]
      },
      {
        id: 'family',
        title: '3. ¿Qué acordes botánicos te conmueven?',
        subtitle: 'Tu preferencia visceral de familias aromáticas',
        options: [
          { label: 'Maderas Nobles, Cuero & Oud', description: 'Sándalo de Mysore, cedro del Atlas y oud real', icon: 'leaf', family: 'woody' },
          { label: 'Ámbar, Resinas & Vainilla Bourbon', description: 'Dulzura oscura, incienso místico y calidez dorada', icon: 'sparkles', family: 'oriental' },
          { label: 'Flores Nobles & Iris Florentino', description: 'Rosa centifolia, jazmín Sambac y pétalos carnales', icon: 'flower', family: 'floral' },
          { label: 'Cítricos Nobles & Sal Marina', description: 'Bergamota de Calabria, flor de azahar y notas ozónicas', icon: 'water', family: 'citrus' }
        ]
      },
      {
        id: 'aura',
        title: '4. ¿Cuál es el arquetipo de tu aura?',
        subtitle: 'La esencia profunda de tu personalidad',
        options: [
          { label: 'Misterioso & Enigmático', description: 'Inaccesible, magnético y reflexivo', icon: 'eye', family: 'oriental' },
          { label: 'Clásico Imperial & Atemporal', description: 'Elegancia que jamás pasa de moda', icon: 'ribbon', family: 'woody' },
          { label: 'Audaz & Vanguardista', description: 'Rompedor de moldes y experimental', icon: 'flash', family: 'floral' }
        ]
      }
    ];
  }

  public calculateRecommendation(answers: Record<string, QuizOption>): SommelierRecommendation {
    // Motor de recomendación de Alta Perfumería
    const selectedFamilies = Object.values(answers).map(a => a.family);
    const isOriental = selectedFamilies.filter(f => f === 'oriental').length >= 2;
    const isWoody = selectedFamilies.filter(f => f === 'woody').length >= 2;
    const isFloral = selectedFamilies.filter(f => f === 'floral').length >= 2;

    if (isOriental) {
      return {
        matchPercentage: 98,
        fragranceName: 'Oud Royale Extrait de Parfum',
        brand: 'Maison Haute Parfumerie',
        family: 'Oriental Especiado Ambarino',
        character: 'Magnético · Nocturno · Opulento',
        description: 'Una composición magistral de oud camboyano silvestre macerado durante 12 años con resina de benjuí, rosa de Damasco y toques ahumados de cuero toscano.',
        notes: {
          top: ['Azafrán persa', 'Pimienta de Sichuan', 'Incienso blanco'],
          top_time: '15 min',
          heart: ['Rosa de Damasco', 'Oud camboyano 12 años', 'Papiro egipcio'],
          base: ['Ámbar gris natural', 'Cuero toscano', 'Vainilla Bourbon']
        } as any,
        price: 285.00,
        samplePrice: 22.00,
        imageUrl: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80'
      };
    } else if (isWoody) {
      return {
        matchPercentage: 96,
        fragranceName: 'Santal Impérial de Mysore',
        brand: 'L’Atelier Botanique',
        family: 'Amaderado Aromático Aristocrático',
        character: 'Sereno · Majestuoso · Atemporal',
        description: 'La cumbre del sándalo sagrado de Mysore entrelazado con cedro de Virginia, cardamomo guatemalteco y violeta silvestre para una sobriedad distinguida.',
        notes: {
          top: ['Cardamomo de Guatemala', 'Violeta silvestre', 'Hojas de higuera'],
          heart: ['Iris de Florencia', 'Papiro', 'Cedro del Atlas'],
          base: ['Sándalo puro de Mysore', 'Haba tonka', 'Almizcle blanco']
        },
        price: 240.00,
        samplePrice: 20.00,
        imageUrl: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=600&q=80'
      };
    } else {
      return {
        matchPercentage: 97,
        fragranceName: 'Neroli Lumineux & Rose Blanche',
        brand: 'Palais des Fragrances',
        family: 'Floral Cítrico Resplandeciente',
        character: 'Radiante · Poético · Sofisticado',
        description: 'La brisa cristalina del Mediterráneo capturada en flor de azahar fresca, neroli amargo de Túnez, pétalos de rosa blanca y un lecho de ámbar solar.',
        notes: {
          top: ['Neroli de Túnez', 'Bergamota de Calabria', 'Mandarina'],
          heart: ['Rosa blanca de Grasse', 'Jazmín Sambac', 'Flor de azahar'],
          base: ['Ámbar solar', 'Almizcle cristalino', 'Vetiver de Haití']
        },
        price: 215.00,
        samplePrice: 18.00,
        imageUrl: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=600&q=80'
      };
    }
  }
}
