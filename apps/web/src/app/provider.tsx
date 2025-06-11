'use client';
import { ReactNode } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <SidebarProvider>
          <div className="md:hidden block">
            <SidebarTrigger />
          </div>
          {children}
        </SidebarProvider>
      </ThemeProvider>
    </ClerkProvider>
  );
};