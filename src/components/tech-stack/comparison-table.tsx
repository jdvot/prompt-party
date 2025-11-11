'use client'

import { CheckCircle, XCircle, Zap, Gauge, Shield, GitBranch, Users, BookOpen } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

interface ComparisonRow {
  criterion: string
  before: boolean | string | number
  after: boolean | string | number
  improvement?: string
}

interface ComparisonTableProps {
  rows: ComparisonRow[]
  beforeLabel: string
  afterLabel: string
  criterionLabel?: string
  improvementLabel?: string
  yesLabel?: string
  noLabel?: string
}

const getCategoryIcon = (criterion: string) => {
  const lowerCriterion = criterion.toLowerCase()

  if (lowerCriterion.includes('speed') || lowerCriterion.includes('développement') || lowerCriterion.includes('time')) {
    return { icon: Zap, color: 'text-yellow-600 dark:text-yellow-400' }
  }
  if (lowerCriterion.includes('quality') || lowerCriterion.includes('qualité') || lowerCriterion.includes('coverage')) {
    return { icon: Shield, color: 'text-blue-600 dark:text-blue-400' }
  }
  if (lowerCriterion.includes('review') || lowerCriterion.includes('alignment')) {
    return { icon: GitBranch, color: 'text-purple-600 dark:text-purple-400' }
  }
  if (lowerCriterion.includes('onboarding') || lowerCriterion.includes('transfer') || lowerCriterion.includes('knowledge')) {
    return { icon: Users, color: 'text-cyan-600 dark:text-cyan-400' }
  }
  if (lowerCriterion.includes('documentation')) {
    return { icon: BookOpen, color: 'text-orange-600 dark:text-orange-400' }
  }
  if (lowerCriterion.includes('cost') || lowerCriterion.includes('efficiency')) {
    return { icon: Gauge, color: 'text-green-600 dark:text-green-400' }
  }

  return { icon: CheckCircle, color: 'text-slate-600 dark:text-slate-400' }
}

const renderProgressBar = (before: boolean | string | number, after: boolean | string | number) => {
  // Extract percentages from strings like "40%" or "95%"
  const extractPercent = (val: boolean | string | number): number | null => {
    if (typeof val === 'string') {
      const match = val.match(/(\d+)%/)
      return match ? parseInt(match[1]) : null
    }
    if (typeof val === 'number') return val
    return null
  }

  const beforePercent = extractPercent(before)
  const afterPercent = extractPercent(after)

  if (beforePercent !== null && afterPercent !== null) {
    return (
      <div className="w-full space-y-3">
        {/* Before bar - horizontal */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-orange-700 dark:text-orange-400">{beforePercent}%</span>
          </div>
          <div className="w-full h-2 bg-orange-100 dark:bg-orange-900/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-orange-500 dark:bg-orange-600 rounded-full transition-all duration-300"
              style={{ width: `${beforePercent}%` }}
            />
          </div>
        </div>

        {/* After bar - horizontal */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-green-700 dark:text-green-400">{afterPercent}%</span>
          </div>
          <div className="w-full h-2 bg-green-100 dark:bg-green-900/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 dark:bg-green-600 rounded-full transition-all duration-300"
              style={{ width: `${afterPercent}%` }}
            />
          </div>
        </div>
      </div>
    )
  }

  return null
}

export function ComparisonTable({
  rows,
  beforeLabel,
  afterLabel,
  criterionLabel = 'Criterion',
  improvementLabel = 'Improvement',
  yesLabel = 'Yes',
  noLabel = 'No'
}: ComparisonTableProps) {
  const renderCell = (value: boolean | string | number) => {
    if (typeof value === 'boolean') {
      return value ? (
        <div className="flex items-center gap-2 justify-center">
          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
          <span className="text-sm text-green-700 dark:text-green-300 font-medium">{yesLabel}</span>
        </div>
      ) : (
        <div className="flex items-center gap-2 justify-center">
          <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
          <span className="text-sm text-red-700 dark:text-red-300 font-medium">{noLabel}</span>
        </div>
      )
    }
    return <span className="text-sm text-foreground">{value}</span>
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
      <Table>
        <TableHeader className="bg-slate-50 dark:bg-slate-900">
          <TableRow className="border-b border-slate-200 dark:border-slate-700">
            <TableHead className="font-semibold text-foreground">{criterionLabel}</TableHead>
            <TableHead className="font-semibold text-foreground text-center">{beforeLabel}</TableHead>
            <TableHead className="font-semibold text-foreground text-center">{afterLabel}</TableHead>
            {rows[0]?.improvement && (
              <TableHead className="font-semibold text-foreground text-center">{improvementLabel}</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, idx) => {
            const { icon: IconComponent, color } = getCategoryIcon(row.criterion)
            const progressBar = renderProgressBar(row.before, row.after)

            return (
              <TableRow
                key={idx}
                className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <TableCell className="font-medium text-foreground py-4">
                  <div className="flex items-center gap-3">
                    <IconComponent className={`w-5 h-5 flex-shrink-0 ${color}`} />
                    <span>{row.criterion}</span>
                  </div>
                </TableCell>
                <TableCell className="text-center py-4 text-slate-600 dark:text-slate-400">
                  {progressBar ? (
                    <div className="min-w-max">{renderProgressBar(row.before, row.after)}</div>
                  ) : (
                    renderCell(row.before)
                  )}
                </TableCell>
                <TableCell className="text-center py-4">
                  {progressBar ? (
                    <div className="invisible">{renderCell(row.after)}</div>
                  ) : (
                    renderCell(row.after)
                  )}
                </TableCell>
                {row.improvement && (
                  <TableCell className="text-center py-4">
                    <span className="text-xs font-medium text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded whitespace-nowrap">
                      {row.improvement}
                    </span>
                  </TableCell>
                )}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
