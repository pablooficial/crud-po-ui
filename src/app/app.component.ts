import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import {
  PoDividerModule,
  PoMenuItem,
  PoMenuModule,
  PoPageModule,
  PoToolbarModule,
} from '@po-ui/ng-components';
import { ExpenseService } from './services/expense.service';
import { Despesa } from './models/despesa-model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    PoToolbarModule,
    PoMenuModule,
    PoPageModule,
    PoDividerModule
  ],
  templateUrl: './app.component.html',
  providers: [ExpenseService],
})
export class AppComponent {
  private expendService: ExpenseService = inject(ExpenseService);

  public menuItemSelected: string = '';
  public dados: Despesa[] = [];
  loading: boolean = true;

  async ngOnInit() {
    await this.loadData();
    this.changeMenuSelected(this.menus[0]);
  }

  private changeMenuSelected(menu: PoMenuItem) {
    this.menuItemSelected = menu.label;
  }

  loadData() {
    return new Promise((resolve, reject) => {
      this.expendService.getExpends().subscribe({
        next: data => {
          this.loading = false;
          this.dados = data.items;
          this.menus[0].badge = { value: data.total, color: 'color-09' };
          resolve(data);
        },
        error: err => {
          this.loading = false;
          reject(err);
        }
      });
    })
  }

  readonly menus: Array<PoMenuItem> = [
    { label: 'Listagem', icon: 'po-icon-users', link: '/', action: this.changeMenuSelected.bind(this), shortLabel: 'Listagem' },
    { label: 'Cadastro', icon: 'po-icon-user-add', link: '/cadastro', action: this.changeMenuSelected.bind(this), shortLabel: 'Cadastro' },
  ];
}
