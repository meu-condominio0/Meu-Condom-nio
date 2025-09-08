export interface FaixaTarifaria {
  limite: number; // limite superior da faixa em m³
  valor: number; // valor por m³ nesta faixa
}

/**
 * Calcula o valor total de um consumo aplicando tarifação por faixas.
 * As faixas devem ser ordenadas por limite crescente. A última faixa pode ter
 * o limite como Infinity para representar consumo ilimitado.
 */
export function calcularValorConsumo(consumo: number, faixas: FaixaTarifaria[]): number {
  let restante = consumo;
  let total = 0;
  let limiteAnterior = 0;

  for (const faixa of faixas) {
    const maxFaixa = faixa.limite === Infinity ? Infinity : faixa.limite - limiteAnterior;
    const uso = Math.min(restante, maxFaixa);
    total += uso * faixa.valor;
    restante -= uso;
    limiteAnterior = faixa.limite;
    if (restante <= 0) break;
  }

  return total;
}
