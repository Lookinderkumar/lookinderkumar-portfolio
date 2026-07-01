export type Project = {
  id: string
  title: string
  category: string
  badge?: string
  featured?: boolean
  comingSoon?: boolean
  description: string
  techStack: string[]
  githubUrl?: string
  paperUrl?: string
  demoUrl?: string
  imageUrl?: string
  initial: string
}

export const projects: Project[] = [
  {
    id: 'adversarial-xai-fraud',
    title: 'Adversarially Robust XAI for Fraud Detection',
    category: 'Research',
    badge: 'MSc Thesis',
    featured: true,
    description: 'Full dissertation investigating how XGBoost fraud detection models fail under adversarial attacks (FGSM, PGD, HopSkipJump) and how SHAP explanations invert under those attacks. Mapped to EU AI Act 2024 compliance.',
    techStack: ['Python', 'XGBoost', 'SHAP', 'IBM ART', 'Scikit-learn', 'Adversarial ML'],
    githubUrl: 'https://github.com/Lookinderkumar/fraud-xai-adversarial',
    imageUrl: '/projects/adversarial_xai_fraud_poster.png',
    initial: 'A',
  },
  {
    id: 'realtime-fraud-swift',
    title: 'Real-Time Fraud Detection — SWIFT/SEPA Payments',
    category: 'FinTech',
    badge: 'Applied Project',
    featured: true,
    description: 'End-to-end pipeline detecting fraud in high-value cross-border SWIFT and SEPA transactions. Hybrid ML detection with SHAP-based reason codes, FastAPI serving, Kafka streaming, and live Streamlit dashboard.',
    techStack: ['Python', 'FastAPI', 'Kafka', 'XGBoost', 'SHAP', 'Streamlit'],
    githubUrl: 'https://github.com/Lookinderkumar/fraud-xborder',
    imageUrl: '/projects/swift_sepa_fraud_poster.png',
    initial: 'R',
  },
  {
    id: 'fintech-market-intelligence',
    title: 'AI-Powered FinTech Market Intelligence',
    category: 'Data Mining',
    badge: 'Research Paper',
    description: 'IEEE-format research paper applying K-Means clustering, ARIMA forecasting, and country-level benchmarking to the European FinTech ecosystem. Forecasts funding stabilising at ~$241M/year.',
    techStack: ['Python', 'K-Means', 'ARIMA', 'Scikit-learn', 'Pandas', 'Streamlit'],
    githubUrl: 'https://github.com/Lookinderkumar/fintech-market-intelligence',
    imageUrl: '/projects/fintech-market-intelligence-poster.png',
    initial: 'F',
  },
  {
    id: 'big-data-streaming',
    title: 'Real-Time Big Data Streaming Pipeline',
    category: 'Data Engineering',
    description: 'Kappa-style big data architecture for Transport Infrastructure Ireland M50 traffic data. Emulates real-time streams from CSV, ingests to Apache Kafka, processes with PySpark Structured Streaming, persists to Cassandra.',
    techStack: ['Apache Kafka', 'PySpark', 'Cassandra', 'Python', 'Structured Streaming'],
    githubUrl: 'https://github.com/Lookinderkumar/realtime-traffic-streaming-pipeline',
    imageUrl: '/projects/streaming-pipeline-poster.png',
    initial: 'B',
  },
  {
    id: 'diamond-price-prediction',
    title: 'Diamond Price Prediction & Cut Classification',
    category: 'Statistical ML',
    description: 'End-to-end data science pipeline in R on 50,000+ diamond records. Multiple linear regression (Adjusted R² = 0.9207). Cut quality classification: kNN (66%), C5.0 Decision Tree (76.14%), ANN (74.37%).',
    techStack: ['R', 'tidyverse', 'ggplot2', 'kNN', 'C5.0', 'ANN', 'R Markdown'],
    githubUrl: 'https://github.com/Lookinderkumar/diamond-price-prediction',
    imageUrl: '/projects/diamond-prediction-poster.png',
    initial: 'D',
  },
  {
    id: 'brain-tumor-detection',
    title: 'Brain Tumor Detection & Segmentation — SIYO',
    category: 'Computer Vision',
    badge: 'Published',
    description: 'IEEE ASPCC 2024 peer-reviewed publication. Proposes the SIYO scheme integrating Meta SAM with YOLOv9 for MRI brain tumour detection. mAP@0.5 = 0.947, accuracy = 0.94.',
    techStack: ['Python', 'YOLOv9', 'SAM', 'Computer Vision', 'Medical Imaging'],
    paperUrl: 'https://doi.org/10.1109/ASPCC62191.2024.10881978',
    initial: 'B',
  },
  {
    id: 'infraos',
    title: 'InfraOS — AI-Native Construction Management',
    category: 'LLM Engineering',
    badge: 'In Development',
    comingSoon: true,
    description: 'An AI-native SaaS platform for construction project management. Uses LangChain, LangGraph, and the Claude API to automate scheduling, risk flagging, and stakeholder reporting.',
    techStack: ['LangChain', 'LangGraph', 'Claude API', 'FastAPI', 'PostgreSQL', 'Next.js'],
    initial: 'I',
  },
]

export const filterCategories = ['All', 'Research', 'FinTech', 'Data Engineering', 'Computer Vision', 'Statistical ML', 'LLM Engineering']
