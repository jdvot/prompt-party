import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import jsPDF from 'jspdf'
import { format } from 'date-fns'

export async function POST(request: NextRequest) {
  try {
    const {
      user_id,
      user_name,
      dashboard_data,
      daily_analytics,
      top_prompts,
    } = await request.json()

    const supabase = await createClient()

    // Verify user is authenticated
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user || user.id !== user_id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Create PDF
    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.width
    const pageHeight = doc.internal.pageSize.height
    let y = 20

    // Header
    doc.setFillColor(124, 58, 237) // Brand primary color
    doc.rect(0, 0, pageWidth, 40, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(24)
    doc.setFont('helvetica', 'bold')
    doc.text('Marketing Analytics Report', 20, 25)
    doc.setFontSize(12)
    doc.setFont('helvetica', 'normal')
    doc.text(`Generated on ${format(new Date(), 'MMMM dd, yyyy')}`, 20, 33)

    // Reset text color
    doc.setTextColor(0, 0, 0)
    y = 55

    // User info
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.text(`Report for: ${user_name}`, 20, y)
    y += 10
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.text(`Marketing Suite Subscriber`, 20, y)
    y += 15

    // Summary Stats
    doc.setFontSize(16)
    doc.setFont('helvetica', 'bold')
    doc.text('Performance Summary', 20, y)
    y += 10

    const stats = [
      {
        label: 'Total Time Saved',
        value: `${Math.round((dashboard_data?.total_time_saved_minutes || 0) / 60)} hours`,
      },
      {
        label: 'Estimated ROI',
        value: `€${Math.round(dashboard_data?.total_roi_euros || 0).toLocaleString()}`,
      },
      {
        label: 'Prompts Used',
        value: (dashboard_data?.total_prompts_used || 0).toLocaleString(),
      },
      {
        label: 'Active Days',
        value: dashboard_data?.active_days || 0,
      },
      {
        label: 'AI Tests Run',
        value: (dashboard_data?.total_ai_tests || 0).toLocaleString(),
      },
      {
        label: 'Multi-LLM Comparisons',
        value: (dashboard_data?.total_comparisons || 0).toLocaleString(),
      },
    ]

    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')

    // Draw stats in 2 columns
    stats.forEach((stat, index) => {
      const col = index % 2
      const row = Math.floor(index / 2)
      const x = 20 + col * 95
      const statY = y + row * 15

      doc.setFont('helvetica', 'bold')
      doc.text(stat.label + ':', x, statY)
      doc.setFont('helvetica', 'normal')
      doc.text(stat.value, x + 50, statY)
    })

    y += Math.ceil(stats.length / 2) * 15 + 15

    // Last 30 Days Performance
    doc.setFontSize(16)
    doc.setFont('helvetica', 'bold')
    doc.text('Last 30 Days', 20, y)
    y += 10

    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.text(
      `Time Saved: ${Math.round((dashboard_data?.time_saved_30d || 0) / 60)} hours`,
      20,
      y
    )
    y += 7
    doc.text(
      `Prompts Used: ${dashboard_data?.prompts_used_30d || 0}`,
      20,
      y
    )
    y += 7
    doc.text(
      `Estimated ROI: €${Math.round((dashboard_data?.time_saved_30d || 0) * 0.83).toLocaleString()}`,
      20,
      y
    )
    y += 15

    // Check if we need a new page
    if (y > pageHeight - 60) {
      doc.addPage()
      y = 20
    }

    // Top Prompts
    doc.setFontSize(16)
    doc.setFont('helvetica', 'bold')
    doc.text('Your Top 10 Prompts', 20, y)
    y += 10

    doc.setFontSize(9)
    doc.setFont('helvetica', 'normal')

    top_prompts.slice(0, 10).forEach((prompt: any, index: number) => {
      if (y > pageHeight - 30) {
        doc.addPage()
        y = 20
      }

      doc.setFont('helvetica', 'bold')
      doc.text(`${index + 1}. ${prompt.title}`, 20, y)
      y += 5
      doc.setFont('helvetica', 'normal')
      doc.text(
        `   Category: ${prompt.category.replace('_', ' ')} | Uses: ${prompt.usage_count} | Time saved: ~${prompt.estimated_time_saved}min`,
        20,
        y
      )
      y += 7
    })

    y += 10

    // Insights
    if (y > pageHeight - 80) {
      doc.addPage()
      y = 20
    }

    doc.setFontSize(16)
    doc.setFont('helvetica', 'bold')
    doc.text('Key Insights', 20, y)
    y += 10

    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')

    const insights = [
      `Average time saved per prompt: ~${Math.round((dashboard_data?.total_time_saved_minutes || 0) / (dashboard_data?.total_prompts_used || 1))} minutes`,
      `Most active category: ${top_prompts[0]?.category.replace('_', ' ') || 'N/A'}`,
      `Productivity boost: ${Math.round(((dashboard_data?.total_time_saved_minutes || 0) / 480) * 100)}% faster vs. manual creation`,
      `ROI rate: €${((dashboard_data?.total_roi_euros || 0) / (dashboard_data?.total_prompts_used || 1)).toFixed(2)} per prompt`,
    ]

    insights.forEach((insight) => {
      doc.text(`• ${insight}`, 20, y)
      y += 7
    })

    y += 15

    // Methodology
    if (y > pageHeight - 50) {
      doc.addPage()
      y = 20
    }

    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    doc.text('Methodology', 20, y)
    y += 8

    doc.setFontSize(9)
    doc.setFont('helvetica', 'normal')
    doc.text('ROI Calculation: Based on €50/hour freelance marketing rate (€0.83/minute)', 20, y)
    y += 5
    doc.text('Time Saved: Estimated based on average manual content creation time', 20, y)
    y += 5
    doc.text('Data Period: All-time cumulative data with last 30 days breakdown', 20, y)

    // Footer
    const footerY = pageHeight - 15
    doc.setFillColor(240, 240, 240)
    doc.rect(0, footerY - 5, pageWidth, 20, 'F')
    doc.setFontSize(8)
    doc.setTextColor(100, 100, 100)
    doc.text('Prompt Party • Marketing Suite', 20, footerY)
    doc.text('Page 1', pageWidth - 30, footerY)

    // Generate PDF buffer
    const pdfBuffer = doc.output('arraybuffer')

    // Return PDF as response
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="marketing-analytics-${format(new Date(), 'yyyy-MM-dd')}.pdf"`,
      },
    })
  } catch (error: any) {
    console.error('PDF export error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
