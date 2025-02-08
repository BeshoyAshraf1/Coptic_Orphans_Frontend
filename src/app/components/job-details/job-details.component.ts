import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute,RouterModule  } from '@angular/router';
import { JobService } from '../../services/job.service';
import { Job } from '../../models/job';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule,RouterModule],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.scss'
})
export class JobDetailsComponent {
  private route = inject(ActivatedRoute);
  private jobService = inject(JobService);
  job!: Job;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.jobService.getJobDetails(+id)
        .subscribe(job => this.job = job);
    }
  }
}