import { z } from 'zod';

import { createField } from '@/shared/lib/effector/forms';

export const email = createField({
  initialValue: '',
  schema: z.string({ required_error: 'ERROR_FIELD_REQUIRED' }).email('ERROR_EMAIL_INVALID'),
});
