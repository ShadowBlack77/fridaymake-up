import { NgOptimizedImage } from "@angular/common";
import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { FooterComponent } from "@lib/shared/footer";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  imports: [
    RouterLink,
    NgOptimizedImage,
    FooterComponent
  ],
  standalone: true
})
export class HomePageComponent {

}