import 'dotenv/config';

export default {
  name: 'CineReserve',
  slug: 'cine-reserve',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
  },
  web: {
    favicon: './assets/favicon.png',
  },
  extra: {
    EXPO_PUBLIC_API_IOS_URL: process.env.EXPO_PUBLIC_API_IOS_URL,
    EXPO_PUBLIC_API_ANDROID_URL: process.env.EXPO_PUBLIC_API_ANDROID_URL,
    EXPO_PUBLIC_GOOGLE_CLIENT_ID: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
  },
};
