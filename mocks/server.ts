import { setupServer } from 'msw/node';
import { getNestplateAuthMSW } from '@/shared/api/api.generated';
import { authMocks } from './auth-mock';

export const server = setupServer(...getNestplateAuthMSW(), ...authMocks);
