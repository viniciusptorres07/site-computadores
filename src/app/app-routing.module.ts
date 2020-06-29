import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CreatePageComponent } from './pages/create-page/create-page.component';
import { ReadPageComponent } from './pages/read-page/read-page.component';
import { UpdatePageComponent } from './pages/update-page/update-page.component';
import { DeletePageComponent } from './pages/delete-page/delete-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';


const routes: Routes = [
  //Home
  {
    path: '',
    component: HomePageComponent
  },
  //Inserção
  {
    path: 'create',
    component: CreatePageComponent
  },
  //Leitura
  {
    path: 'read',
    component: ReadPageComponent
  },
  //Alteração
  {
    path: 'update',
    component: UpdatePageComponent
  },
  //Remoção
  {
    path: 'delete',
    component: DeletePageComponent
  },
  //Página não encontrada (Wildcard)
  {
    path: '**',
    component: ErrorPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
