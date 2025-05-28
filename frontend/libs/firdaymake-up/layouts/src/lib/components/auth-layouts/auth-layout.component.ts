import { NgOptimizedImage } from "@angular/common";
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'lib-auth-layout',
  templateUrl: './auth-layout.component.html',
  imports: [
    RouterOutlet,
    NgOptimizedImage
  ]
})
export class AuthLayoutComponent {}