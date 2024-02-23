import { NavItem } from "@/types/nav"

type SiteConfig = {
  name: string
  description: string
  mainNav: NavItem[]
  links: {
    twitter: string
    github: string
    cvsite: string
    docs: string
  }
}

export const siteConfig: SiteConfig = {
  name: "",
  description: "Cerebral Valley",
  mainNav: [
    {
      title: "",
      href: "/",
    },
  ],
  links: {
    twitter: "https://twitter.com/cerebral_valley",
    github: "https://github.com/cerebralvalley",
    cvsite: "https://cerebralvalley.ai",
    docs: "https://ui.shadcn.com",
  },
}
