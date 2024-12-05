import { Routes } from '@angular/router';
import {CatsPage} from "./pages/cats/cats.page";
import {AddCatPage} from "./pages/add-cat/add-cat.page";

export const routes: Routes = [
  {
    path: '',
    component: CatsPage,
  },
  {
    path: 'add-cat',
    component: AddCatPage,
    pathMatch: 'full',
  }
];
