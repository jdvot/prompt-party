'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  TrendingUpIcon,
  EyeIcon,
  HeartIcon,
  MessageSquareIcon,
  GitForkIcon,
  FileTextIcon,
  DownloadIcon,
  CalendarIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { format, subDays, startOfDay, eachDayOfInterval } from 'date-fns'

type Prompt = {
  id: string
  title: string
  views_count: number
  likes_count: number
  created_at: string
}

type Like = {
  created_at: string
}

type Comment = {
  created_at: string
}

type Fork = {
  created_at: string
}

interface AnalyticsDashboardProps {
  prompts: Prompt[]
  likes: Like[]
  comments: Comment[]
  forks: Fork[]
}

export function AnalyticsDashboard({
  prompts,
  likes,
  comments,
  forks,
}: AnalyticsDashboardProps) {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | 'all'>('30d')

  // Calculate date range
  const dateRange = useMemo(() => {
    const now = new Date()
    const start =
      timeRange === 'all'
        ? new Date(0)
        : startOfDay(
            subDays(
              now,
              timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90
            )
          )
    return { start, end: now }
  }, [timeRange])

  // Filter data by date range
  const filteredLikes = useMemo(
    () =>
      likes.filter(
        (like) => new Date(like.created_at) >= dateRange.start
      ),
    [likes, dateRange]
  )

  const filteredComments = useMemo(
    () =>
      comments.filter(
        (comment) => new Date(comment.created_at) >= dateRange.start
      ),
    [comments, dateRange]
  )

  const filteredForks = useMemo(
    () =>
      forks.filter(
        (fork) => new Date(fork.created_at) >= dateRange.start
      ),
    [forks, dateRange]
  )

  // Calculate totals
  const totalViews = prompts.reduce((sum, p) => sum + (p.views_count || 0), 0)
  const totalLikes = filteredLikes.length
  const totalComments = filteredComments.length
  const totalRemixes = filteredForks.length

  // Calculate trend data for the chart
  const trendData = useMemo(() => {
    if (timeRange === 'all') return []

    const days =
      timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90

    const dateArray = eachDayOfInterval({
      start: dateRange.start,
      end: dateRange.end,
    })

    return dateArray.map((date) => {
      const dateStr = format(date, 'yyyy-MM-dd')
      return {
        date: format(date, 'MMM dd'),
        likes: filteredLikes.filter(
          (l) =>
            format(new Date(l.created_at), 'yyyy-MM-dd') === dateStr
        ).length,
        comments: filteredComments.filter(
          (c) =>
            format(new Date(c.created_at), 'yyyy-MM-dd') === dateStr
        ).length,
        remixes: filteredForks.filter(
          (f) =>
            format(new Date(f.created_at), 'yyyy-MM-dd') === dateStr
        ).length,
      }
    })
  }, [timeRange, dateRange, filteredLikes, filteredComments, filteredForks])

  // Top performing prompts
  const topPrompts = useMemo(() => {
    return [...prompts]
      .sort((a, b) => {
        const scoreA = (a.likes_count || 0) * 2 + (a.views_count || 0)
        const scoreB = (b.likes_count || 0) * 2 + (b.views_count || 0)
        return scoreB - scoreA
      })
      .slice(0, 5)
  }, [prompts])

  // Export to CSV
  const handleExport = () => {
    const csv = [
      ['Metric', 'Value'],
      ['Total Prompts', prompts.length],
      ['Total Views', totalViews],
      ['Total Likes', totalLikes],
      ['Total Comments', totalComments],
      ['Total Remixes', totalRemixes],
      ['Time Range', timeRange],
      [''],
      ['Top Prompts'],
      ['Title', 'Views', 'Likes'],
      ...topPrompts.map((p) => [
        p.title,
        p.views_count || 0,
        p.likes_count || 0,
      ]),
    ]
      .map((row) => row.join(','))
      .join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `prompt-party-analytics-${format(new Date(), 'yyyy-MM-dd')}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Time Range Selector & Export */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {(['7d', '30d', '90d', 'all'] as const).map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setTimeRange(range)}
            >
              {range === '7d'
                ? '7 days'
                : range === '30d'
                ? '30 days'
                : range === '90d'
                ? '90 days'
                : 'All time'}
            </Button>
          ))}
        </div>

        <Button variant="outline" size="sm" onClick={handleExport}>
          <DownloadIcon className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <EyeIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Across {prompts.length} prompts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
            <HeartIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLikes.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              In the last {timeRange === '7d' ? '7 days' : timeRange === '30d' ? '30 days' : timeRange === '90d' ? '90 days' : 'all time'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Comments</CardTitle>
            <MessageSquareIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalComments.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {totalComments > 0
                ? `Avg ${(totalComments / prompts.length).toFixed(1)} per prompt`
                : 'No comments yet'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Remixes</CardTitle>
            <GitForkIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRemixes.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {totalRemixes > 0
                ? `Avg ${(totalRemixes / prompts.length).toFixed(1)} per prompt`
                : 'No remixes yet'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Trend Chart (Simple text-based for now) */}
      {timeRange !== 'all' && trendData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUpIcon className="h-5 w-5 text-primary" />
              Engagement Trends
            </CardTitle>
            <CardDescription>
              Daily activity over the last {timeRange === '7d' ? '7 days' : timeRange === '30d' ? '30 days' : '90 days'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trendData.slice(-7).map((day, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-20 text-xs text-muted-foreground">{day.date}</div>
                  <div className="flex-1 grid grid-cols-3 gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <HeartIcon className="h-3 w-3 text-red-500" />
                      <span>{day.likes}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageSquareIcon className="h-3 w-3 text-blue-500" />
                      <span>{day.comments}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <GitForkIcon className="h-3 w-3 text-green-500" />
                      <span>{day.remixes}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Top Performing Prompts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileTextIcon className="h-5 w-5 text-primary" />
            Top Performing Prompts
          </CardTitle>
          <CardDescription>
            Your most popular prompts based on engagement
          </CardDescription>
        </CardHeader>
        <CardContent>
          {topPrompts.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              No prompts yet. Create your first prompt to see analytics!
            </p>
          ) : (
            <div className="space-y-4">
              {topPrompts.map((prompt, index) => (
                <div
                  key={prompt.id}
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm">
                      #{index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{prompt.title}</h4>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(prompt.created_at), 'MMM dd, yyyy')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <EyeIcon className="h-3 w-3 text-muted-foreground" />
                      <span>{prompt.views_count || 0}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <HeartIcon className="h-3 w-3 text-muted-foreground" />
                      <span>{prompt.likes_count || 0}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
