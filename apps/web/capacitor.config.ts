import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.survival.mist',
  appName: '全民求生',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
};

export default config;
