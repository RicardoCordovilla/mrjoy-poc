import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AxiosInterceptor } from './utils/api/interceptors/axios.interceptors.tsx'

import TimeAgo from 'javascript-time-ago'

import es from 'javascript-time-ago/locale/es'

TimeAgo.addDefaultLocale(es)
TimeAgo.addLocale(es)

AxiosInterceptor();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
)
