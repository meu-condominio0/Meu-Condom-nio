export interface Unidade {
  id: string;
  fracaoIdeal: number; // metragem ou fração ideal da unidade
  isento?: boolean; // unidade com isenção da taxa condominial
}

/**
 * Calcula o valor da taxa condominial para cada unidade considerando
 * isenções e rateio proporcional pela fração ideal.
 */
export function calcularRateioTaxa(total: number, unidades: Unidade[]): Record<string, number> {
  const pagantes = unidades.filter(u => !u.isento);
  const somaFracoes = pagantes.reduce((soma, u) => soma + u.fracaoIdeal, 0);
  const resultado: Record<string, number> = {};

  for (const u of unidades) {
    resultado[u.id] = u.isento ? 0 : total * (u.fracaoIdeal / somaFracoes);
  }

  return resultado;
}
