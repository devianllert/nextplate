/**
 * @jest-environment jsdom
 */

import React, { ReactChild } from 'react';
import { render, screen } from '@testing-library/react';

import { ButtonBase } from '../ButtonBase';

describe('<BaseButton />', () => {
  const children: ReactChild = 'BaseButton';

  describe('root node', () => {
    it('should have default button type "button"', () => {
      const { rerender } = render(<ButtonBase>{children}</ButtonBase>);
      expect(screen.getByText(children)).toHaveAttribute('type', 'button');

      rerender(<ButtonBase type={undefined}>{children}</ButtonBase>);
      expect(screen.getByText(children)).toHaveAttribute('type', 'button');
    });

    it('should change the button type', () => {
      render(<ButtonBase type="submit">{children}</ButtonBase>);
      expect(screen.getByText(children)).toHaveAttribute('type', 'submit');
    });

    it('should change the button component and add accessibility requirements', () => {
      render(
        <ButtonBase component="span" role="checkbox" aria-checked={false} />,
      );
      const checkbox = screen.getByRole('checkbox');

      expect(checkbox).toHaveProperty('nodeName', 'SPAN');
      expect(checkbox).toHaveAttribute('tabIndex', '0');
    });

    it('should not apply role="button" if type="button"', () => {
      render(<ButtonBase type="button">{children}</ButtonBase>);
      expect(screen.getByText(children)).not.toHaveAttribute('role');
    });

    it('should change the button type to span and set role="button"', () => {
      render(<ButtonBase component="span">{children}</ButtonBase>);
      const button = screen.getByRole('button');

      expect(button).toHaveProperty('nodeName', 'SPAN');
      expect(button).not.toHaveAttribute('type');
    });

    it('should automatically change the button to an anchor element when href is provided', () => {
      render(<ButtonBase href="https://google.com">{children}</ButtonBase>);
      const button = screen.getByText(children);

      expect(button).toHaveProperty('nodeName', 'A');
      expect(button).not.toHaveAttribute('role');
      expect(button).not.toHaveAttribute('type');
      expect(button).toHaveAttribute('href', 'https://google.com');
    });

    it('should use custom LinkComponent when provided in the theme', () => {
      const CustomLink = React.forwardRef((props, ref: React.Ref<HTMLAnchorElement>) => (
        <a data-testid="customLink" ref={ref} {...props}>
          {props.children}
        </a>
      ));

      render(
        <ButtonBase href="https://google.com" LinkComponent={CustomLink}>{children}</ButtonBase>
      );

      const button = screen.getByText(children);

      expect(screen.queryByTestId('customLink')).toBeTruthy();
      expect(button).toHaveProperty('nodeName', 'A');
      expect(button).toHaveAttribute('href', 'https://google.com');
    });

    it('applies role="button" when an anchor is used without href', () => {
      render(<ButtonBase component="a">{children}</ButtonBase>);

      const button = screen.getByRole('button');

      expect(button).toHaveProperty('nodeName', 'A');
      expect(button).not.toHaveAttribute('type');
    });

    it('should not use an anchor element if explicit component and href is passed', () => {
      render(
        <ButtonBase component="span" href="https://google.com">
          {children}
        </ButtonBase>,
      );

      const button = screen.getByRole('button');

      expect(button).toHaveProperty('nodeName', 'SPAN');
      expect(button).toHaveAttribute('href', 'https://google.com');
    });
  })

  describe('prop: disabled', () => {
    it('should have a negative tabIndex', () => {
      render(<ButtonBase disabled>{children}</ButtonBase>);

      expect(screen.getByText(children)).toHaveProperty('tabIndex', -1);
    });

    it('should forward it to native buttons', () => {
      render(
        <ButtonBase disabled component="button">
          {children}
        </ButtonBase>,
      );
      expect(screen.getByText(children)).toHaveProperty('disabled', true);
    });

    it('should use aria attributes for other components', () => {
      render(
        <ButtonBase component="span" disabled>
          {children}
        </ButtonBase>,
      );
      const button = screen.getByRole('button');

      expect(button).not.toHaveAttribute('disabled');
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });
  });

  describe('prop: component', () => {
    it('should allow to use a link component', () => {
      const Link = React.forwardRef((props, ref: React.Ref<HTMLDivElement>) => (
        <div data-testid="link" ref={ref} {...props} />
      ));

      render(<ButtonBase component={Link}>{children}</ButtonBase>);

      expect(screen.getByTestId('link')).toHaveAttribute('role', 'button');
    });
  });
});
