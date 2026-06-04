import { Brain, Zap, Database, Code, Cloud, BarChart2 } from 'lucide-react'

export const skillsData = [
  {
    icon: Code,
    category: 'Programming',
    skills: [
      { name: 'Python', percentage: 92 },
      { name: 'SQL', percentage: 82 },
      { name: 'R', percentage: 78 },
      { name: 'Bash', percentage: 65 },
      { name: 'Java', percentage: 60 },
    ],
  },
  {
    icon: Brain,
    category: 'AI & Machine Learning',
    skills: [
      { name: 'Scikit-learn', percentage: 85 },
      { name: 'XGBoost', percentage: 88 },
      { name: 'SHAP / XAI', percentage: 80 },
      { name: 'TensorFlow', percentage: 72 },
      { name: 'Adversarial ML', percentage: 75 },
    ],
  },
  {
    icon: Zap,
    category: 'LLM Engineering',
    skills: [
      { name: 'Prompt Engineering', percentage: 85 },
      { name: 'Claude API', percentage: 82 },
      { name: 'FastAPI', percentage: 80 },
      { name: 'LangChain', percentage: 78 },
      { name: 'LangGraph', percentage: 72 },
    ],
  },
  {
    icon: Database,
    category: 'Data Engineering',
    skills: [
      { name: 'Pandas / NumPy', percentage: 90 },
      { name: 'PostgreSQL', percentage: 80 },
      { name: 'PySpark', percentage: 75 },
      { name: 'Apache Kafka', percentage: 70 },
      { name: 'Cassandra', percentage: 68 },
    ],
  },
  {
    icon: Cloud,
    category: 'Cloud & Big Data',
    skills: [
      { name: 'Google Cloud Platform', percentage: 75 },
      { name: 'PySpark', percentage: 75 },
      { name: 'Hadoop / Hive', percentage: 70 },
      { name: 'MapReduce', percentage: 65 },
      { name: 'AWS Fundamentals', percentage: 60 },
    ],
  },
  {
    icon: BarChart2,
    category: 'Visualisation & Reporting',
    skills: [
      { name: 'R Markdown', percentage: 80 },
      { name: 'Power BI', percentage: 78 },
      { name: 'Streamlit', percentage: 75 },
      { name: 'Tableau', percentage: 72 },
      { name: 'Plotly / Dash', percentage: 70 },
    ],
  },
]
