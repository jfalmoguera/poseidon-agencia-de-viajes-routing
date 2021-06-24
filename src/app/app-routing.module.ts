import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViajesListComponent } from './viajes-list/viajes-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'viajes' },
  { path: 'viajes', component: ViajesListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
