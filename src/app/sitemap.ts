import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://hitaxidallas.com/",
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}