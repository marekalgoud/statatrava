import { DOCUMENT } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  document = inject(DOCUMENT)

  toggle() {
    const element = this.document.querySelector('html');
    if (element) {
      element.classList.toggle('dark');
    }
  }

}

