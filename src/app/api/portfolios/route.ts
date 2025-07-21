import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    const { data: portfolioData, error } = await supabase
      .from('portfolios')
      .select('*')
      .limit(500);
    
    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Failed to fetch portfolios' }, { status: 500 });
    }
    
    // Transform snake_case to camelCase to match component expectations
    const transformedData = portfolioData?.map(portfolio => ({
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
    return NextResponse.json({ error: 'Failed to fetch portfolios' }, { status: 500 });
  }
} 