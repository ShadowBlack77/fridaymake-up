import { CommonModule } from "@angular/common";
import { Component, signal, WritableSignal } from "@angular/core";
import { RouterLink } from "@angular/router";

interface navigationItem {
  readonly id: number;
  readonly link: string;
  readonly label: string;
  readonly icon: string;
}

@Component({
  selector: 'lib-header',
  templateUrl: './header.component.html',
  imports: [
    RouterLink,
    CommonModule
  ],
  standalone: true
})
export class HeaderComponent {

  protected readonly showMenu: WritableSignal<boolean> = signal(false);
  protected readonly navigation: WritableSignal<navigationItem[]> = signal([
    {
      id: 1,
      link: '',
      label: 'Home',
      icon: 'bi-house'
    },
    {
      id: 2,
      link: 'price-list',
      label: 'Cennik',
      icon: 'bi-card-checklist'
    },
    {
      id: 3,
      link: 'portfolio',
      label: 'Portfolio',
      icon: 'bi-grid'
    },
    {
      id: 4,
      link: 'certificates',
      label: 'Certyfikaty',
      icon: 'bi-file-check'
    },
    {
      id: 5,
      link: 'informations',
      label: 'Informacje',
      icon: 'bi-info-circle'
    },
    {
      id: 6,
      link: 'statute',
      label: 'Regulamin',
      icon: 'bi-lock'
    },
    {
      id: 7,
      link: 'faqs',
      label: 'FAQs',
      icon: 'bi-question-circle'
    }
  ])

  menuBtn(): void {
    this.showMenu.update((prev) => !prev);
  }
}