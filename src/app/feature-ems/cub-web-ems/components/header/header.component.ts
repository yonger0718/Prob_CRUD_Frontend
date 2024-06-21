import { Component, OnInit, inject } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [MenubarModule],
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] = [];
  private router = inject(Router);

  constructor() {}

  ngOnInit(): void {
    this.items = [
      {
        label: '員工',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: '列表',
            icon: 'pi pi-fw pi-list',
            routerLink: '/employee',
          },
          {
            label: '新增',
            icon: 'pi pi-fw pi-plus',
            command: () => this.addNewEmployee(),
          },
          // {
            // label: '查詢',
            // icon: 'pi pi-fw pi-users',
            // items: [
              // {
                // label: '原編查詢',
                // icon: 'pi pi-fw pi-search',
                // routerLink: 'employee/:id',
              // },
              // {
                // label: '姓名查詢',
                // icon: 'pi pi-fw pi-search',
                // routerLink: 'employee/:name',
              // },
            // ]
          // },
        ],
      },
    ];
  }
  addNewEmployee(): void {
    this.router.navigate(['employee'], { queryParams: { add: true } });
  }

}
