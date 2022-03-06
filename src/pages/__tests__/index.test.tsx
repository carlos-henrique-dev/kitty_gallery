import { fireEvent, render, screen } from '@testing-library/react';
import Index from '../index';
import { ContextProvider } from '../../context/ContextProvider';

describe('render page', () => {
  it('renders the page with context', () => {
    render(
      <ContextProvider>
        <Index />
      </ContextProvider>
    );

    const IndexPage = screen.queryByTestId('container');

    expect(IndexPage).toBeInTheDocument();
  });

  it('renders the cards on homepage', () => {
    render(
      <ContextProvider>
        <Index />
      </ContextProvider>
    );

    const Cards = screen.queryAllByTestId('card');

    expect(Cards.length).toBeGreaterThan(0);
  });

  it('renders empty message on favorite page when no card is clicked', async () => {
    render(
      <ContextProvider>
        <Index />
      </ContextProvider>
    );

    await fireEvent(
      screen.getByTestId('tab-1'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );

    const Cards = screen.queryAllByTestId('card');
    const EmptyMessage = screen.queryByTestId('empty-list');

    expect(Cards.length).toBe(0);
    expect(EmptyMessage).toBeInTheDocument();
  });

  it('renders favorite images in favorite page when a card is clicked', async () => {
    render(
      <ContextProvider>
        <Index />
      </ContextProvider>
    );

    const CardsIndex = screen.queryAllByTestId('card');

    await fireEvent(
      CardsIndex[0],
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );

    const CardsFavorite = screen.queryAllByTestId('card');

    expect(CardsFavorite.length).toBeGreaterThan(0);
  });

  it('remove favorite image when a card is clicked twice', async () => {
    render(
      <ContextProvider>
        <Index />
      </ContextProvider>
    );

    const CardsIndex = screen.queryAllByTestId('card');

    await fireEvent(
      CardsIndex[0],
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );

    await fireEvent(
      screen.getByTestId('tab-1'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );

    const CardsFavorite = screen.queryAllByTestId('card');

    await fireEvent(
      CardsFavorite[0],
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );

    const CardsFavoriteAfter = screen.queryAllByTestId('card');

    const EmptyMessage = screen.queryByTestId('empty-list');

    expect(CardsFavoriteAfter.length).toBe(0);
    expect(EmptyMessage).toBeInTheDocument();
  });
});
