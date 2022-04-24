import React, { ReactElement } from 'react';

import { AuthContent } from '../auth-content';

export default {
  title: 'Layouts/Auth/AuthContent',
  component: AuthContent,
};

export const Basic = (): ReactElement => <AuthContent>Basic</AuthContent>;
