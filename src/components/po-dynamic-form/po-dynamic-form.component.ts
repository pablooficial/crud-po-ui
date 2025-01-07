import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  PoButtonModule,
  PoDynamicFormField,
  PoDynamicModule,
  PoNotificationService,
} from '@po-ui/ng-components';
import { ExpenseService } from '../../app/services/expense.service';

@Component({
  selector: 'app-po-dynamic-form',
  standalone: true,
  imports: [PoDynamicModule, PoButtonModule],
  templateUrl: './po-dynamic-form.component.html',
  styleUrl: './po-dynamic-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PoDynamicFormComponent {
  private expenseService: ExpenseService = inject(ExpenseService);
  public poNotification: PoNotificationService = inject(PoNotificationService);
  public expense = {}

  async ngOnInit() {
    await this.getTotalExpenses();
  }

  invalidaCampos(obj: { [key: string]: any }): boolean {
    return Object.values(obj).some(value => value === null || value === undefined || value === "");
  }

  saveNewExpense(value: any) {
    value.tp_desp = value.tp_desp === 'Valor Total' ? 2 : 1;
    value.id = Math.floor(Math.random() * 100);
    const camposInvalidos = this.invalidaCampos(value);
    if (camposInvalidos) {
      this.poNotification.error('Preencha todos os campos!')
    } else {
      this.expenseService.saveNewExpense(value);
      this.poNotification.success('Despesa cadastrada com sucesso!')
    }
  }

  getTotalExpenses() {
    return new Promise((resolve) => {
      const despesas = JSON.parse(localStorage.getItem('despesas')!);
      if(despesas) {
        this.expense = {
          cod_desp: despesas.total + 1
        }
        resolve(despesas);
      }
    });
  }

  fields: Array<PoDynamicFormField> = [
    {
      property: 'cod_desp',
      label: 'Código',
      divider: 'Cadastro de despesas',
      required: true,
      gridColumns: 1,
      gridSmColumns: 3,
      gridMdColumns: 2,
      order: 1,
      disabled: true,
    },
    {
      property: 'Unidade',
      label: 'Unidade',
      gridColumns: 3,
      gridSmColumns: 6,
      options: [
        { state: 'UN', code: 1 },
        { state: 'R$', code: 2 },
        { state: 'KM', code: 3 },
        { state: 'U$', code: 4 }
      ],
      fieldLabel: 'state',
      fieldValue: 'state',
      placeholder: 'Selecione a unidade',
    },
    {
      property: 'valor_unit',
      label: 'Valor Unitário',
      placeholder: 'Insira o valor da despesa',
      gridColumns: 4,
      gridSmColumns: 6,
    },
    {
      property: 'tp_desp',
      label: 'Tipo da despesa',
      gridColumns: 7,
      gridSmColumns: 12,
      options: ['Valor unitário' , 'Valor Total'],
    },
    {
      property: 'desc_desp',
      label: 'Descrição',
      gridColumns: 6,
      gridSmColumns: 12,
    }
  ];
}
