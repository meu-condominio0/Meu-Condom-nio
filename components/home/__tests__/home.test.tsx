import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Home } from '../Home';
import data from '../../../__mocks__/homeData';

describe('Home', () => {
  it('renders quick actions', async () => {
    render(<Home initialData={data} />);

    const quickActions = await screen.findAllByRole('link', {
      name: /reservas|boletos|avisos|visitantes/i,
    });

    expect(quickActions).toHaveLength(4);
  });

  it('opens QR modal', async () => {
    render(<Home initialData={data} />);

    const button = await screen.findByRole('button', { name: /qr code visitante/i });
    fireEvent.click(button);

    const modalTitle = await screen.findByRole('heading', { name: /qr code visitante/i });
    expect(modalTitle).toBeInTheDocument();
  });
});
