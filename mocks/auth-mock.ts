import { rest } from 'msw';
import { getLoginMock, getRefreshMock } from '../src/shared/api/api.generated';

export const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2ODM5OTY0NDcsImV4cCI6MTcxNTUzMjQ1MCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsImlkIjoiMiJ9.s6hH_wBzR8BtWzTdTCCQ-mcuDFyJz_q_4lUNKK95EyA';
export const refreshToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2ODM5OTY0NjMsImV4cCI6MTY4Mzk5NzY2NCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsImlkIjoiMiJ9.1msAjPLJQAkAa2WQ5QVmkT5pPRUdT9kGy8JRFWziPHk';

export const authMocks = [
  rest.post('*/api/v1/auth/login', (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200, 'Mocked status'), ctx.json(getLoginMock()), ctx.cookie('access_token', accessToken), ctx.cookie('refresh_token', refreshToken));
  }),
  rest.post('*/api/v1/auth/refresh', (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200, 'Mocked status'), ctx.json(getRefreshMock()), ctx.cookie('access_token', accessToken), ctx.cookie('refresh_token', refreshToken));
  }),
];
