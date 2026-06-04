import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthStore } from '../../store/auth/auth.store';
import { LangBtn } from '../lang-btn/lang-btn';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, LangBtn],
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
