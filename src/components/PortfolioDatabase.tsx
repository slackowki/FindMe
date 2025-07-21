'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, ChevronDown } from 'lucide-react';
import { Portfolio } from '@/lib/schema';

interface PortfolioDatabaseProps {
  portfolios: Portfolio[];
}

export default function PortfolioDatabase({ portfolios }: PortfolioDatabaseProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredPortfolios, setFilteredPortfolios] = useState<Portfolio[]>(portfolios);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showAllPortfolios, setShowAllPortfolios] = useState(true);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [pageInput, setPageInput] = useState('');
  const itemsPerPage = 10;

  useEffect(() => {
    const filtered = portfolios.filter(portfolio =>
      portfolio.memberName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      portfolio.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      portfolio.location?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPortfolios(filtered);
    setCurrentPage(1);
  }, [searchTerm, portfolios]);

  const totalPages = Math.ceil(filteredPortfolios.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPortfolios = filteredPortfolios.slice(startIndex, startIndex + itemsPerPage);

  const getVerificationBadge = (status: string, type: 'id' | 'portfolio') => {
    const baseClasses = 'px-3 py-1 rounded-full text-xs font-medium';
    
    if (type === 'id') {
      if (status === 'Verified') {
        return `${baseClasses} bg-blue-100 text-blue-700`;
      } else if (status === 'In Progress') {
        return `${baseClasses} bg-blue-50 text-blue-600`;
      } else {
        return `${baseClasses} bg-blue-50 text-blue-600`;
      }
    } else {
      if (status === 'Verified') {
        return `${baseClasses} bg-blue-100 text-blue-700`;
      } else if (status === 'In Progress') {
        return `${baseClasses} bg-blue-50 text-blue-600`;
      } else {
        return `${baseClasses} bg-blue-900 text-white`;
      }
    }
  };

  const getSubscriptionBadge = (subscription: string) => {
    return 'px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 bg-blue-50">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Portfolio Database</h1>
        {!isCollapsed && (
          <div className="flex items-center justify-between">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Type to Search"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm w-80 bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <button 
                  onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                  className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium flex items-center space-x-2 hover:bg-gray-800"
                >
                  <span>All Portfolios</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {showFilterDropdown && (
                  <div className="absolute top-full mt-2 left-0 bg-white border border-gray-300 rounded-lg shadow-lg z-10 w-48">
                    <div className="p-2">
                      <button 
                        onClick={() => {
                          setFilteredPortfolios(portfolios);
                          setShowFilterDropdown(false);
                        }}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded"
                      >
                        All Portfolios
                      </button>
                      <button 
                        onClick={() => {
                          const verified = portfolios.filter(p => (p.idVerification || 'Not verified') === 'Verified');
                          setFilteredPortfolios(verified);
                          setShowFilterDropdown(false);
                        }}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded"
                      >
                        Verified Only
                      </button>
                      <button 
                        onClick={() => {
                          const premium = portfolios.filter(p => (p.subscription || 'No Subscription') === 'Premium');
                          setFilteredPortfolios(premium);
                          setShowFilterDropdown(false);
                        }}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded"
                      >
                        Premium Only
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <button 
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className="p-2 border border-gray-300 rounded-lg text-gray-600 hover:text-gray-800 hover:bg-gray-50 bg-white"
              >
                <Filter className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 bg-white flex items-center space-x-2"
              >
                <span>Collapse</span>
                <span className="text-sm">→</span>
              </button>
            </div>
          </div>
        )}
        {isCollapsed && (
          <div className="flex justify-end">
            <button 
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 bg-white flex items-center space-x-2"
            >
              <span>Expand</span>
              <span className="text-sm">←</span>
            </button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Member Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Username
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                No. Of Portfolios
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID Verification
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Portfolio Verification
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Size
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subscription
              </th>
            </tr>
          </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
              {paginatedPortfolios.map((portfolio, index) => (
                <tr key={portfolio.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <button className="w-5 h-5 flex items-center justify-center mr-2 text-gray-400 hover:text-gray-600 text-sm">
                        +
                      </button>
                      <div className="w-7 h-7 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                        <span className="text-xs font-medium text-gray-700">
                          {portfolio.memberName?.charAt(0) || 'N'}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {portfolio.memberName || 'No Name'}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {portfolio.username || 'No Username'}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 text-center">
                    {portfolio.numPortfolios || 0}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={getVerificationBadge(portfolio.idVerification || 'Not verified', 'id')}>
                      {portfolio.idVerification || 'Not verified'}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={getVerificationBadge(portfolio.portfolioVerification || 'Not verified', 'portfolio')}>
                      {portfolio.portfolioVerification || 'Not verified'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 max-w-48 truncate">
                    {portfolio.location || 'No Location'}
                  </td>
                   <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {portfolio.sizeKB ? parseFloat(portfolio.sizeKB).toLocaleString() : '0'} KB
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={getSubscriptionBadge(portfolio.subscription || 'No Subscription')}>
                      {portfolio.subscription || 'No Subscription'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      {/* Pagination */}
      <div className="flex items-center justify-center py-4 border-t border-gray-200 bg-white">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ‹
          </button>
          
          {Array.from({ length: Math.min(4, totalPages) }, (_, i) => {
            const page = i + 1;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-2 text-sm rounded ${
                  currentPage === page
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            );
          })}
          
          {totalPages > 4 && (
            <>
              <span className="px-2 text-gray-500">...</span>
              <button
                onClick={() => setCurrentPage(totalPages)}
                className={`px-3 py-2 text-sm rounded ${
                  currentPage === totalPages
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {totalPages}
              </button>
            </>
          )}
          
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ›
          </button>
          
          <div className="ml-4 flex items-center space-x-2">
            <input
              type="number"
              min="1"
              max={totalPages}
              placeholder={totalPages.toString()}
              className="w-16 px-2 py-1 text-sm border border-gray-300 rounded text-center"
              value={pageInput}
              onChange={(e) => setPageInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  const page = parseInt(pageInput);
                  if (page >= 1 && page <= totalPages) {
                    setCurrentPage(page);
                    setPageInput('');
                  }
                }
              }}
            />
            <span className="text-sm text-gray-500">/Page</span>
          </div>
        </div>
      </div>
    </div>
  );
} 