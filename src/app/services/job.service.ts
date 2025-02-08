import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Job } from '../models/job';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private apiUrl = 'https://localhost:7104/api';

  constructor(private http: HttpClient) { }

  getJobs(page: number = 1, pageSize: number = 10): Observable<any> {
    const params = new HttpParams()
      .set('pageNumber', page.toString())
      .set('pageSize', pageSize.toString());
      
    return this.http.get<any>(`${this.apiUrl}/jobs`, { params }).pipe(
      catchError(this.handleError)
    );
  }

  getJobDetails(id: number): Observable<Job> {
    return this.http.get<Job>(`${this.apiUrl}/jobs/${id}`).pipe(
      catchError(this.handleError)
    );
  }
  applyForJob(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/Jobs/apply`, formData, {
      responseType: 'text' 
    }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => new Error(
      error.error?.message || 'Server error. Please try again later.'
    ));
  }
}