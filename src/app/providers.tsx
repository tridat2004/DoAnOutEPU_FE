import type { PropsWithChildren } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { queryClient } from './query-client'
import { AuthBootstrap } from '../components/common/auth.boostrap'

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthBootstrap>{children}</AuthBootstrap>
      </BrowserRouter>
    </QueryClientProvider>
  )
}