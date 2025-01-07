import { Routes } from '@angular/router';
import { PoTableComponent } from '../components/po-table/po-table.component';
import { PoDynamicFormComponent } from '../components/po-dynamic-form/po-dynamic-form.component';

export const routes: Routes = [
  {
    path: '',
    component: PoTableComponent
  },
  {
    path: 'cadastro',
    component: PoDynamicFormComponent
  }
];
