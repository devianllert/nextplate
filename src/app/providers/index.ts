import { compose } from '@effable/misc';

import { withDesignSystem } from './with-design-system';
import { withEffector } from './with-effector';
import { withI18n } from './with-i18n';

export const withProviders = compose(withDesignSystem, withEffector, withI18n);
