const { light, dark } = require('@charcoal-ui/theme')
const { createTailwindConfig } = require('@charcoal-ui/tailwind-config')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // デフォルトのTailwindのclassが効かないのはコイツのせい
  // presets: [
  //   createTailwindConfig({
  //     version: 'v3',
  //     theme: {
  //       ':root': light,
  //     },
  //   }),
  // ],
  theme: {
    extend: {
      colors: {
        primary: '#856292',
        'primary-hover': '#8E76A1',
        'primary-press': '#988BB0',
        'primary-disabled': '#6F48694D',
        secondary: '#FF617F',
        'secondary-hover': '#FF849B',
        'secondary-press': '#FF9EB1',
        'secondary-disabled': '#FF617F4D',
        base: '#FBE2CA',
        'text-primary': '#514062',

        // トースト用のより鮮明な色定義
        'toast-info': '#007BFF',
        'toast-info-hover': '#0056B3',
        'toast-error': '#DC3545',
        'toast-error-hover': '#BD2130',
        'toast-success': '#28A745',
        'toast-success-hover': '#218838',
      },
      fontSize: {
        12: ['12px', { lineHeight: '18px', letterSpacing: '0' }],
        14: ['14px', { lineHeight: '22px', letterSpacing: '0' }],
        16: ['16px', { lineHeight: '24px', letterSpacing: '0' }],
        20: ['20px', { lineHeight: '30px', letterSpacing: '0' }],
        32: ['32px', { lineHeight: '48px', letterSpacing: '0' }],
      },
      spacing: {
        4: '4px',
        8: '8px',
        16: '16px',
        24: '24px',
        40: '40px',
        64: '64px',
        104: '104px',
        168: '168px',
        272: '272px',
        440: '440px',
      },
      borderRadius: {
        4: '4px',
        8: '8px',
        16: '16px',
        24: '24px',
        none: '0',
        oval: '999999px',
      },
      screens: {
        screen1: '0px',
        screen2: '744px',
        screen3: '952px',
        screen4: '1160px',
        screen5: '1368px',
      },

      // width設定を追加
      width: {
        'col-span-1': '80px',
        'col-span-2': '184px',
        'col-span-3': '288px',
        'col-span-4': '392px',
        'col-span-5': '496px',
        'col-span-6': '600px',
        'col-span-7': '704px',
        'col-span-8': '808px',
        'col-span-9': '912px',
        'col-span-10': '1016px',
        'col-span-11': '1120px',
        'col-span-12': '1224px',
        '1/12': '8.333333333333332%',
        '2/12': '16.666666666666664%',
        '3/12': '25%',
        '4/12': '33.33333333333333%',
        '5/12': '41.66666666666667%',
        '6/12': '50%',
        '7/12': '58.333333333333336%',
        '8/12': '66.66666666666666%',
        '9/12': '75%',
        '10/12': '83.33333333333334%',
        '11/12': '91.66666666666666%',
      },

      // gap設定を追加
      gap: {
        fixed: '24px',
      },

      // transitionDuration設定を修正
      transitionDuration: {
        DEFAULT: '0.2s',
      },
      zIndex: {
        5: '5',
        15: '15',
      },
    },
  },
  // lineHeightを無効化
  corePlugins: {
    lineHeight: false,
  },
  plugins: [require('@tailwindcss/line-clamp'), require('@tailwindcss/forms')],
}
