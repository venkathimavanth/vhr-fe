import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BillsComponent } from './components/bills/bills.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'bills', component: BillsComponent },
  // { path: '**', redirectTo: '', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
