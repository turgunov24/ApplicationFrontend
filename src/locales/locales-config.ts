import type { InitOptions } from 'i18next';
import type { Theme, Components } from '@mui/material/styles';

import HttpBackend from 'i18next-http-backend';

// MUI Core Locales
import {
  // frFR as frFRCore,
  // viVN as viVNCore,
  // zhCN as zhCNCore,
  arSA as arSACore,
  ruRU as ruRUCore,
} from '@mui/material/locale';
// MUI Date Pickers Locales
import {
  enUS as enUSDate,
  // frFR as frFRDate,
  // viVN as viVNDate,
  // zhCN as zhCNDate,
  ruRU as ruRUDate,
} from '@mui/x-date-pickers/locales';
// MUI Data Grid Locales
import {
  enUS as enUSDataGrid,
  // frFR as frFRDataGrid,
  // viVN as viVNDataGrid,
  // zhCN as zhCNDataGrid,
  ruRU as ruRUDataGrid,
  arSD as arSDDataGrid,
} from '@mui/x-data-grid/locales';

import { CONFIG } from 'src/global-config';

import { useAuthStore } from 'src/auth/store';

// ----------------------------------------------------------------------

// Supported languages
// export const supportedLngs = ['en', 'ar', 'uz', 'uz-Cyrl'] as const;
export const supportedLngs = ['en', 'ar', 'uz', 'ru'] as const;
export type LangCode = (typeof supportedLngs)[number];

// Fallback and default namespace
export const fallbackLng: LangCode = 'uz';
export const defaultNS = 'common';

// Storage config
export const storageConfig = {
  cookie: { key: 'i18next', autoDetection: false },
  localStorage: { key: 'i18nextLng', autoDetection: false },
} as const;

// ----------------------------------------------------------------------

/**
 * @countryCode https://flagcdn.com/en/codes.json
 * @adapterLocale https://github.com/iamkun/dayjs/tree/master/src/locale
 * @numberFormat https://simplelocalize.io/data/locales/
 */

export type LangOption = {
  value: LangCode;
  label: string;
  countryCode: string;
  adapterLocale?: string;
  numberFormat: { code: string; currency: string };
  systemValue?: { components: Components<Theme> };
};

export const allLangs: LangOption[] = [
  {
    value: 'uz',
    label: "O'zbek",
    countryCode: 'UZ',
    adapterLocale: 'uz', // dayjs/locale/uz — mavjud ✅
    numberFormat: { code: 'uz-UZ', currency: 'UZS' },
    systemValue: {
      components: {
        ...enUSDate.components, // MUI-da uz yo'q → en fallback
        ...enUSDataGrid.components,
      },
    },
  },
  {
    value: 'en',
    label: 'English',
    countryCode: 'GB',
    adapterLocale: 'en',
    numberFormat: { code: 'en-US', currency: 'USD' },
    systemValue: {
      components: { ...enUSDate.components, ...enUSDataGrid.components },
    },
  },
  {
    value: 'ru',
    label: 'Русский',
    countryCode: 'RU',
    adapterLocale: 'ru',
    numberFormat: { code: 'ru-RU', currency: 'RUB' },
    systemValue: {
      components: {
        ...ruRUCore.components,
        ...ruRUDate.components,
        ...ruRUDataGrid.components,
      },
    },
  },
  {
    value: 'ar',
    label: 'Arabic',
    countryCode: 'SA',
    adapterLocale: 'ar-sa',
    numberFormat: { code: 'ar-SA', currency: 'SAR' },
    systemValue: {
      components: { ...arSACore.components, ...arSDDataGrid.components },
    },
  },
];

// ----------------------------------------------------------------------

export const i18nResourceLoader = new HttpBackend();

export function i18nOptions(lang = fallbackLng, namespace = defaultNS): InitOptions {
  return {
    // debug: true,
    supportedLngs,
    fallbackLng,
    lng: lang,
    /********/
    fallbackNS: defaultNS,
    defaultNS,
    ns: namespace,
    backend: {
      loadPath: `${CONFIG.serverUrl}/api/core/references/translations/bundle/{{lng}}/{{ns}}`,
      customHeaders: () => {
        const token = useAuthStore.getState().accessToken;
        return token ? { Authorization: `Bearer ${token}` } : {};
      },
    },
  };
}

export function getCurrentLang(lang?: string): LangOption {
  const fallbackLang = allLangs.find((l) => l.value === fallbackLng) ?? allLangs[0];

  if (!lang) {
    return fallbackLang;
  }

  return allLangs.find((l) => l.value === lang) ?? fallbackLang;
}
