import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from '../interface/Employee';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EmployeeServices {
  private apiUrl = environment.apiUrl + '/api/employee';

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}`);
  }

  getEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }

  addEmployee(formData: FormData): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiUrl}`, formData);
  }

  updateEmployee(id: number, formData: FormData): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/${id}`, formData);
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  uploadImage(id: number, file: File): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/upload/${id}`, file);
  }
}
