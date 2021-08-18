import { api } from '@/modules/core/api/api';

interface WTTRWeatherCurrentCondition {
  FeelsLikeC: string;
  FeelsLikeF: string;
  cloudcover: string;
  humidity: string;
  localObsDateTime: string;
  observation_time: string;
  precipInches: string;
  precipMM: string;
  pressure: string;
  pressureInches: string;
  temp_C: string;
  temp_F: string;
  uvIndex: string;
  visibility: string;
  visibilityMiles: string;
  weatherCode: string;
  weatherDesc: [
    {
      value: string;
    },
  ];
  weatherIconUrl: [
    {
      value: string;
    },
  ];
  winddir16Point: string;
  winddirDegree: string;
  windspeedKmph: string;
  windspeedMiles: string;
}

interface WTTRWeatherNearestArea {
  areaName: [
    {
      value: string;
    },
  ];
  country: [
    {
      value: string;
    },
  ];
  latitude: string;
  longitude: string;
  population: string;
  region: [
    {
      value: string;
    },
  ];
  weatherUrl: [
    {
      value: string;
    },
  ];
}

interface WTTRWeather {
  current_condition: [WTTRWeatherCurrentCondition];
  nearest_area: [WTTRWeatherNearestArea];
}

export interface Weather {
  place: string;
  condition: {
    title: string;
    code: string;
  };
  temp: {
    c: string;
    f: string;
  };
  date: {
    time: string;
    date: string;
  };
}

const WEATHER_API_ENDPOINT = 'https://wttr.in';

export const fetchWeather = async (place = ''): Promise<Weather> => {
  const { data } = await api.get<WTTRWeather>(`${WEATHER_API_ENDPOINT}/${encodeURIComponent(place)}?format=j1`);

  const weather: Weather = {
    place: `${data.nearest_area[0].region[0].value}, ${data.nearest_area[0].country[0].value}`,
    condition: {
      title: data.current_condition[0].weatherDesc[0].value,
      code: data.current_condition[0].weatherCode,
    },
    temp: {
      c: data.current_condition[0].temp_C,
      f: data.current_condition[0].temp_F,
    },
    date: {
      time: data.current_condition[0].observation_time,
      date: data.current_condition[0].localObsDateTime,
    },
  };

  return weather;
};
