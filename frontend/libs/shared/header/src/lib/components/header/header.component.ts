import { CommonModule } from "@angular/common";
import { Component, signal, WritableSignal } from "@angular/core";
import { RouterLink } from "@angular/router";

interface navigationItem {
  readonly id: number;
  readonly link: string;
  readonly label: string;
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
      label: 'Home'
    },
    {
      id: 2,
      link: 'price-list',
      label: 'Cennik'
    }
  ])

  menuBtn(): void {
    this.showMenu.update((prev) => !prev);
  }
}