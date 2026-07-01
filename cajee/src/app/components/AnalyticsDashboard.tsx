import { useState, useEffect } from "react";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Eye, 
  MousePointer, 
  Globe, 
  Clock,
  Smartphone,
  Monitor,
  Tablet,
  RefreshCw
} from "lucide-react";
import { Button } from "./ui/button";
import { projectId, publicAnonKey } from "/utils/supabase/info";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";

interface AnalyticsData {
  overview: {
    totalUsers: number;
    totalPageViews: number;
    averageSessionDuration: number;
    bounceRate: number;
    newUsers: number;
    returningUsers: number;
  };
  dailyVisits: Array<{
    date: string;
    users: number;
    pageViews: number;
  }>;
  topPages: Array<{
    page: string;
    views: number;
    avgTime: number;
  }>;
  deviceBreakdown: Array<{
    device: string;
    users: number;
    percentage: number;
  }>;
  trafficSources: Array<{
    source: string;
    users: number;
    percentage: number;
  }>;
  topCountries: Array<{
    country: string;
    users: number;
  }>;
}

interface Props {
  caseStudiesCount: number;
  signupsCount: number;
  publishedCount: number;
}

const COLORS = ['#9333EA', '#EC4899', '#8B5CF6', '#D946EF', '#A855F7', '#C026D3'];

export function AnalyticsDashboard({ caseStudiesCount, signupsCount, publishedCount }: Props) {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<'7days' | '30days' | '90days'>('30days');
  const [isRealData, setIsRealData] = useState(false);

  useEffect(() => {
    fetchAnalytics();
  }, [dateRange]);

  const fetchAnalytics = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // This will call your backend endpoint
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/server/analytics?range=${dateRange}`,
        {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch analytics');
      }
      
      const data = await response.json();
      setAnalyticsData(data);
      setIsRealData(true);
    } catch (err) {
      console.error('Error fetching analytics:', err);
      setError('Unable to load analytics. Make sure Google Analytics is properly configured.');
      
      // Load mock data for demonstration
      setAnalyticsData(getMockAnalyticsData());
    } finally {
      setLoading(false);
    }
  };

  const getMockAnalyticsData = (): AnalyticsData => {
    const days = dateRange === '7days' ? 7 : dateRange === '30days' ? 30 : 90;
    const dailyVisits = [];
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dailyVisits.push({
        date: date.toISOString().split('T')[0],
        users: Math.floor(Math.random() * 100) + 20,
        pageViews: Math.floor(Math.random() * 200) + 50,
      });
    }

    return {
      overview: {
        totalUsers: 1847,
        totalPageViews: 4521,
        averageSessionDuration: 185, // seconds
        bounceRate: 42.5,
        newUsers: 1203,
        returningUsers: 644,
      },
      dailyVisits,
      topPages: [
        { page: '/services/prosthetics', views: 892, avgTime: 245 },
        { page: '/', views: 1547, avgTime: 165 },
        { page: '/services/custom-orthotics', views: 673, avgTime: 198 },
        { page: '/about', views: 521, avgTime: 142 },
        { page: '/contact', views: 487, avgTime: 112 },
      ],
      deviceBreakdown: [
        { device: 'Mobile', users: 1102, percentage: 59.7 },
        { device: 'Desktop', users: 628, percentage: 34.0 },
        { device: 'Tablet', users: 117, percentage: 6.3 },
      ],
      trafficSources: [
        { source: 'Google Search', users: 892, percentage: 48.3 },
        { source: 'Direct', users: 445, percentage: 24.1 },
        { source: 'Social Media', users: 312, percentage: 16.9 },
        { source: 'Referral', users: 198, percentage: 10.7 },
      ],
      topCountries: [
        { country: 'South Africa', users: 1456 },
        { country: 'United Kingdom', users: 178 },
        { country: 'United States', users: 124 },
        { country: 'Australia', users: 89 },
      ],
    };
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-[var(--accent-purple)] mx-auto mb-2" />
          <p className="text-[var(--text-muted)]">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="text-center py-12">
        <p className="text-[var(--text-muted)]">No analytics data available</p>
      </div>
    );
  }

  const { overview, dailyVisits, topPages, deviceBreakdown, trafficSources, topCountries } = analyticsData;

  return (
    <div className="space-y-6">
      {/* Header with Date Range Selector */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-[var(--text-dark)]">Website Analytics</h2>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            Google Analytics 4 data - Last {dateRange === '7days' ? '7' : dateRange === '30days' ? '30' : '90'} days
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => setDateRange('7days')}
            variant={dateRange === '7days' ? 'default' : 'outline'}
            size="sm"
            className="rounded-full"
          >
            7 Days
          </Button>
          <Button
            onClick={() => setDateRange('30days')}
            variant={dateRange === '30days' ? 'default' : 'outline'}
            size="sm"
            className="rounded-full"
          >
            30 Days
          </Button>
          <Button
            onClick={() => setDateRange('90days')}
            variant={dateRange === '90days' ? 'default' : 'outline'}
            size="sm"
            className="rounded-full"
          >
            90 Days
          </Button>
          <Button
            onClick={fetchAnalytics}
            variant="outline"
            size="sm"
            className="rounded-full"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            ⚠️ {error} Showing sample data for demonstration.
          </p>
        </div>
      )}

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-6 border border-purple-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-[var(--text-muted)]">Total Visitors</span>
            <Users className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-3xl font-bold text-[var(--text-dark)]">{overview.totalUsers.toLocaleString()}</p>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            {overview.newUsers.toLocaleString()} new, {overview.returningUsers.toLocaleString()} returning
          </p>
        </div>

        <div className="bg-gradient-to-br from-pink-50 to-white rounded-xl p-6 border border-pink-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-[var(--text-muted)]">Page Views</span>
            <Eye className="w-5 h-5 text-pink-600" />
          </div>
          <p className="text-3xl font-bold text-[var(--text-dark)]">{overview.totalPageViews.toLocaleString()}</p>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            {(overview.totalPageViews / overview.totalUsers).toFixed(1)} pages per visit
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border border-blue-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-[var(--text-muted)]">Avg. Session</span>
            <Clock className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-[var(--text-dark)]">
            {formatDuration(overview.averageSessionDuration)}
          </p>
          <p className="text-xs text-[var(--text-muted)] mt-1">Time on site</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-6 border border-green-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-[var(--text-muted)]">Bounce Rate</span>
            <MousePointer className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-[var(--text-dark)]">{overview.bounceRate}%</p>
          <p className="text-xs text-[var(--text-muted)] mt-1">Single page visits</p>
        </div>
      </div>

      {/* Website Data - Case Studies & Signups */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-[var(--text-muted)]">Case Studies</span>
            <BarChart3 className="w-5 h-5 text-[var(--accent-purple)]" />
          </div>
          <p className="text-3xl font-bold text-[var(--text-dark)]">{caseStudiesCount}</p>
          <p className="text-xs text-[var(--text-muted)] mt-1">{publishedCount} published</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-[var(--text-muted)]">Signup Requests</span>
            <TrendingUp className="w-5 h-5 text-[var(--accent-pink)]" />
          </div>
          <p className="text-3xl font-bold text-[var(--text-dark)]">{signupsCount}</p>
          <p className="text-xs text-[var(--text-muted)] mt-1">Total assessments</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-[var(--text-muted)]">Conversion Rate</span>
            <Globe className="w-5 h-5 text-[var(--accent-purple)]" />
          </div>
          <p className="text-3xl font-bold text-[var(--text-dark)]">
            {overview.totalUsers > 0 ? ((signupsCount / overview.totalUsers) * 100).toFixed(1) : '0'}%
          </p>
          <p className="text-xs text-[var(--text-muted)] mt-1">Visitors to signups</p>
        </div>
      </div>

      {/* Daily Visits Chart */}
      <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
        <h3 className="text-lg font-semibold text-[var(--text-dark)] mb-4">Daily Traffic</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dailyVisits.map((item, idx) => ({ ...item, id: `day-${idx}-${item.date}` }))}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatDate}
              tick={{ fill: '#6b7280', fontSize: 12 }}
            />
            <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="users" 
              stroke="#9333EA" 
              strokeWidth={2}
              name="Visitors"
              dot={{ fill: '#9333EA', r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="pageViews" 
              stroke="#EC4899" 
              strokeWidth={2}
              name="Page Views"
              dot={{ fill: '#EC4899', r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Top Pages and Device Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
          <h3 className="text-lg font-semibold text-[var(--text-dark)] mb-4">Top Pages</h3>
          <div className="space-y-3">
            {topPages.map((page) => (
              <div key={`page-${page.page}`} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm font-medium text-[var(--text-dark)] truncate">{page.page}</p>
                  <p className="text-xs text-[var(--text-muted)]">
                    {formatDuration(page.avgTime)} avg. time
                  </p>
                </div>
                <div className="text-right ml-4">
                  <p className="text-lg font-bold text-[var(--text-dark)]">{page.views.toLocaleString()}</p>
                  <p className="text-xs text-[var(--text-muted)]">views</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
          <h3 className="text-lg font-semibold text-[var(--text-dark)] mb-4">Device Breakdown</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={deviceBreakdown}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ device, percentage }) => `${device} ${percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="users"
              >
                {deviceBreakdown.map((entry, index) => (
                  <Cell key={`cell-${entry.device}-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-3 gap-2 mt-4">
            {deviceBreakdown.map((device, index) => {
              const Icon = device.device === 'Mobile' ? Smartphone : device.device === 'Desktop' ? Monitor : Tablet;
              return (
                <div key={`device-${device.device}-${index}`} className="text-center p-2 bg-gray-50 rounded-lg">
                  <Icon className="w-5 h-5 mx-auto mb-1" style={{ color: COLORS[index % COLORS.length] }} />
                  <p className="text-xs font-medium text-[var(--text-dark)]">{device.users}</p>
                  <p className="text-xs text-[var(--text-muted)]">{device.device}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Traffic Sources and Countries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Sources */}
        <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
          <h3 className="text-lg font-semibold text-[var(--text-dark)] mb-4">Traffic Sources</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={trafficSources.map((item, idx) => ({ ...item, id: `source-${idx}-${item.source}` }))} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" tick={{ fill: '#6b7280', fontSize: 12 }} />
              <YAxis dataKey="source" type="category" tick={{ fill: '#6b7280', fontSize: 12 }} width={100} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="users" fill="#9333EA" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Countries */}
        <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
          <h3 className="text-lg font-semibold text-[var(--text-dark)] mb-4">Top Countries</h3>
          <div className="space-y-3">
            {topCountries.map((country) => {
              const percentage = ((country.users / overview.totalUsers) * 100).toFixed(1);
              return (
                <div key={`country-${country.country}`} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-[var(--text-dark)]">{country.country}</span>
                    <span className="text-sm font-bold text-[var(--text-dark)]">{country.users.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-[var(--accent-purple)] to-[var(--accent-pink)] h-2 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer Note */}
      
    </div>
  );
}