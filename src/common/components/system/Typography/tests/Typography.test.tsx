/**
 * @jest-environment jsdom
 */

import React, { ReactChild } from 'react';
import { render, screen } from '@testing-library/react';

import Typography from '../Typography';

describe('<Typography />', () => {
  const children: ReactChild = 'Typography';

  it('should render a children', () => {
    render(<Typography>{children}</Typography>);

    expect(screen.getByText(children)).toBeDefined();
    expect(screen.getByText(children).tagName).toBe('P');
  });

  it('should render a h1', () => {
    render(<Typography variant="h1">{children}</Typography>);

    expect(screen.getByText(children).tagName).toBe('H1');
  });

  it('should render a h2', () => {
    render(<Typography variant="h2">{children}</Typography>);

    expect(screen.getByText(children).tagName).toBe('H2');
  });

  it('should render a h3', () => {
    render(<Typography variant="h3">{children}</Typography>);

    expect(screen.getByText(children).tagName).toBe('H3');
  });

  it('should render a h4', () => {
    render(<Typography variant="h4">{children}</Typography>);

    expect(screen.getByText(children).tagName).toBe('H4');
  });

  it('should render a chosen tag', () => {
    render(<Typography component="h1" variant="h4">{children}</Typography>);

    expect(screen.getByText(children).tagName).toBe('H1');
  });

  it('should center text', () => {
    render(<Typography align="center">{children}</Typography>);

    expect(screen.getByText(children)).toHaveStyleRule('text-align', 'center');
  });

  it('should set display initial', () => {
    render(<Typography display="initial">{children}</Typography>);

    expect(screen.getByText(children)).not.toHaveStyleRule('display');
  });

  it('should set display inline', () => {
    render(<Typography display="inline">{children}</Typography>);

    expect(screen.getByText(children)).toHaveStyleRule('display', 'inline');
  });

  it('should set display block', () => {
    render(<Typography display="block">{children}</Typography>);

    expect(screen.getByText(children)).toHaveStyleRule('display', 'block');
  });

  it('should render a p with a paragraph', () => {
    render(<Typography paragraph>{children}</Typography>);

    expect(screen.getByText(children).tagName).toBe('P');
  });

  it('should work with a single value', () => {
    render(<Typography variant="h4" variantMapping={{ h4: 'aside' }}>{children}</Typography>);

    expect(screen.getByText(children).tagName).toBe('ASIDE');
  });
});
