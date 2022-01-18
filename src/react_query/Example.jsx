import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import Provider from './Provider'
import QuickStart from './QuickStart'

const queryClient = new QueryClient()

export default function Example() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider />
      <QuickStart />
    </QueryClientProvider>
  )
}
