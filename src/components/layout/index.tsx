import { ThemedLayoutContextProvider } from '@refinedev/antd'
import { Grid, Layout } from 'antd'
import React from 'react'

import { RefineThemedLayoutV2Props } from './types'
import { Header } from '../header'
interface MainLayoutContextType {
  currentLocationName?: string
  setCurrentLocationName: (location: string) => void
}
const MainLayoutContext = React.createContext<MainLayoutContextType | undefined>(undefined)

export const useMainLayoutContext = () => {
  const context = React.useContext(MainLayoutContext)
  if (context === undefined) {
    throw new Error('useMainLayoutContext must be used within a MainLayoutContextProvider')
  }
  return context
}

interface MainLayoutContextProviderProps {
  children: React.ReactNode
}

export const MainLayoutContextProvider: React.FC<MainLayoutContextProviderProps> = ({ children }) => {
  const [currentLocationName, setCurrentLocationName] = React.useState<string | undefined>(undefined)

  return (
    <MainLayoutContext.Provider value={{ currentLocationName, setCurrentLocationName }}>
      {children}
    </MainLayoutContext.Provider>
  )
}

export const MainLayout: React.FC<RefineThemedLayoutV2Props> = ({ children, initialSiderCollapsed }) => {
  const breakpoint = Grid.useBreakpoint()

  return (
    <ThemedLayoutContextProvider initialSiderCollapsed={initialSiderCollapsed}>
      <MainLayoutContextProvider>
        <Layout style={{ minHeight: '100vh' }} hasSider>
          <Layout>
            <Header />
            <Layout.Content>
              <div style={{ padding: 24 }}>{children}</div>
            </Layout.Content>
          </Layout>
        </Layout>
      </MainLayoutContextProvider>
    </ThemedLayoutContextProvider>
  )
}
