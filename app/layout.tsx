import './globals.css';
import { Analytics } from '@vercel/analytics/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { AntdRegistry } from '@ant-design/nextjs-registry';
import StoreProvider from '@store/provider/StoreProvider';
import { Navbar } from '../components/Navbar';
import { AuthProvider } from '../context/AuthContext';

export const metadata = {
  title: 'Test for DSNL',
  description: '',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        <StoreProvider>
          <AuthProvider>
            <AntdRegistry>
              <Navbar />
              {children}
              <Analytics />
            </AntdRegistry>
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
