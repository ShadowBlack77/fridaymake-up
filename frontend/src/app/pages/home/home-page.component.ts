import { NgOptimizedImage } from "@angular/common";
import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  imports: [
    RouterLink,
    NgOptimizedImage
  ],
  standalone: true
})
export class HomePageComponent {

}