// @ts-nocheck
import { describe, expect, test } from 'vitest';

// Testes esboçados para garantir que a camada de UI permaneça responsiva.
describe.skip('Auditoria de responsividade', () => {
  test('não deve existir rolagem horizontal na viewport principal', async () => {
    // TODO: montar App com @testing-library/react e validar scrollWidth === clientWidth.
    expect(true).toBe(true);
  });

  test('menu lateral deve estar colapsado em telas menores ou iguais a 768px', async () => {
    // TODO: mockar largura da janela e validar o estado do SidebarProvider.
    expect(true).toBe(true);
  });

  test('todos os botões interativos possuem altura mínima de 44px', async () => {
    // TODO: coletar botões renderizados e validar boundingClientRect().height >= 44.
    expect(true).toBe(true);
  });
});
