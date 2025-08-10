import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { authGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../pages/home/home.module').then(m => m.HomePageModule),
        canActivate: [authGuard]
      },
      {
        path: 'inventory',
        loadChildren: () => import('../pages/inventory/inventory.module').then(m => m.InventoryPageModule),
        canActivate: [authGuard]
      },
      {
        path: 'reports',
        loadChildren: () => import('../pages/reports/reports.module').then(m => m.ReportsPageModule),
        canActivate: [authGuard]
      },
      {
        path: 'user',
        loadChildren: () => import('../pages/user/user.module').then(m => m.UserPageModule),
        canActivate: [authGuard]
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule { }
