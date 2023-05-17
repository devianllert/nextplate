interface DemoApp {
  link?: string;
  image?: string;
  title: string;
  description: string;
}

export const demoApps: DemoApp[] = [
  {
    title: 'Authorization',
    description: 'DEMOS_AUTH_DESCRIPTION',
  },
  {
    title: 'Weather',
    description: 'DEMOS_WEATHER_DESCRIPTION',
  },
  {
    title: 'Passkip',
    description: 'DEMOS_PASSWORD_DESCRIPTION',
  },
];
