import { setupWorker } from 'msw';
import { getNestplateAuthMSW } from '@/shared/api/api.generated';
import { authMocks } from './auth-mock';

export const worker = setupWorker(...getNestplateAuthMSW(), ...authMocks);
