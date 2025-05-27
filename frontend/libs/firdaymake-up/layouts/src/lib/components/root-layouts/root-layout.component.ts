import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { AuthHeaderComponent } from "@lib/auth";
import { HeaderComponent } from "@lib/shared/header";

@Component({
  selector: 'lib-root-layout',
  templateUrl: './root-layout.component.html',
  imports: [
    HeaderComponent,
    RouterOutlet,
    AuthHeaderComponent
  ],
  standalone: true
})
export class RootLayoutComponent {}