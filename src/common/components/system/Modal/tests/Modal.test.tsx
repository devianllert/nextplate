/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { testA11y } from '@/modules/core/testing/test-utils';

import { Modal, ModalContent, ModalOverlay } from '../';

describe('<Modal />', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(
      <Modal open onClose={jest.fn()}>
        <ModalOverlay />
        <ModalContent>
          <div>Modal header</div>
          <div>Modal body</div>
          <button>Modal footer</button>
        </ModalContent>
      </Modal>,
    );

    await testA11y(container);
  });

  it("should have the proper 'aria' attributes", () => {
    render(
      <Modal open onClose={jest.fn()}>
        <ModalOverlay />
        <ModalContent data-testid="modal">
          <div>Modal header</div>
          <div>Modal body</div>
          <button />
        </ModalContent>
      </Modal>,
    );

    const dialog = screen.getByTestId('modal');

    /**
     * should have `aria-modal` set to `true`
     */
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('role', 'dialog');
  });

  it('clicking overlay or pressing "esc" calls the onClose callback', () => {
    const onClose = jest.fn();
    render(
      <Modal open onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <div>Modal header</div>
          <div>Modal body</div>
          <button />
        </ModalContent>
      </Modal>,
    );

    userEvent.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalled();
  });
});
