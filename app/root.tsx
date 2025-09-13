import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';

import '@/styles/global.css';

import { Header } from './components/header';
import { ClientProvider } from './providers/query-client-provider';

export const Layout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en" className="dark">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <Meta />
      <Links />
    </head>
    <body>
      <ClientProvider>
        <Header />
        <main>{children}</main>
      </ClientProvider>
      <ScrollRestoration />
      <Scripts />
    </body>
  </html>
);

const App = () => <Outlet />;

export default App;
