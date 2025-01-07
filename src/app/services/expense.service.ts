import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Despesa } from '../models/despesa-model';


@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private mockData = {
    total: 0,
    hasNext: false,
    items: [
      {
        cod_desp: 1,
        Unidade: "UN",
        desc_desp: "Pedágios, KM ida de volta Cidade A até Cidade B",
        tp_desp: 1,
        valor_unit: 15.50,
        id: 101
      },
      {
        cod_desp: 2,
        Unidade: "KM",
        desc_desp: "Deslocamento para visitas de campo",
        tp_desp: 2,
        valor_unit: 0.25,
        id: 102
      },
      {
        cod_desp: 3,
        Unidade: "R$",
        desc_desp: "Refeição em restaurante durante viagem",
        tp_desp: 2,
        valor_unit: 45.00,
        id: 103
      },
      {
        cod_desp: 4,
        Unidade: "UN",
        desc_desp: "Hospedagem em hotel durante viagem de negócios",
        tp_desp: 2,
        valor_unit: 180.00,
        id: 104
      },
      {
        cod_desp: 5,
        Unidade: "R$",
        desc_desp: "Transporte urbano durante deslocamento na cidade",
        tp_desp: 1,
        valor_unit: 8.00,
        id: 105
      },
      {
        cod_desp: 6,
        Unidade: "R$",
        desc_desp: "Taxa de estacionamento durante evento",
        tp_desp: 1,
        valor_unit: 20.00,
        id: 106
      },
      {
        cod_desp: 7,
        Unidade: "UN",
        desc_desp: "Aluguel de carro para viagem de negócios",
        tp_desp: 2,
        valor_unit: 350.00,
        id: 107
      },
      {
        cod_desp: 8,
        Unidade: "KM",
        desc_desp: "Deslocamento diário entre escritório e cliente",
        tp_desp: 1,
        valor_unit: 0.15,
        id: 108
      },
      {
        cod_desp: 9,
        Unidade: "R$",
        desc_desp: "Material de escritório para evento corporativo",
        tp_desp: 2,
        valor_unit: 120.00,
        id: 109
      },
      {
        cod_desp: 10,
        Unidade: "UN",
        desc_desp: "Participação em evento de networking",
        tp_desp: 2,
        valor_unit: 200.00,
        id: 110
      }
    ]
  }

  constructor() { }

  getExpends(): Observable<{ total: number; hasNext: boolean; items: Despesa[] }> {
    if(localStorage.getItem('despesas')) {
      return of(JSON.parse(localStorage.getItem('despesas')!));
    } else {
      this.mockData.total = this.mockData.items.length;
      localStorage.setItem('despesas', JSON.stringify(this.mockData));
      return of(this.mockData);
    }
  }

  saveNewExpense(newExpense: Despesa) {
    this.mockData.total = newExpense.cod_desp;
    this.mockData.items.push(newExpense);
    localStorage.setItem('despesas', JSON.stringify(this.mockData));
  }
}
