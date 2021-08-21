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

export interface WTTRWeatherHourlyCondition {
  tempC: string;
  tempF: string;
  time: string | Date;
  weatherCode: string;
}

export interface WTTRWeatherDailyCondition {
  date: string;
  hourly: WTTRWeatherHourlyCondition[];
}

export interface WTTRWeather {
  current_condition: [WTTRWeatherCurrentCondition];
  nearest_area: [WTTRWeatherNearestArea];
  weather: WTTRWeatherDailyCondition[];
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
  daily: WTTRWeatherDailyCondition[];
}
