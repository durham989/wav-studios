import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StaffComponent } from './products/staff/staff.component';
import { SkullComponent } from './products/skull/skull.component';
// import { AboutComponent } from './about';
// import { NoContentComponent } from './no-content';

export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'products/staff-tee',  component: StaffComponent },
  { path: 'products/skull-tee',  component: SkullComponent },
  { path: '**',    component: HomeComponent },
  // { path: 'about', component: AboutComponent },
  // { path: 'detail', loadChildren: './+detail#DetailModule'},
  // { path: 'barrel', loadChildren: './+barrel#BarrelModule'},
  // { path: '**',    component: NoContentComponent },
];
