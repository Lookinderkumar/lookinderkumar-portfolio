export type BlogPost = {
  id: string
  slug: string
  title: string
  excerpt: string
  tags: string[]
  date: string
  readTime: string
  featured?: boolean
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'adversarial-attacks-fraud-detection-thesis',
    title: 'Adversarial Attacks on Fraud Detection: What My Thesis Found',
    excerpt: 'My MSc thesis set out to answer a dangerous question: what happens to XGBoost fraud detection models and their SHAP explanations when a sophisticated adversary deliberately crafts transactions to evade detection? The answer was worse than expected.',
    tags: ['Adversarial ML', 'XAI', 'Fraud Detection'],
    date: 'May 2026',
    readTime: '8 min read',
    featured: true,
  },
  {
    id: '2',
    slug: 'shap-explanations-adversarial-instability',
    title: 'Why SHAP Explanations Break Under Adversarial Pressure',
    excerpt: 'The EU AI Act classifies fraud detection systems as high-risk AI. Article 13 requires meaningful explanations. But what if the explanations themselves can be manipulated by the very adversary you\'re trying to detect? This is the regulatory gap my research addresses.',
    tags: ['XAI', 'SHAP', 'EU AI Act', 'Compliance'],
    date: 'May 2026',
    readTime: '6 min read',
  },
  {
    id: '3',
    slug: 'swift-sepa-ai-fraud-detection',
    title: 'SWIFT & SEPA Payments: How AI Can Catch What Rules Miss',
    excerpt: 'Rule-based systems flag what they\'ve seen before. Machine learning models catch what rules miss. But neither alone is enough for high-value cross-border payments where milliseconds and millions are both at stake. Here\'s how I built a hybrid detection pipeline.',
    tags: ['SWIFT', 'SEPA', 'FinTech', 'Fraud'],
    date: 'June 2026',
    readTime: '7 min read',
  },
]

export const blogFilterTags = ['All', 'Adversarial ML', 'XAI', 'Fraud Detection', 'SHAP', 'EU AI Act', 'FinTech', 'SWIFT']
