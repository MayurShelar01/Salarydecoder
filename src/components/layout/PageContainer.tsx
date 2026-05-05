import type { PropsWithChildren } from 'react'

export function PageContainer({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-[#F4F4EF]">
      <div className="container mx-auto px-4 py-8 max-w-[1200px]">
        {children}
      </div>
    </div>
  )
}
