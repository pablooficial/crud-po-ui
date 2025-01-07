import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input } from '@angular/core';
import { PoLoadingModule, PoTableColumn, PoTableModule } from '@po-ui/ng-components';
import { Despesa } from '../../app/models/despesa-model';

@Component({
  selector: 'app-po-table',
  standalone: true,
  imports: [PoTableModule, PoLoadingModule],
  templateUrl: './po-table.component.html',
  styleUrl: './po-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PoTableComponent {
  ngOnInit() {
    this.getExpenses();
  }

  public items = [] as Despesa[];
  public columns: PoTableColumn[] = [
    {property: 'cod_desp', label: 'Código'},
    {property: 'Unidade', label: 'unidade'},
    {property: 'desc_desp', label: 'Descrição'},
    {property: 'tp_desp', label: 'Tipo'},
    {property: 'valor_unit', label: 'Valor unitário'},
    {property: 'id', label: 'ID'},
  ];
  public loading: boolean = true;
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  getExpenses() {
    this.items = localStorage.getItem('despesas')
      && JSON.parse(localStorage.getItem('despesas')!).items
      setTimeout(() => {
        this.loading = false
        this.cdr.detectChanges();
      }, 2000);
  }
}
