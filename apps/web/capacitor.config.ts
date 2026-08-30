import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.fogsea.survival',
  appName: '雾海生存',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
};

export default config;
