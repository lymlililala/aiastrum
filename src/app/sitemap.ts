import { type MetadataRoute } from "next";

const BASE_URL = "https://aiastrum.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "/",              priority: 1.0,  changeFrequency: "daily"   },
    { path: "/tarot",         priority: 0.9,  changeFrequency: "weekly"  },
    { path: "/horoscope",     priority: 0.9,  changeFrequency: "daily"   },
    { path: "/daily-fortune", priority: 0.9,  changeFrequency: "daily"   },
    { path: "/daily-card",    priority: 0.8,  changeFrequency: "daily"   },
    { path: "/bazi",          priority: 0.8,  changeFrequency: "weekly"  },
    { path: "/ziwei",         priority: 0.8,  changeFrequency: "weekly"  },
    { path: "/astro",         priority: 0.8,  changeFrequency: "weekly"  },
    { path: "/synastry",      priority: 0.8,  changeFrequency: "weekly"  },
    { path: "/love",          priority: 0.8,  changeFrequency: "weekly"  },
    { path: "/naming",        priority: 0.8,  changeFrequency: "weekly"  },
    { path: "/numerology",    priority: 0.7,  changeFrequency: "weekly"  },
    { path: "/mbti",          priority: 0.7,  changeFrequency: "weekly"  },
    { path: "/dream",         priority: 0.7,  changeFrequency: "weekly"  },
    { path: "/face-reading",  priority: 0.7,  changeFrequency: "weekly"  },
    { path: "/meihua",        priority: 0.7,  changeFrequency: "weekly"  },
    { path: "/qimen",         priority: 0.7,  changeFrequency: "weekly"  },
    { path: "/wuge",          priority: 0.7,  changeFrequency: "weekly"  },
    { path: "/rune",          priority: 0.7,  changeFrequency: "weekly"  },
    { path: "/lingqian",      priority: 0.7,  changeFrequency: "weekly"  },
    { path: "/almanac",       priority: 0.7,  changeFrequency: "daily"   },
    { path: "/pet-psychic",   priority: 0.6,  changeFrequency: "weekly"  },
    { path: "/ai-mystic",     priority: 0.8,  changeFrequency: "weekly"  },
  ] as const;

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
