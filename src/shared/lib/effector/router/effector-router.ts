import singletonRouter, { type NextRouter } from 'next/router';
import { createDomain } from 'effector';

export const routerDomain = createDomain('router');

type NextRouterEventWithError = [any, string];

export const routeChangeStart = routerDomain.createEvent<string>('routeChangeStarted');
export const routeChangeComplete = routerDomain.createEvent<string>();
export const routeChangeError = routerDomain.createEvent<NextRouterEventWithError>();
export const beforeHistoryChange = routerDomain.createEvent<string>();
export const hashChangeStart = routerDomain.createEvent<string>();
export const hashChangeComplete = routerDomain.createEvent<string>();

export const pushFx = routerDomain.createEffect();

const connectRouterToEffector = (nextRouter) => {
  nextRouter.ready(() => {
    const { router }: { router: NextRouter } = nextRouter;

    // forward next.js router events to effector events
    router.events.on('routeChangeStart', routeChangeStart);
    router.events.on('routeChangeComplete', routeChangeComplete);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    router.events.on('routeChangeError', (err, url) => routeChangeError([err, url]));
    router.events.on('beforeHistoryChange', beforeHistoryChange);
    router.events.on('hashChangeStart', hashChangeStart);
    router.events.on('hashChangeComplete', hashChangeComplete);

    // @ts-expect-error fix types
    pushFx.use(async ({ url, as, options }) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      await router.push(url, as, options);
    });
  });
};

connectRouterToEffector(singletonRouter);
