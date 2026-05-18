# Blackcoffer Data Visualization Dashboard

A comprehensive interactive data visualization dashboard built for **Blackcoffer Consulting** as part of the Visualization Dashboard Test Assignment.

**Live Demo:** https://blackcoffer-dashboard-eight.vercel.app/
---

## 📋 Project Overview

This dashboard visualizes global trends and insights from the provided JSON dataset. It helps users explore key variables such as **Intensity, Likelihood, Relevance, Year, Country, Region, Topics, Sector**, and more through interactive charts and powerful filtering options.

---

## 🛠️ Tech Stack

- **Frontend:** React.js / Next.js (choose whichever you used)
- **Backend:** Node.js + Express / Python FastAPI / Django
- **Database:** MongoDB / Supabase
- **Charts Library:** Chart.js / D3.js / Plotly.js / ApexCharts
- **Styling:** Tailwind CSS / Bootstrap / Material UI
- **Deployment:** Vercel + Render / Railway

---

## ✨ Key Features

- Interactive charts and visualizations
- Real-time filtering system
- Responsive design (Mobile + Desktop friendly)
- Data fetched from MongoDB via APIs
- Multiple chart types (Bar, Line, Pie, Scatter, Treemap, etc.)

### Implemented Filters:
- End Year
- Topics
- Sector
- Region
- PEST Analysis
- Source
- SWOT
- Country
- City
- Intensity, Likelihood & Relevance range filters (Bonus)

---

## 📊 Visualizations Included

- Intensity vs Likelihood Scatter Plot
- Topic-wise Relevance Bar Chart
- Region-wise Distribution (Pie / Treemap)
- Year-wise Trend Analysis (Line Chart)
- Country-wise Impact Analysis
- Sector and PEST Analysis Charts
- Custom creative visualizations for better insights

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js / Python installed
- MongoDB / Supabase account

### Backend Setup
```bash
cd backend
npm install          # or pip install -r requirements.txt
# Add your MongoDB connection string in .env
npm run dev