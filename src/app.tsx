import 'src/global.css'

import React, { useEffect } from 'react'
import { NuqsAdapter } from 'nuqs/adapters/react-router/v7'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { usePathname } from 'src/routes/hooks'

import { LocalizationProvider } from 'src/locales'
import { themeConfig, ThemeProvider } from 'src/theme'
import { I18nProvider } from 'src/locales/i18n-provider'

import { Snackbar } from 'src/components/snackbar'
import { ProgressBar } from 'src/components/progress-bar'
import { MotionLazy } from 'src/components/animate/motion-lazy'
import { SettingsDrawer, defaultSettings, SettingsProvider } from 'src/components/settings'

import { CheckoutProvider } from 'src/sections/checkout/context'

import { AuthProvider } from 'src/auth/context/jwt'

// import { AuthProvider as Auth0AuthProvider } from 'src/auth/context/auth0'
// import { AuthProvider as AmplifyAuthProvider } from 'src/auth/context/amplify'
// import { AuthProvider as SupabaseAuthProvider } from 'src/auth/context/supabase'
// import { AuthProvider as FirebaseAuthProvider } from 'src/auth/context/firebase'

// ----------------------------------------------------------------------

// const AuthProvider =
//   (CONFIG.auth.method === 'amplify' && AmplifyAuthProvider) ||
//   (CONFIG.auth.method === 'firebase' && FirebaseAuthProvider) ||
//   (CONFIG.auth.method === 'supabase' && SupabaseAuthProvider) ||
//   (CONFIG.auth.method === 'auth0' && Auth0AuthProvider) ||
//   JwtAuthProvider;

// ----------------------------------------------------------------------

type AppProps = {
  children: React.ReactNode;
};

export default function App({ children }: AppProps) {
  useScrollToTop();

  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        <I18nProvider>
          <AuthProvider>
            <SettingsProvider defaultSettings={defaultSettings}>
              <LocalizationProvider>
                <ThemeProvider
                  modeStorageKey={themeConfig.modeStorageKey}
                  defaultMode={themeConfig.defaultMode}
                >
                  <MotionLazy>
                    <CheckoutProvider>
                      <Snackbar />
                      <ProgressBar />
                      <SettingsDrawer defaultSettings={defaultSettings} />
                      {children}
                    </CheckoutProvider>
                  </MotionLazy>
                </ThemeProvider>
              </LocalizationProvider>
            </SettingsProvider>
          </AuthProvider>
        </I18nProvider>
      </NuqsAdapter>
    </QueryClientProvider>
  );
}

// ----------------------------------------------------------------------

function useScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
