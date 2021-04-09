/**
 * @jest-environment jsdom
 */

import React, { ReactChild, ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import dark from '@/common/design/tokens/palette.dark';
import light from '@/common/design/tokens/palette.light';


import { Typography } from '../Typography';

const renderWithProvider = (ui: ReactNode, theme: 'light' | 'dark' = 'light') => render(
  <ThemeProvider theme={theme === 'light' ? light : dark}>
    {ui}
  </ThemeProvider>
)

describe('<Typography />', () => {
  const children: ReactChild = 'Typography';

  it('should render a children', () => {
    renderWithProvider(<Typography>{children}</Typography>);

    expect(screen.getByText(children)).toBeDefined();
    expect(screen.getByText(children).tagName).toBe('P');
  });

  it('should render a h1', () => {
    renderWithProvider(<Typography variant="h1">{children}</Typography>);

    expect(screen.getByText(children).tagName).toBe('H1');
  });

  it('should render a h2', () => {
    renderWithProvider(<Typography variant="h2">{children}</Typography>);

    expect(screen.getByText(children).tagName).toBe('H2');
  });

  it('should render a h3', () => {
    renderWithProvider(<Typography variant="h3">{children}</Typography>);

    expect(screen.getByText(children).tagName).toBe('H3');
  });

  it('should render a h4', () => {
    renderWithProvider(<Typography variant="h4">{children}</Typography>);

    expect(screen.getByText(children).tagName).toBe('H4');
  });

  it('should render a h5', () => {
    renderWithProvider(<Typography variant="h5">{children}</Typography>);

    expect(screen.getByText(children).tagName).toBe('H5');
  });

  it('should render a h6', () => {
    renderWithProvider(<Typography variant="h6">{children}</Typography>);

    expect(screen.getByText(children).tagName).toBe('H6');
  });

  it('should render a chosen tag', () => {
    renderWithProvider(<Typography component="h1" variant="h4">{children}</Typography>);

    expect(screen.getByText(children).tagName).toBe('H1');
  });

  it('should center text', () => {
    renderWithProvider(<Typography align="center">{children}</Typography>);

    expect(screen.getByText(children)).toHaveStyleRule('text-align', 'center');
  });

  it('should set display initial', () => {
    renderWithProvider(<Typography display="initial">{children}</Typography>);

    expect(screen.getByText(children)).not.toHaveStyleRule('display');
  });

  it('should set display inline', () => {
    renderWithProvider(<Typography display="inline">{children}</Typography>);

    expect(screen.getByText(children)).toHaveStyleRule('display', 'inline');
  });

  it('should set display block', () => {
    renderWithProvider(<Typography display="block">{children}</Typography>);

    expect(screen.getByText(children)).toHaveStyleRule('display', 'block');
  });

  it('should render a p with a paragraph', () => {
    renderWithProvider(<Typography paragraph>{children}</Typography>);

    expect(screen.getByText(children).tagName).toBe('P');
  });

  it('should work with a single value', () => {
    renderWithProvider(<Typography variant="h4" variantMapping={{ h4: 'aside' }}>{children}</Typography>);

    expect(screen.getByText(children).tagName).toBe('ASIDE');
  });
});
