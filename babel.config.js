module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@': './src', // o './src' si usas carpeta src
          },
        },
      ],
    ],
  };
};
