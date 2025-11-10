'use client'

import { CheckCircle, XCircle } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

interface ComparisonRow {
  criterion: string
  before: boolean | string
  after: boolean | string
  improvement?: string
}

interface ComparisonTableProps {
  rows: ComparisonRow[]
  beforeLabel: string
  afterLabel: string
}

export function ComparisonTable({ rows, beforeLabel, afterLabel }: ComparisonTableProps) {
  const renderCell = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <div className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
          <span className="text-sm text-green-700 dark:text-green-300 font-medium">Yes</span>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
          <span className="text-sm text-red-700 dark:text-red-300 font-medium">No</span>
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
            <TableHead className="font-semibold text-foreground">Criterion</TableHead>
            <TableHead className="font-semibold text-foreground text-center">{beforeLabel}</TableHead>
            <TableHead className="font-semibold text-foreground text-center">{afterLabel}</TableHead>
            {rows[0]?.improvement && (
              <TableHead className="font-semibold text-foreground text-center">Improvement</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, idx) => (
            <TableRow
              key={idx}
              className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              <TableCell className="font-medium text-foreground py-4">{row.criterion}</TableCell>
              <TableCell className="text-center py-4 text-slate-600 dark:text-slate-400">
                {renderCell(row.before)}
              </TableCell>
              <TableCell className="text-center py-4">{renderCell(row.after)}</TableCell>
              {row.improvement && (
                <TableCell className="text-center py-4">
                  <span className="text-xs font-medium text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded">
                    {row.improvement}
                  </span>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
