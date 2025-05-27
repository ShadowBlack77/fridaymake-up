import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { HeaderComponent } from "@lib/shared/header";

@Component({
  selector: 'lib-root-layout',
  templateUrl: './root-layout.component.html',
  imports: [
    HeaderComponent,
    RouterOutlet
  ],
  standalone: true
})
export class RootLayoutComponent {}