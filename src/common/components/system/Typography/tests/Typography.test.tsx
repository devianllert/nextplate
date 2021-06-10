/**
 * @jest-environment jsdom
 */

import React, { ReactChild, ReactNode } from 'react';
import { screen } from '@testing-library/react';

import { renderWithProviders } from '@/modules/tests/renderWithProviders';

import { Typography } from '../Typography';

describe('<Typography />', () => {
  const children: ReactChild = 'Typography';

  it('should render a children', () => {
    renderWithProviders(<Typography>{children}</Typography>);

    expect(screen.getByText(children)).toBeDefined();
    expect(screen.getByText(children).tagName).toBe('P');
  });

  it('should render a h1', () => {
    renderWithProviders(<Typography variant="h1">{children}</Typography>);

    expect(screen.getByText(children).tagName).toBe('H1');
  });

  it('should render a h2', () => {
    renderWithProviders(<Typography variant="h2">{children}</Typography>);

    expect(screen.getByText(children).tagName).toBe('H2');
  });

  it('should render a h3', () => {
    renderWithProviders(<Typography variant="h3">{children}</Typography>);

    expect(screen.getByText(children).tagName).toBe('H3');
  });

  it('should render a h4', () => {
    renderWithProviders(<Typography variant="h4">{children}</Typography>);

    expect(screen.getByText(children).tagName).toBe('H4');
  });

  it('should render a h5', () => {
    renderWithProviders(<Typography variant="h5">{children}</Typography>);

    expect(screen.getByText(children).tagName).toBe('H5');
  });

  it('should render a h6', () => {
    renderWithProviders(<Typography variant="h6">{children}</Typography>);

    expect(screen.getByText(children).tagName).toBe('H6');
  });

  it('should render a chosen tag', () => {
    renderWithProviders(<Typography component="h1" variant="h4">{children}</Typography>);

    expect(screen.getByText(children).tagName).toBe('H1');
  });

  it('should center text', () => {
    renderWithProviders(<Typography align="center">{children}</Typography>);

    expect(screen.getByText(children)).toHaveStyleRule('text-align', 'center');
  });

  it('should set display initial', () => {
    renderWithProviders(<Typography display="initial">{children}</Typography>);

    expect(screen.getByText(children)).not.toHaveStyleRule('display', '');
  });

  it('should set display inline', () => {
    renderWithProviders(<Typography display="inline">{children}</Typography>);

    expect(screen.getByText(children)).toHaveStyleRule('display', 'inline');
  });

  it('should set display block', () => {
    renderWithProviders(<Typography display="block">{children}</Typography>);

    expect(screen.getByText(children)).toHaveStyleRule('display', 'block');
  });

  it('should render a p with a paragraph', () => {
    renderWithProviders(<Typography paragraph>{children}</Typography>);

    expect(screen.getByText(children).tagName).toBe('P');
  });

  it('should work with a single value', () => {
    renderWithProviders(<Typography variant="h4" variantMapping={{ h4: 'aside' }}>{children}</Typography>);

    expect(screen.getByText(children).tagName).toBe('ASIDE');
  });
});
