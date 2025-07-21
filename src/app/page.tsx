'use client';

import { useState, useEffect } from 'react';
import PortfolioDatabase from '@/components/PortfolioDatabase';
import { Portfolio } from '@/lib/schema';

export default function Home() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPortfolios() {
      try {
        const response = await fetch('/api/portfolios');
        if (!response.ok) {
          throw new Error('Failed to fetch portfolios');
        }
        const data = await response.json();
        setPortfolios(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchPortfolios();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Loading Portfolio Database
          </h1>
          <p className="text-gray-600">
            Fetching data from Supabase...
          </p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-red-600 mb-2">
            Error Loading Data
          </h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-blue-50">
      {/* Top Header with user info - Light Blue */}
      <div className="bg-blue-200 text-white p-4">
        <div className="flex justify-end">
          <div className="flex items-center space-x-3">
                         <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
               <span className="text-sm font-medium text-blue-500">DC</span>
             </div>
            <div className="text-right">
              <div className="text-sm font-medium">Devanshi Chitalia</div>
              <div className="text-xs text-white">Owner</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <PortfolioDatabase portfolios={portfolios} />
      </div>
    </main>
  );
}
