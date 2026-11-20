import type { MetadataRoute } from "next"
import { OUR_STORY_AVAILABLE } from "@/lib/our-story-config"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.madrastrails.in"

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/destinations`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/experiences`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
    },
    ...(OUR_STORY_AVAILABLE ? [{
      url: `${baseUrl}/our-story`,
      lastModified: new Date(),
    }] : []),
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/plan`,
      lastModified: new Date(),
    },
  ]
}
