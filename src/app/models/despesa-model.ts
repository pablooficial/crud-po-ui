export interface Despesa {
  cod_desp: number;     // Código único da despesa
  Unidade: string;      // Unidade de medida (exemplo: UN, KM, R$)
  desc_desp: string;    // Descrição da despesa
  tp_desp: number;      // Tipo da despesa (1 - valor unitário, 2 - valor total)
  valor_unit: number;   // Valor unitário da despesa
  id: number;           // Identificador único
}
