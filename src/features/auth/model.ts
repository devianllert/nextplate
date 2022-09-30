import { z } from 'zod';

import { createField } from '@/shared/lib/effector/forms';

export const email = createField({
  initialValue: '',
  schema: z.string().email(),
});
