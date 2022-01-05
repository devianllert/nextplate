import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';

import { StyledOverlay } from './SheetOverlay';

export const Sheet = ({ children, ...props }: DialogPrimitive.DialogProps) => (
  <DialogPrimitive.Root {...props}>
    <StyledOverlay />

    {children}
  </DialogPrimitive.Root>
);

export const SheetTrigger = DialogPrimitive.Trigger;
export const SheetClose = DialogPrimitive.Close;
export const SheetTitle = DialogPrimitive.Title;
export const SheetPortal = DialogPrimitive.Portal;
export const SheetDescription = DialogPrimitive.Description;
