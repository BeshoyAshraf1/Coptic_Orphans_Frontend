import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatButtonModule
  ],
  template: `
    <mat-toolbar color="primary">
      <span>Job Portal</span>
      <nav>
        <a mat-button routerLink="/jobs">Jobs</a>
      </nav>
    </mat-toolbar>

    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: `
    .container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }
    mat-toolbar {
      justify-content: space-between;
    }
  `
})
export class AppComponent {}