import { Component, Input, OnInit } from '@angular/core';

export interface TimelineMilestone {
  step: number;
  title: string;
  subtitle: string;
  icon: string;
  timeEstimate: string;
  completed: boolean;
  current: boolean;
}

@Component({
  selector: 'app-luxury-timeline',
  templateUrl: './luxury-timeline.component.html',
  styleUrls: ['./luxury-timeline.component.scss'],
  standalone: false
})
export class LuxuryTimelineComponent implements OnInit {
  @Input() orderId: string | number = 'ORD-2026-8941';
  @Input() orderStatus: string = 'PROCESSING';
  @Input() customerName: string = 'Coleccionista Distinguido';
  @Input() batchCode: string = 'BATCH-GRASSE-2026-X99';

  public showCertificateModal: boolean = false;
  public milestones: TimelineMilestone[] = [];

  ngOnInit(): void {
    this.computeMilestones();
  }

  public computeMilestones(): void {
    const statusUpper = (this.orderStatus || 'PENDING').toUpperCase();

    // Map orderStatus to current milestone index
    let currentIdx = 0;
    if (statusUpper === 'PENDING') currentIdx = 0;
    else if (statusUpper === 'PROCESSING') currentIdx = 1;
    else if (statusUpper === 'SHIPPED') currentIdx = 3;
    else if (statusUpper === 'DELIVERED') currentIdx = 4;

    this.milestones = [
      {
        step: 1,
        title: 'Sello de Lacre & Selección de Cámara',
        subtitle: 'Frasco extraído de cámara climatizada y certificado con cera carmesí',
        icon: 'shield-checkmark',
        timeEstimate: 'Día 1 · 08:30 AM',
        completed: currentIdx > 0,
        current: currentIdx === 0
      },
      {
        step: 2,
        title: 'Atelier de Grabado & Seda Ébano',
        subtitle: 'Personalización con punta de diamante y envoltura en papel de seda con lazo dorado',
        icon: 'create',
        timeEstimate: 'Día 1 · 14:15 PM',
        completed: currentIdx > 1,
        current: currentIdx === 1
      },
      {
        step: 3,
        title: 'Custodia & Despacho Blindado',
        subtitle: 'Lote registrado con código criptográfico y entregado a courier boutique',
        icon: 'cube',
        timeEstimate: 'Día 2 · 09:00 AM',
        completed: currentIdx > 2,
        current: currentIdx === 2
      },
      {
        step: 4,
        title: 'Tránsito Satelital en Tiempo Real',
        subtitle: 'Ruta express asegurada con control de temperatura permanente',
        icon: 'airplane',
        timeEstimate: 'Día 2 · En Tránsito',
        completed: currentIdx > 3,
        current: currentIdx === 3
      },
      {
        step: 5,
        title: 'Entrega de Guante Blanco',
        subtitle: 'Entrega en mano con protocolo de recepción y firma de autenticidad',
        icon: 'ribbon',
        timeEstimate: 'Estimada: Próximas 24 horas',
        completed: currentIdx >= 4,
        current: currentIdx === 4
      }
    ];
  }

  public openCertificate(): void {
    this.showCertificateModal = true;
  }

  public closeCertificate(): void {
    this.showCertificateModal = false;
  }

  public printCertificate(): void {
    window.print();
  }
}
