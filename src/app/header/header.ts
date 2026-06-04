import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthStore } from '../../store/auth/auth.store';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private authStore = inject(AuthStore);
  user = this.authStore.user;

  logout(): void {
    this.authStore.logout();
  }
}
