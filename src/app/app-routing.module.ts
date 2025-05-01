import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BillsComponent } from './components/bills/bills.component';
import { AnalysisComponent } from './components/analysis/analysis.component';
import { TransactionsComponent } from './components/transactions/transactions.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'analysis', component: AnalysisComponent },
  { path: 'bills', component: BillsComponent },
  { path: 'transactions', component: TransactionsComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
