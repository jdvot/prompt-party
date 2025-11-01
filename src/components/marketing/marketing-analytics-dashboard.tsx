'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import {
  TrendingUpIcon,
  ClockIcon,
  DollarSignIcon,
  SparklesIcon,
  DownloadIcon,
  CalendarIcon,
  ZapIcon,
  TargetIcon,
} from 'lucide-react'
import { format } from 'date-fns'

interface DashboardData {
  total_prompts_used: number
  total_ai_tests: number
  total_comparisons: number
  total_optimizations: number
  total_time_saved_minutes: number
  total_roi_euros: number
  active_days: number
  last_active_date: string
  time_saved_7d: number
  prompts_used_7d: number
  time_saved_30d: number
  prompts_used_30d: number
}

interface DailyAnalytics {
  date: string
  prompts_used: number
  ai_tests_run: number
  time_saved_minutes: number
  roi_estimated_euros: number
}

interface TopPrompt {
  id: string
  title: string
  category: string
  estimated_time_saved: number
  usage_count: number
}

interface Props {
  dashboardData: DashboardData | null
  dailyAnalytics: DailyAnalytics[]
  topPrompts: TopPrompt[]
  userName: string
  userId: string
}

export function MarketingAnalyticsDashboard({
  dashboardData,
  dailyAnalytics,
  topPrompts,
  userName,
  userId,
}: Props) {
  const [isExporting, setIsExporting] = useState(false)
  const [dateRange, setDateRange] = useState<'7d' | '30d' | 'all'>('30d')

  // Format data for charts
  const chartData = dailyAnalytics.map((day) => ({
    date: format(new Date(day.date), 'MMM dd'),
    'Time Saved (hours)': Math.round(day.time_saved_minutes / 60),
    'Prompts Used': day.prompts_used,
    'ROI (€)': Math.round(day.roi_estimated_euros),
  }))

  const stats = [
    {
      title: 'Total Time Saved',
      value: `${Math.round((dashboardData?.total_time_saved_minutes || 0) / 60)}h`,
      subtitle: `${Math.round((dashboardData?.time_saved_30d || 0) / 60)}h this month`,
      icon: ClockIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-500/10',
    },
    {
      title: 'Estimated ROI',
      value: `€${Math.round(dashboardData?.total_roi_euros || 0).toLocaleString()}`,
      subtitle: `€${Math.round((dashboardData?.time_saved_30d || 0) * 0.83).toLocaleString()} this month`,
      icon: DollarSignIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-500/10',
    },
    {
      title: 'Prompts Used',
      value: (dashboardData?.total_prompts_used || 0).toLocaleString(),
      subtitle: `${dashboardData?.prompts_used_30d || 0} this month`,
      icon: SparklesIcon,
      color: 'text-purple-600',
      bgColor: 'bg-purple-500/10',
    },
    {
      title: 'Active Days',
      value: dashboardData?.active_days || 0,
      subtitle: `Last active: ${
        dashboardData?.last_active_date
          ? format(new Date(dashboardData.last_active_date), 'MMM dd')
          : 'Never'
      }`,
      icon: CalendarIcon,
      color: 'text-orange-600',
      bgColor: 'bg-orange-500/10',
    },
  ]

  const handleExportPDF = async () => {
    setIsExporting(true)

    try {
      const response = await fetch('/api/marketing/export-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          user_name: userName,
          dashboard_data: dashboardData,
          daily_analytics: dailyAnalytics,
          top_prompts: topPrompts,
        }),
      })

      if (!response.ok) throw new Error('Export failed')

      // Download PDF
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `marketing-analytics-${format(new Date(), 'yyyy-MM-dd')}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Export error:', error)
      alert('Failed to export PDF. Please try again.')
    } finally {
      setIsExporting(false)
    }
  }

  // Empty state
  if (!dashboardData || dashboardData.total_prompts_used === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <TargetIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
          <h3 className="text-xl font-semibold mb-2">No data yet</h3>
          <p className="text-muted-foreground mb-6">
            Start using marketing prompts to see your analytics here
          </p>
          <Button asChild>
            <a href="/marketing/library">Browse Prompt Library</a>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header with export */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Welcome back, {userName}!</h2>
          <p className="text-muted-foreground">
            Here's your marketing productivity overview
          </p>
        </div>
        <Button onClick={handleExportPDF} disabled={isExporting} className="gap-2">
          <DownloadIcon className="w-4 h-4" />
          {isExporting ? 'Exporting...' : 'Export PDF'}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold mb-1">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Time Saved Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Time Saved Over Time</CardTitle>
            <CardDescription>Hours saved per day (last 30 days)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="date" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="Time Saved (hours)"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Prompts Used Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Prompts Used</CardTitle>
            <CardDescription>Daily prompt usage (last 30 days)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="date" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Bar dataKey="Prompts Used" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* ROI Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Estimated ROI</CardTitle>
          <CardDescription>
            Return on investment based on €50/hour freelance rate (last 30 days)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="date" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="ROI (€)"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ fill: '#10b981', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top Prompts */}
      <Card>
        <CardHeader>
          <CardTitle>Your Top 10 Prompts</CardTitle>
          <CardDescription>Most frequently used marketing prompts</CardDescription>
        </CardHeader>
        <CardContent>
          {topPrompts.length > 0 ? (
            <div className="space-y-3">
              {topPrompts.map((prompt, index) => (
                <div
                  key={prompt.id}
                  className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-primary/10 text-brand-primary font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{prompt.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {prompt.category.replace('_', ' ')} • ~{prompt.estimated_time_saved}
                        min saved
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="soft">
                      <ZapIcon className="w-3 h-3 mr-1" />
                      {prompt.usage_count} uses
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>No prompts used yet</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Insights */}
      <Card className="bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUpIcon className="w-5 h-5" />
            Key Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-background/50">
              <p className="text-sm text-muted-foreground mb-1">Average time saved per prompt</p>
              <p className="text-2xl font-bold">
                ~
                {Math.round(
                  (dashboardData?.total_time_saved_minutes || 0) /
                    (dashboardData?.total_prompts_used || 1)
                )}{' '}
                min
              </p>
            </div>
            <div className="p-4 rounded-lg bg-background/50">
              <p className="text-sm text-muted-foreground mb-1">Most active category</p>
              <p className="text-2xl font-bold">
                {topPrompts[0]?.category.replace('_', ' ') || 'N/A'}
              </p>
            </div>
            <div className="p-4 rounded-lg bg-background/50">
              <p className="text-sm text-muted-foreground mb-1">Productivity boost</p>
              <p className="text-2xl font-bold text-green-600">
                {Math.round(
                  ((dashboardData?.total_time_saved_minutes || 0) / 480) * 100
                )}
                % faster
              </p>
              <p className="text-xs text-muted-foreground">vs. manual content creation</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
