import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    
    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase environment variables');
      return NextResponse.json({ error: 'Configuration error' }, { status: 500 });
    }
    
    console.log('Creating Supabase client...');
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    console.log('Fetching portfolios from Supabase...');
    
    // Add timeout to prevent hanging
    const fetchWithTimeout = Promise.race([
      supabase
        .from('portfolios')
        .select('*')
        .limit(500),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout')), 10000)
      )
    ]);
    
    const { data: portfolioData, error } = await fetchWithTimeout as any;
    
    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Failed to fetch portfolios' }, { status: 500 });
    }
    
    console.log(`Fetched ${portfolioData?.length || 0} portfolios`);
    
    // Transform snake_case to camelCase to match component expectations
    const transformedData = portfolioData?.map((portfolio: any) => ({
      id: portfolio.id,
      memberName: portfolio.member_name,
      username: portfolio.username,
      numPortfolios: portfolio.num_portfolios,
      idVerification: portfolio.id_verification,
      portfolioVerification: portfolio.portfolio_verification,
      location: portfolio.location,
      sizeKB: portfolio.size_kb,
      subscription: portfolio.subscription,
      createdAt: portfolio.created_at,
      updatedAt: portfolio.updated_at,
    }));
    
    return NextResponse.json(transformedData);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Failed to fetch portfolios' 
    }, { status: 500 });
  }
} 