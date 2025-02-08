import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../../services/job.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-apply-job',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './apply-job.component.html',
  styleUrl: './apply-job.component.scss'
})
export class ApplyJobComponent {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private jobService = inject(JobService);

  applyForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    resume: [null as File | null, Validators.required]
  });

  jobId = +this.route.snapshot.paramMap.get('id')!;
  submitted = false;
  error = '';

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.applyForm.patchValue({ resume: file });
      this.applyForm.get('resume')?.updateValueAndValidity(); 
    }
  }
  onSubmit() {

    this.submitted = true;
    this.error = '';

    if (this.applyForm.invalid) return;

    const resumeFile = this.applyForm.get('resume')?.value;
    
    const formData = new FormData();
    formData.append('JobId', this.jobId.toString());
    formData.append('ApplicantName', this.applyForm.value.name!);
    formData.append('Email', this.applyForm.value.email!);

    if (resumeFile instanceof File) {
      formData.append('ResumeFile', resumeFile, resumeFile.name);
    }

    this.jobService.applyForJob(formData).subscribe({
      next: () => {
        Swal.fire({
          title: 'Success!',
          text: 'Your application has been submitted successfully!',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#3f51b5',
          customClass: {
            container: 'material-ui-swal'
          }
        }).then(() => {
          this.router.navigate(['/jobs']);
        });
      },

      error: (error) => {
        if (error.status === 400 && error.error.errors) {
          const validationErrors = error.error.errors;
          this.error = 'Validation errors:';

          Object.keys(validationErrors).forEach(key => {
            this.error += `\n- ${validationErrors[key].join(', ')}`;
          });

        } else {
          this.error = error.error?.message || 'Application submission failed';
        }
      }
    });
  }

}