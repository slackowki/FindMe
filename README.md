# Portfolio Database Dashboard

A Next.js application that displays portfolio data from a CSV dataset in a responsive, searchable table interface. Built as part of a full-stack developer interview assessment.

## 🚀 Quick Start

To run this application locally:

```bash

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start the development server
npm run dev
```

The application will be available at `http://localhost:3000`

## 📋 Project Overview

This project implements a single-page portfolio database dashboard that:
- Displays portfolio data in a searchable, filterable table
- Includes pagination with direct page navigation
- Shows verification status with color-coded badges
- Provides collapsible interface elements
- Matches the provided Figma design pixel-perfectly

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Utilities**: clsx, tailwind-merge

### Backend & Database
- **Database**: Supabase (PostgreSQL)
- **API**: Next.js API Routes
- **Client**: Supabase JavaScript SDK

### Data Processing
- **CSV Parsing**: csv-parse
- **Data Import**: Custom TypeScript script

## 🏗 Development Approach

### 1. Database Setup
- Used Supabase as the PostgreSQL database provider
- Created a `portfolios` table schema matching the CSV structure
- Implemented a CSV import script to populate the database with the provided dataset

### 2. API Layer
- Built a Next.js API route (`/api/portfolios`) to fetch data from Supabase
- Used Supabase client for secure, read-only database access
- Implemented error handling and response formatting

### 3. Frontend Implementation
- Created a responsive `PortfolioDatabase` component with full table functionality
- Implemented client-side data fetching with loading and error states
- Added search, filtering, pagination, and collapsible interface features
- Styled components to match the Figma design specifications exactly

### 4. State Management
- Used React's built-in `useState` and `useEffect` for local state management
- Managed pagination, search, filters, and UI state within the main component

## 🎯 Key Features

- **Search**: Real-time search across member names and usernames
- **Filtering**: Filter by verification status and subscription type
- **Pagination**: Navigate through pages with direct page input
- **Responsive Design**: Optimized for desktop and laptop viewing
- **Verification Badges**: Color-coded status indicators
- **Collapsible Interface**: Hide/show search and filter controls
- **Data Visualization**: Clean table layout with proper data formatting

## 📊 Data Structure

The application processes a CSV dataset with the following fields:
- Member Name
- Username  
- Number of Portfolios
- ID Verification Status
- Portfolio Verification Status
- Location
- Size (KB)
- Subscription Type

## 🔧 Configuration

### Environment Variables
The application uses the following environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

These are already configured in `.env.example` with working demo credentials.

## 📝 Assumptions Made

1. **Data Access**: The Supabase database contains the imported CSV data and is accessible via the provided credentials
2. **Browser Compatibility**: Targeting modern browsers with JavaScript enabled
3. **Screen Size**: Optimized primarily for desktop/laptop viewing (1024px+)
4. **Data Volume**: Limited to 500 records for optimal performance
5. **Read-Only Access**: Application only needs to display data, no CRUD operations required

## 🐛 Known Issues & Limitations

1. **Mobile Responsiveness**: The table layout is optimized for desktop viewing and may not be ideal on mobile devices
2. **Search Performance**: Search is performed client-side, which may impact performance with larger datasets
3. **Data Refresh**: Data is fetched once on page load; no real-time updates or refresh mechanism
4. **Accessibility**: Basic accessibility features implemented; could be enhanced for screen readers
5. **Error Boundaries**: Limited error boundary implementation for production robustness

## 🧪 Testing Approach

### Manual Testing Performed
- **Functionality**: Verified all interactive elements (search, filters, pagination)
- **Data Display**: Confirmed accurate data rendering and formatting
- **Responsive Layout**: Tested on different screen sizes and zoom levels
- **Error Handling**: Tested API failure scenarios and loading states
- **Browser Testing**: Verified compatibility across Chrome, Firefox, and Safari

### Test Cases Covered
1. **Data Loading**: Application loads and displays portfolio data correctly
2. **Search Functionality**: Search filters results in real-time
3. **Pagination**: Navigation between pages works correctly
4. **Filtering**: "Verified Only" and "Premium Only" filters work as expected
5. **UI Interactions**: Collapse button toggles search bar visibility
6. **Error States**: Graceful handling of API errors and loading states

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── api/portfolios/route.ts    # API endpoint
│   │   ├── globals.css                # Global styles
│   │   └── page.tsx                   # Main page component
│   ├── components/
│   │   └── PortfolioDatabase.tsx      # Main dashboard component
│   └── lib/
│       └── supabase.ts                # Supabase client config
├── .env.example                       # Environment variables template
├── package.json                       # Dependencies and scripts
└── tailwind.config.js                # Tailwind configuration
```

## 🚀 Deployment

This application is ready for deployment on platforms like Vercel, Netlify, or any Node.js hosting provider. The Supabase database is already configured and populated with the required data.