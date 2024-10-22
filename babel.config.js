module.exports = function (api) {
  api.cache(true);
  const plugins = [
    [
      'expo-notifications',
      {
        icon: './assets/icon.png',
      },
    ],
  ];

  return {
    presets: ['babel-preset-expo'],

    plugins: ['react-native-reanimated/plugin'],
  };
};
