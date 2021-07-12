import React, { FC } from "react";
import { AppProps } from "next/app";
import enTranslations from "@shopify/polaris/locales/en.json";
import { AppProvider } from "@shopify/polaris";

import '@shopify/polaris/dist/styles.css';

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <AppProvider i18n={enTranslations}>
    <Component {...pageProps} />
  </AppProvider>
);

export default App;
