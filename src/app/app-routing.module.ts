import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'employee', pathMatch: 'full' },
  {
    path: 'employee',
    loadComponent: () =>
      import(
        './feature-ems/cub-web-ems/pages/employee-list.page/employee-list.page.component'
      ).then((m) => m.EmployeeListPageComponent),
  },
  {
    path: 'employee/add',
    loadComponent: () =>
      import(
        './feature-ems/cub-web-ems/pages/employee-list.page/employee-list.page.component'
      ).then((m) => m.EmployeeListPageComponent),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
