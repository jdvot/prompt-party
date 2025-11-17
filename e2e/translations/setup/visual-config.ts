import { Page, expect } from '@playwright/test'

/**
 * Visual regression testing configuration for translations
 * Handles screenshot comparisons and layout validation
 */

export interface VisualTestOptions {
  maxDiffPixels?: number
  threshold?: number
  updateBaselines?: boolean
  viewportName?: 'desktop' | 'tablet' | 'mobile'
}

export const DEFAULT_VIEWPORTS = {
  desktop: { width: 1280, height: 720 },
  tablet: { width: 768, height: 1024 },
  mobile: { width: 375, height: 667 }
}

export const DEFAULT_VISUAL_OPTIONS: VisualTestOptions = {
  maxDiffPixels: 100, // Allow minor pixel differences
  threshold: 0.2, // Allow 20% pixel difference
  updateBaselines: false,
  viewportName: 'desktop'
}

/**
 * Take a screenshot for visual regression testing
 */
export async function takeVisualSnapshot(
  page: Page,
  testName: string,
  locale: string,
  options: VisualTestOptions = DEFAULT_VISUAL_OPTIONS
): Promise<void> {
  const screenshotName = `${testName}-${locale}-${options.viewportName || 'desktop'}`

  await expect(page).toHaveScreenshot(screenshotName + '.png', {
    maxDiffPixels: options.maxDiffPixels || 100,
    threshold: options.threshold || 0.2
  })
}

/**
 * Set viewport size for responsive testing
 */
export async function setViewport(
  page: Page,
  viewportName: keyof typeof DEFAULT_VIEWPORTS
): Promise<void> {
  const viewport = DEFAULT_VIEWPORTS[viewportName]
  await page.setViewportSize(viewport)
  await page.waitForTimeout(500) // Wait for layout reflow
}

/**
 * Check for text overflow issues (common with long translations)
 */
export async function checkForTextOverflow(page: Page): Promise<Array<{ element: string; overflow: string }>> {
  const overflowElements = await page.evaluate(() => {
    const results: Array<{ element: string; overflow: string }> = []
    const elements = document.querySelectorAll('*')

    elements.forEach(el => {
      const style = window.getComputedStyle(el)
      const overflow = style.overflow

      if ((overflow === 'hidden' || overflow === 'clip') && el.scrollWidth > el.clientWidth) {
        results.push({
          element: el.tagName + (el.id ? `#${el.id}` : '') + (el.className ? `.${el.className}` : ''),
          overflow: `width: ${el.clientWidth}px, scrollWidth: ${el.scrollWidth}px`
        })
      }
    })

    return results
  })

  return overflowElements
}

/**
 * Check for text cutoff in elements with max-lines or similar constraints
 */
export async function checkForTextCutoff(page: Page): Promise<Array<{ element: string; status: string }>> {
  const truncatedElements = await page.evaluate(() => {
    const results: Array<{ element: string; status: string }> = []
    const elements = document.querySelectorAll('[style*="line-clamp"], [class*="truncate"], [class*="ellipsis"]')

    elements.forEach(el => {
      const text = el.textContent || ''
      const style = window.getComputedStyle(el)
      const webkitLineClamp = (style as any).webkitLineClamp

      if (webkitLineClamp && webkitLineClamp !== 'none') {
        results.push({
          element: el.tagName + (el.id ? `#${el.id}` : '') + (el.className ? `.${el.className}` : ''),
          status: `line-clamp: ${webkitLineClamp}, text length: ${text.length}`
        })
      }
    })

    return results
  })

  return truncatedElements
}

/**
 * Verify that font sizes are adequate for readability with translations
 * Some languages use different fonts/sizes
 */
export async function checkFontSizes(page: Page): Promise<Map<string, { minSize: number; maxSize: number; count: number }>> {
  const fontSizeMap = await page.evaluate(() => {
    const map: Record<string, { sizes: number[]; elements: string[] }> = {}
    const elements = document.querySelectorAll('p, span, h1, h2, h3, h4, h5, h6, button, a, label')

    elements.forEach(el => {
      const style = window.getComputedStyle(el)
      const fontSize = parseFloat(style.fontSize)
      const tagName = el.tagName.toLowerCase()

      if (!map[tagName]) {
        map[tagName] = { sizes: [], elements: [] }
      }

      map[tagName].sizes.push(fontSize)
      map[tagName].elements.push(el.textContent?.substring(0, 20) || 'empty')
    })

    return map
  })

  const result = new Map<string, { minSize: number; maxSize: number; count: number }>()

  for (const [tagName, data] of Object.entries(fontSizeMap)) {
    if (data.sizes.length > 0) {
      result.set(tagName, {
        minSize: Math.min(...data.sizes),
        maxSize: Math.max(...data.sizes),
        count: data.sizes.length
      })
    }
  }

  return result
}

/**
 * Check spacing/padding consistency across elements
 */
export async function checkElementSpacing(page: Page): Promise<Array<{ element: string; spacing: string }>> {
  const spacingData = await page.evaluate(() => {
    const results: Array<{ element: string; spacing: string }> = []
    const elements = document.querySelectorAll('[class*="p-"], [class*="m-"], [style*="padding"], [style*="margin"]')

    elements.forEach(el => {
      const style = window.getComputedStyle(el)
      const padding = `${style.paddingTop} ${style.paddingRight} ${style.paddingBottom} ${style.paddingLeft}`
      const margin = `${style.marginTop} ${style.marginRight} ${style.marginBottom} ${style.marginLeft}`

      results.push({
        element: el.tagName.toLowerCase() + (el.className ? `.${el.className.split(' ').join('.')}` : ''),
        spacing: `padding: ${padding}, margin: ${margin}`
      })
    })

    return results
  })

  return spacingData
}

/**
 * Check for proper layout on different viewport sizes
 */
export async function checkResponsiveLayout(page: Page, breakpoints = ['mobile', 'tablet', 'desktop']): Promise<void> {
  for (const breakpoint of breakpoints) {
    const viewport = DEFAULT_VIEWPORTS[breakpoint as keyof typeof DEFAULT_VIEWPORTS]
    if (viewport) {
      await setViewport(page, breakpoint as keyof typeof DEFAULT_VIEWPORTS)

      // Check for overflow
      const overflows = await checkForTextOverflow(page)
      if (overflows.length > 0) {
        console.warn(`[${breakpoint}] Text overflow detected:`, overflows)
      }

      // Check for cutoff
      const cutoffs = await checkForTextCutoff(page)
      if (cutoffs.length > 0) {
        console.warn(`[${breakpoint}] Text cutoff detected:`, cutoffs)
      }
    }
  }
}

/**
 * Validate that all interactive elements are properly sized and spaced
 * Important for translations where button text changes
 */
export async function validateInteractiveElementSizes(page: Page): Promise<Array<{ element: string; issue: string }>> {
  const issues = await page.evaluate(() => {
    const MIN_TOUCH_TARGET = 44 // pixels, for accessibility
    const results: Array<{ element: string; issue: string }> = []
    const interactiveElements = document.querySelectorAll('button, a, input[type="button"], input[type="checkbox"], input[type="radio"]')

    interactiveElements.forEach(el => {
      const rect = el.getBoundingClientRect()
      const width = rect.width
      const height = rect.height

      if (width < MIN_TOUCH_TARGET || height < MIN_TOUCH_TARGET) {
        results.push({
          element: el.tagName.toLowerCase() + (el.id ? `#${el.id}` : '') + (el.className ? `.${el.className}` : ''),
          issue: `Too small: ${width}x${height}px (min: ${MIN_TOUCH_TARGET}x${MIN_TOUCH_TARGET}px)`
        })
      }
    })

    return results
  })

  return issues
}

/**
 * Check for horizontal scroll issues
 */
export async function checkHorizontalScroll(page: Page): Promise<boolean> {
  const hasHorizontalScroll = await page.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth
  })

  return hasHorizontalScroll
}

/**
 * Generate a visual regression report for a page
 */
export async function generateVisualReport(page: Page, pageName: string, locale: string): Promise<string> {
  const report: string[] = [
    `\n=== Visual Regression Report: ${pageName} (${locale.toUpperCase()}) ===`,
    `URL: ${page.url()}`,
    `Timestamp: ${new Date().toISOString()}`
  ]

  // Check viewport
  const viewport = page.viewportSize()
  if (viewport) {
    report.push(`\nViewport: ${viewport.width}x${viewport.height}`)
  }

  // Check overflows
  const overflows = await checkForTextOverflow(page)
  if (overflows.length > 0) {
    report.push(`\n⚠️  Text Overflow Issues: ${overflows.length}`)
    overflows.forEach(o => report.push(`  - ${o.element}: ${o.overflow}`))
  } else {
    report.push('\n✓ No text overflow issues')
  }

  // Check cutoffs
  const cutoffs = await checkForTextCutoff(page)
  if (cutoffs.length > 0) {
    report.push(`\n⚠️  Text Cutoff Issues: ${cutoffs.length}`)
    cutoffs.forEach(c => report.push(`  - ${c.element}: ${c.status}`))
  } else {
    report.push('✓ No text cutoff issues')
  }

  // Check interactive element sizes
  const sizeIssues = await validateInteractiveElementSizes(page)
  if (sizeIssues.length > 0) {
    report.push(`\n⚠️  Interactive Element Size Issues: ${sizeIssues.length}`)
    sizeIssues.forEach(s => report.push(`  - ${s.element}: ${s.issue}`))
  } else {
    report.push('✓ All interactive elements are properly sized')
  }

  // Check horizontal scroll
  const hasHScroll = await checkHorizontalScroll(page)
  if (hasHScroll) {
    report.push('\n⚠️  Horizontal scroll detected')
  } else {
    report.push('✓ No horizontal scroll issues')
  }

  return report.join('\n')
}
