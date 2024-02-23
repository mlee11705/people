import { SiteHeader } from "@/components/site-header"

interface LayoutProps {
  children: React.ReactNode
}

// this is the main layout function where everything is passed into it, but contains the header it passed in
export function Layout({ children }: LayoutProps) {
  return (
    <>
      <SiteHeader />
      <main>{children}</main>
    </>
  )
}
