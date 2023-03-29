export const pagesPath = {
  $404: {
    $url: (url?: { hash?: string }) => ({ pathname: '/404' as const, hash: url?.hash }),
  },
  auth: {
    login: {
      $url: (url?: { hash?: string }) => ({ pathname: '/auth/login' as const, hash: url?.hash }),
    },
    signup: {
      $url: (url?: { hash?: string }) => ({ pathname: '/auth/signup' as const, hash: url?.hash }),
    },
  },
  dashboard: {
    $url: (url?: { hash?: string }) => ({ pathname: '/dashboard' as const, hash: url?.hash }),
  },
  weather: {
    _place: (place: string | number) => ({
      $url: (url?: { hash?: string }) => ({ pathname: '/weather/[place]' as const, query: { place }, hash: url?.hash }),
    }),
    $url: (url?: { hash?: string }) => ({ pathname: '/weather' as const, hash: url?.hash }),
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash }),
};

export type PagesPath = typeof pagesPath;

export const staticPath = {
  locales: {
    en: {
      $404_json: '/locales/en/404.json',
      auth_json: '/locales/en/auth.json',
      common_json: '/locales/en/common.json',
      index_json: '/locales/en/index.json',
    },
    ru: {
      $404_json: '/locales/ru/404.json',
      auth_json: '/locales/ru/auth.json',
      common_json: '/locales/ru/common.json',
      index_json: '/locales/ru/index.json',
    },
  },
  site_webmanifest: '/site.webmanifest',
  static: {
    images: {
      $404_png: '/static/images/404.png',
      android_chrome_192x192_png: '/static/images/android-chrome-192x192.png',
      android_chrome_512x512_png: '/static/images/android-chrome-512x512.png',
      apple_touch_icon_png: '/static/images/apple-touch-icon.png',
      apps: {
        en: {
          auth_png: '/static/images/apps/en/auth.png',
        },
        ru: {
          auth_png: '/static/images/apps/ru/auth.png',
        },
        weather_png: '/static/images/apps/weather.png',
      },
      circle_scatter_svg: '/static/images/circle-scatter.svg',
      favicon_16x16_png: '/static/images/favicon-16x16.png',
      favicon_32x32_png: '/static/images/favicon-32x32.png',
      favicon_ico: '/static/images/favicon.ico',
      logo_og_png: '/static/images/logo-og.png',
      maskable_icon_png: '/static/images/maskable_icon.png',
      stars_svg: '/static/images/stars.svg',
      vercel_svg: '/static/images/vercel.svg',
      weather: {
        wi_alien_svg: '/static/images/weather/wi-alien.svg',
        wi_barometer_svg: '/static/images/weather/wi-barometer.svg',
        wi_celsius_svg: '/static/images/weather/wi-celsius.svg',
        wi_cloud_down_svg: '/static/images/weather/wi-cloud-down.svg',
        wi_cloud_refresh_svg: '/static/images/weather/wi-cloud-refresh.svg',
        wi_cloud_up_svg: '/static/images/weather/wi-cloud-up.svg',
        wi_cloud_svg: '/static/images/weather/wi-cloud.svg',
        wi_cloudy_gusts_svg: '/static/images/weather/wi-cloudy-gusts.svg',
        wi_cloudy_windy_svg: '/static/images/weather/wi-cloudy-windy.svg',
        wi_cloudy_svg: '/static/images/weather/wi-cloudy.svg',
        wi_day_cloudy_gusts_svg: '/static/images/weather/wi-day-cloudy-gusts.svg',
        wi_day_cloudy_high_svg: '/static/images/weather/wi-day-cloudy-high.svg',
        wi_day_cloudy_windy_svg: '/static/images/weather/wi-day-cloudy-windy.svg',
        wi_day_cloudy_svg: '/static/images/weather/wi-day-cloudy.svg',
        wi_day_fog_svg: '/static/images/weather/wi-day-fog.svg',
        wi_day_hail_svg: '/static/images/weather/wi-day-hail.svg',
        wi_day_haze_svg: '/static/images/weather/wi-day-haze.svg',
        wi_day_light_wind_svg: '/static/images/weather/wi-day-light-wind.svg',
        wi_day_lightning_svg: '/static/images/weather/wi-day-lightning.svg',
        wi_day_rain_mix_svg: '/static/images/weather/wi-day-rain-mix.svg',
        wi_day_rain_wind_svg: '/static/images/weather/wi-day-rain-wind.svg',
        wi_day_rain_svg: '/static/images/weather/wi-day-rain.svg',
        wi_day_showers_svg: '/static/images/weather/wi-day-showers.svg',
        wi_day_sleet_storm_svg: '/static/images/weather/wi-day-sleet-storm.svg',
        wi_day_sleet_svg: '/static/images/weather/wi-day-sleet.svg',
        wi_day_snow_thunderstorm_svg: '/static/images/weather/wi-day-snow-thunderstorm.svg',
        wi_day_snow_wind_svg: '/static/images/weather/wi-day-snow-wind.svg',
        wi_day_snow_svg: '/static/images/weather/wi-day-snow.svg',
        wi_day_sprinkle_svg: '/static/images/weather/wi-day-sprinkle.svg',
        wi_day_storm_showers_svg: '/static/images/weather/wi-day-storm-showers.svg',
        wi_day_sunny_overcast_svg: '/static/images/weather/wi-day-sunny-overcast.svg',
        wi_day_sunny_svg: '/static/images/weather/wi-day-sunny.svg',
        wi_day_thunderstorm_svg: '/static/images/weather/wi-day-thunderstorm.svg',
        wi_day_windy_svg: '/static/images/weather/wi-day-windy.svg',
        wi_degrees_svg: '/static/images/weather/wi-degrees.svg',
        wi_direction_down_left_svg: '/static/images/weather/wi-direction-down-left.svg',
        wi_direction_down_right_svg: '/static/images/weather/wi-direction-down-right.svg',
        wi_direction_down_svg: '/static/images/weather/wi-direction-down.svg',
        wi_direction_left_svg: '/static/images/weather/wi-direction-left.svg',
        wi_direction_right_svg: '/static/images/weather/wi-direction-right.svg',
        wi_direction_up_left_svg: '/static/images/weather/wi-direction-up-left.svg',
        wi_direction_up_right_svg: '/static/images/weather/wi-direction-up-right.svg',
        wi_direction_up_svg: '/static/images/weather/wi-direction-up.svg',
        wi_dust_svg: '/static/images/weather/wi-dust.svg',
        wi_earthquake_svg: '/static/images/weather/wi-earthquake.svg',
        wi_fahrenheit_svg: '/static/images/weather/wi-fahrenheit.svg',
        wi_fire_svg: '/static/images/weather/wi-fire.svg',
        wi_flood_svg: '/static/images/weather/wi-flood.svg',
        wi_fog_svg: '/static/images/weather/wi-fog.svg',
        wi_gale_warning_svg: '/static/images/weather/wi-gale-warning.svg',
        wi_hail_svg: '/static/images/weather/wi-hail.svg',
        wi_horizon_alt_svg: '/static/images/weather/wi-horizon-alt.svg',
        wi_horizon_svg: '/static/images/weather/wi-horizon.svg',
        wi_hot_svg: '/static/images/weather/wi-hot.svg',
        wi_humidity_svg: '/static/images/weather/wi-humidity.svg',
        wi_hurricane_warning_svg: '/static/images/weather/wi-hurricane-warning.svg',
        wi_hurricane_svg: '/static/images/weather/wi-hurricane.svg',
        wi_lightning_svg: '/static/images/weather/wi-lightning.svg',
        wi_lunar_eclipse_svg: '/static/images/weather/wi-lunar-eclipse.svg',
        wi_meteor_svg: '/static/images/weather/wi-meteor.svg',
        wi_moon_alt_first_quarter_svg: '/static/images/weather/wi-moon-alt-first-quarter.svg',
        wi_moon_alt_full_svg: '/static/images/weather/wi-moon-alt-full.svg',
        wi_moon_alt_new_svg: '/static/images/weather/wi-moon-alt-new.svg',
        wi_moon_alt_third_quarter_svg: '/static/images/weather/wi-moon-alt-third-quarter.svg',
        wi_moon_alt_waning_crescent_1_svg: '/static/images/weather/wi-moon-alt-waning-crescent-1.svg',
        wi_moon_alt_waning_crescent_2_svg: '/static/images/weather/wi-moon-alt-waning-crescent-2.svg',
        wi_moon_alt_waning_crescent_3_svg: '/static/images/weather/wi-moon-alt-waning-crescent-3.svg',
        wi_moon_alt_waning_crescent_4_svg: '/static/images/weather/wi-moon-alt-waning-crescent-4.svg',
        wi_moon_alt_waning_crescent_5_svg: '/static/images/weather/wi-moon-alt-waning-crescent-5.svg',
        wi_moon_alt_waning_crescent_6_svg: '/static/images/weather/wi-moon-alt-waning-crescent-6.svg',
        wi_moon_alt_waning_gibbous_1_svg: '/static/images/weather/wi-moon-alt-waning-gibbous-1.svg',
        wi_moon_alt_waning_gibbous_2_svg: '/static/images/weather/wi-moon-alt-waning-gibbous-2.svg',
        wi_moon_alt_waning_gibbous_3_svg: '/static/images/weather/wi-moon-alt-waning-gibbous-3.svg',
        wi_moon_alt_waning_gibbous_4_svg: '/static/images/weather/wi-moon-alt-waning-gibbous-4.svg',
        wi_moon_alt_waning_gibbous_5_svg: '/static/images/weather/wi-moon-alt-waning-gibbous-5.svg',
        wi_moon_alt_waning_gibbous_6_svg: '/static/images/weather/wi-moon-alt-waning-gibbous-6.svg',
        wi_moon_alt_waxing_crescent_1_svg: '/static/images/weather/wi-moon-alt-waxing-crescent-1.svg',
        wi_moon_alt_waxing_crescent_2_svg: '/static/images/weather/wi-moon-alt-waxing-crescent-2.svg',
        wi_moon_alt_waxing_crescent_3_svg: '/static/images/weather/wi-moon-alt-waxing-crescent-3.svg',
        wi_moon_alt_waxing_crescent_4_svg: '/static/images/weather/wi-moon-alt-waxing-crescent-4.svg',
        wi_moon_alt_waxing_crescent_5_svg: '/static/images/weather/wi-moon-alt-waxing-crescent-5.svg',
        wi_moon_alt_waxing_crescent_6_svg: '/static/images/weather/wi-moon-alt-waxing-crescent-6.svg',
        wi_moon_alt_waxing_gibbous_1_svg: '/static/images/weather/wi-moon-alt-waxing-gibbous-1.svg',
        wi_moon_alt_waxing_gibbous_2_svg: '/static/images/weather/wi-moon-alt-waxing-gibbous-2.svg',
        wi_moon_alt_waxing_gibbous_3_svg: '/static/images/weather/wi-moon-alt-waxing-gibbous-3.svg',
        wi_moon_alt_waxing_gibbous_4_svg: '/static/images/weather/wi-moon-alt-waxing-gibbous-4.svg',
        wi_moon_alt_waxing_gibbous_5_svg: '/static/images/weather/wi-moon-alt-waxing-gibbous-5.svg',
        wi_moon_alt_waxing_gibbous_6_svg: '/static/images/weather/wi-moon-alt-waxing-gibbous-6.svg',
        wi_moon_first_quarter_svg: '/static/images/weather/wi-moon-first-quarter.svg',
        wi_moon_full_svg: '/static/images/weather/wi-moon-full.svg',
        wi_moon_new_svg: '/static/images/weather/wi-moon-new.svg',
        wi_moon_third_quarter_svg: '/static/images/weather/wi-moon-third-quarter.svg',
        wi_moon_waning_crescent_1_svg: '/static/images/weather/wi-moon-waning-crescent-1.svg',
        wi_moon_waning_crescent_2_svg: '/static/images/weather/wi-moon-waning-crescent-2.svg',
        wi_moon_waning_crescent_3_svg: '/static/images/weather/wi-moon-waning-crescent-3.svg',
        wi_moon_waning_crescent_4_svg: '/static/images/weather/wi-moon-waning-crescent-4.svg',
        wi_moon_waning_crescent_5_svg: '/static/images/weather/wi-moon-waning-crescent-5.svg',
        wi_moon_waning_crescent_6_svg: '/static/images/weather/wi-moon-waning-crescent-6.svg',
        wi_moon_waning_gibbous_1_svg: '/static/images/weather/wi-moon-waning-gibbous-1.svg',
        wi_moon_waning_gibbous_2_svg: '/static/images/weather/wi-moon-waning-gibbous-2.svg',
        wi_moon_waning_gibbous_3_svg: '/static/images/weather/wi-moon-waning-gibbous-3.svg',
        wi_moon_waning_gibbous_4_svg: '/static/images/weather/wi-moon-waning-gibbous-4.svg',
        wi_moon_waning_gibbous_5_svg: '/static/images/weather/wi-moon-waning-gibbous-5.svg',
        wi_moon_waning_gibbous_6_svg: '/static/images/weather/wi-moon-waning-gibbous-6.svg',
        wi_moon_waxing_6_svg: '/static/images/weather/wi-moon-waxing-6.svg',
        wi_moon_waxing_crescent_1_svg: '/static/images/weather/wi-moon-waxing-crescent-1.svg',
        wi_moon_waxing_crescent_2_svg: '/static/images/weather/wi-moon-waxing-crescent-2.svg',
        wi_moon_waxing_crescent_3_svg: '/static/images/weather/wi-moon-waxing-crescent-3.svg',
        wi_moon_waxing_crescent_4_svg: '/static/images/weather/wi-moon-waxing-crescent-4.svg',
        wi_moon_waxing_crescent_5_svg: '/static/images/weather/wi-moon-waxing-crescent-5.svg',
        wi_moon_waxing_gibbous_1_svg: '/static/images/weather/wi-moon-waxing-gibbous-1.svg',
        wi_moon_waxing_gibbous_2_svg: '/static/images/weather/wi-moon-waxing-gibbous-2.svg',
        wi_moon_waxing_gibbous_3_svg: '/static/images/weather/wi-moon-waxing-gibbous-3.svg',
        wi_moon_waxing_gibbous_4_svg: '/static/images/weather/wi-moon-waxing-gibbous-4.svg',
        wi_moon_waxing_gibbous_5_svg: '/static/images/weather/wi-moon-waxing-gibbous-5.svg',
        wi_moon_waxing_gibbous_6_svg: '/static/images/weather/wi-moon-waxing-gibbous-6.svg',
        wi_moonrise_svg: '/static/images/weather/wi-moonrise.svg',
        wi_moonset_svg: '/static/images/weather/wi-moonset.svg',
        wi_na_svg: '/static/images/weather/wi-na.svg',
        wi_night_alt_cloudy_gusts_svg: '/static/images/weather/wi-night-alt-cloudy-gusts.svg',
        wi_night_alt_cloudy_high_svg: '/static/images/weather/wi-night-alt-cloudy-high.svg',
        wi_night_alt_cloudy_windy_svg: '/static/images/weather/wi-night-alt-cloudy-windy.svg',
        wi_night_alt_cloudy_svg: '/static/images/weather/wi-night-alt-cloudy.svg',
        wi_night_alt_hail_svg: '/static/images/weather/wi-night-alt-hail.svg',
        wi_night_alt_lightning_svg: '/static/images/weather/wi-night-alt-lightning.svg',
        wi_night_alt_partly_cloudy_svg: '/static/images/weather/wi-night-alt-partly-cloudy.svg',
        wi_night_alt_rain_mix_svg: '/static/images/weather/wi-night-alt-rain-mix.svg',
        wi_night_alt_rain_wind_svg: '/static/images/weather/wi-night-alt-rain-wind.svg',
        wi_night_alt_rain_svg: '/static/images/weather/wi-night-alt-rain.svg',
        wi_night_alt_showers_svg: '/static/images/weather/wi-night-alt-showers.svg',
        wi_night_alt_sleet_storm_svg: '/static/images/weather/wi-night-alt-sleet-storm.svg',
        wi_night_alt_sleet_svg: '/static/images/weather/wi-night-alt-sleet.svg',
        wi_night_alt_snow_thunderstorm_svg: '/static/images/weather/wi-night-alt-snow-thunderstorm.svg',
        wi_night_alt_snow_wind_svg: '/static/images/weather/wi-night-alt-snow-wind.svg',
        wi_night_alt_snow_svg: '/static/images/weather/wi-night-alt-snow.svg',
        wi_night_alt_sprinkle_svg: '/static/images/weather/wi-night-alt-sprinkle.svg',
        wi_night_alt_storm_showers_svg: '/static/images/weather/wi-night-alt-storm-showers.svg',
        wi_night_alt_thunderstorm_svg: '/static/images/weather/wi-night-alt-thunderstorm.svg',
        wi_night_clear_svg: '/static/images/weather/wi-night-clear.svg',
        wi_night_cloudy_gusts_svg: '/static/images/weather/wi-night-cloudy-gusts.svg',
        wi_night_cloudy_high_svg: '/static/images/weather/wi-night-cloudy-high.svg',
        wi_night_cloudy_windy_svg: '/static/images/weather/wi-night-cloudy-windy.svg',
        wi_night_cloudy_svg: '/static/images/weather/wi-night-cloudy.svg',
        wi_night_fog_svg: '/static/images/weather/wi-night-fog.svg',
        wi_night_hail_svg: '/static/images/weather/wi-night-hail.svg',
        wi_night_lightning_svg: '/static/images/weather/wi-night-lightning.svg',
        wi_night_partly_cloudy_svg: '/static/images/weather/wi-night-partly-cloudy.svg',
        wi_night_rain_mix_svg: '/static/images/weather/wi-night-rain-mix.svg',
        wi_night_rain_wind_svg: '/static/images/weather/wi-night-rain-wind.svg',
        wi_night_rain_svg: '/static/images/weather/wi-night-rain.svg',
        wi_night_showers_svg: '/static/images/weather/wi-night-showers.svg',
        wi_night_sleet_storm_svg: '/static/images/weather/wi-night-sleet-storm.svg',
        wi_night_sleet_svg: '/static/images/weather/wi-night-sleet.svg',
        wi_night_snow_thunderstorm_svg: '/static/images/weather/wi-night-snow-thunderstorm.svg',
        wi_night_snow_wind_svg: '/static/images/weather/wi-night-snow-wind.svg',
        wi_night_snow_svg: '/static/images/weather/wi-night-snow.svg',
        wi_night_sprinkle_svg: '/static/images/weather/wi-night-sprinkle.svg',
        wi_night_storm_showers_svg: '/static/images/weather/wi-night-storm-showers.svg',
        wi_night_thunderstorm_svg: '/static/images/weather/wi-night-thunderstorm.svg',
        wi_rain_mix_svg: '/static/images/weather/wi-rain-mix.svg',
        wi_rain_wind_svg: '/static/images/weather/wi-rain-wind.svg',
        wi_rain_svg: '/static/images/weather/wi-rain.svg',
        wi_raindrop_svg: '/static/images/weather/wi-raindrop.svg',
        wi_raindrops_svg: '/static/images/weather/wi-raindrops.svg',
        wi_refresh_alt_svg: '/static/images/weather/wi-refresh-alt.svg',
        wi_refresh_svg: '/static/images/weather/wi-refresh.svg',
        wi_sandstorm_svg: '/static/images/weather/wi-sandstorm.svg',
        wi_showers_svg: '/static/images/weather/wi-showers.svg',
        wi_sleet_svg: '/static/images/weather/wi-sleet.svg',
        wi_small_craft_advisory_svg: '/static/images/weather/wi-small-craft-advisory.svg',
        wi_smog_svg: '/static/images/weather/wi-smog.svg',
        wi_smoke_svg: '/static/images/weather/wi-smoke.svg',
        wi_snow_wind_svg: '/static/images/weather/wi-snow-wind.svg',
        wi_snow_svg: '/static/images/weather/wi-snow.svg',
        wi_snowflake_cold_svg: '/static/images/weather/wi-snowflake-cold.svg',
        wi_solar_eclipse_svg: '/static/images/weather/wi-solar-eclipse.svg',
        wi_sprinkle_svg: '/static/images/weather/wi-sprinkle.svg',
        wi_stars_svg: '/static/images/weather/wi-stars.svg',
        wi_storm_showers_svg: '/static/images/weather/wi-storm-showers.svg',
        wi_storm_warning_svg: '/static/images/weather/wi-storm-warning.svg',
        wi_strong_wind_svg: '/static/images/weather/wi-strong-wind.svg',
        wi_sunrise_svg: '/static/images/weather/wi-sunrise.svg',
        wi_sunset_svg: '/static/images/weather/wi-sunset.svg',
        wi_thermometer_exterior_svg: '/static/images/weather/wi-thermometer-exterior.svg',
        wi_thermometer_internal_svg: '/static/images/weather/wi-thermometer-internal.svg',
        wi_thermometer_svg: '/static/images/weather/wi-thermometer.svg',
        wi_thunderstorm_svg: '/static/images/weather/wi-thunderstorm.svg',
        wi_time_1_svg: '/static/images/weather/wi-time-1.svg',
        wi_time_10_svg: '/static/images/weather/wi-time-10.svg',
        wi_time_11_svg: '/static/images/weather/wi-time-11.svg',
        wi_time_12_svg: '/static/images/weather/wi-time-12.svg',
        wi_time_2_svg: '/static/images/weather/wi-time-2.svg',
        wi_time_3_svg: '/static/images/weather/wi-time-3.svg',
        wi_time_4_svg: '/static/images/weather/wi-time-4.svg',
        wi_time_5_svg: '/static/images/weather/wi-time-5.svg',
        wi_time_6_svg: '/static/images/weather/wi-time-6.svg',
        wi_time_7_svg: '/static/images/weather/wi-time-7.svg',
        wi_time_8_svg: '/static/images/weather/wi-time-8.svg',
        wi_time_9_svg: '/static/images/weather/wi-time-9.svg',
        wi_tornado_svg: '/static/images/weather/wi-tornado.svg',
        wi_train_svg: '/static/images/weather/wi-train.svg',
        wi_tsunami_svg: '/static/images/weather/wi-tsunami.svg',
        wi_umbrella_svg: '/static/images/weather/wi-umbrella.svg',
        wi_volcano_svg: '/static/images/weather/wi-volcano.svg',
        wi_wind_beaufort_0_svg: '/static/images/weather/wi-wind-beaufort-0.svg',
        wi_wind_beaufort_1_svg: '/static/images/weather/wi-wind-beaufort-1.svg',
        wi_wind_beaufort_10_svg: '/static/images/weather/wi-wind-beaufort-10.svg',
        wi_wind_beaufort_11_svg: '/static/images/weather/wi-wind-beaufort-11.svg',
        wi_wind_beaufort_12_svg: '/static/images/weather/wi-wind-beaufort-12.svg',
        wi_wind_beaufort_2_svg: '/static/images/weather/wi-wind-beaufort-2.svg',
        wi_wind_beaufort_3_svg: '/static/images/weather/wi-wind-beaufort-3.svg',
        wi_wind_beaufort_4_svg: '/static/images/weather/wi-wind-beaufort-4.svg',
        wi_wind_beaufort_5_svg: '/static/images/weather/wi-wind-beaufort-5.svg',
        wi_wind_beaufort_6_svg: '/static/images/weather/wi-wind-beaufort-6.svg',
        wi_wind_beaufort_7_svg: '/static/images/weather/wi-wind-beaufort-7.svg',
        wi_wind_beaufort_8_svg: '/static/images/weather/wi-wind-beaufort-8.svg',
        wi_wind_beaufort_9_svg: '/static/images/weather/wi-wind-beaufort-9.svg',
        wi_wind_deg_svg: '/static/images/weather/wi-wind-deg.svg',
        wi_windy_svg: '/static/images/weather/wi-windy.svg',
      },
    },
  },
} as const;

export type StaticPath = typeof staticPath;
