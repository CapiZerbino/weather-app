import { Refine } from '@refinedev/core'
import { DevtoolsPanel, DevtoolsProvider } from '@refinedev/devtools'
import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar'

import { ErrorComponent, useNotificationProvider } from '@refinedev/antd'
import '@refinedev/antd/dist/reset.css'

import routerBindings, {
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier
} from '@refinedev/react-router-v6'
import dataProvider from '@refinedev/simple-rest'
import { App as AntdApp } from 'antd'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import { AppIcon } from './components/app-icon'
import { ColorModeContextProvider } from './contexts/color-mode'

import { WeatherList } from './pages/weathers'
import { API_URL } from './constant'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import { HistoryList } from './pages/histories'
import { MainLayout } from './components/layout'
dayjs.extend(localizedFormat)

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <AntdApp>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider(API_URL)}
                notificationProvider={useNotificationProvider}
                routerProvider={routerBindings}
                resources={[
                  {
                    name: 'weather',
                    list: '/weather'
                  },
                  {
                    name: 'history',
                    list: '/history'
                  }
                ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: 'FAZLcV-QKNBPz-aiqbAr',
                  title: { text: 'Weather App', icon: <AppIcon /> }
                }}
              >
                <Routes>
                  <Route
                    element={
                      <MainLayout>
                        <Outlet />
                      </MainLayout>
                    }
                  >
                    <Route index element={<NavigateToResource resource='weather' />} />
                    <Route path='/weather'>
                      <Route index element={<WeatherList />} />
                    </Route>
                    <Route path='/history'>
                      <Route index element={<HistoryList />} />
                    </Route>

                    <Route path='*' element={<ErrorComponent />} />
                  </Route>
                </Routes>
                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </AntdApp>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  )
}

export default App
