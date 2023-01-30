/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    colors: {
      yellow: '#FFD225',
      yellowLight: '#FFE68F',
      yellowDark: '#FFB822',
      blue: '#00133F',
      greenDark: '#00442C',
      green: '#00B272',
      greenLight: '#D5ECD5',
      white: '#FFFFFF',
      gray: '#F8F8F8',
      black: '#1C0000',
      purple: '#6C184E',
      purpleLight: '#A66990',
      pink: '#ED8DCB',
      pinkDark: '#B5006C',
    },
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', ...defaultTheme.fontFamily.sans],
        koara: ['Koara', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
