import { Component } from '@angular/core';

@Component({
  selector: 'app-lang-btn',
  imports: [],
  templateUrl: './lang-btn.html',
  styleUrl: './lang-btn.css',
})
export class LangBtn {
  readonly currentLocale = this.detectLocale();

  localList = [
    { code: 'en-US', label: 'English', path: '/' },
    { code: 'ar', label: 'العربية', path: '/ar/' },
  ];

  onLocaleChange(event: Event): void {
    const code = (event.target as HTMLSelectElement).value;
    const target = this.localList.find((l) => l.code === code);
    if (!target || target.code === this.currentLocale) {
      return;
    }
    window.location.href = target.path;
  }

  private detectLocale(): string {
    const path = window.location.pathname;
    if (path === '/ar' || path.startsWith('/ar/')) {
      return 'ar';
    }
    return 'en-US';
  }
}
