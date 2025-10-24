// Email client configuration using Resend
// To use this, set RESEND_API_KEY in your environment variables

interface EmailOptions {
  to: string | string[]
  subject: string
  html: string
  from?: string
}

const RESEND_API_KEY = process.env.RESEND_API_KEY
const FROM_EMAIL = process.env.EMAIL_FROM || 'Prompt Party <noreply@prompt-party.com>'

export async function sendEmail({ to, subject, html, from = FROM_EMAIL }: EmailOptions) {
  if (!RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not configured. Email not sent.')
    return { success: false, error: 'Email service not configured' }
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from,
        to: Array.isArray(to) ? to : [to],
        subject,
        html,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('Failed to send email:', error)
      return { success: false, error }
    }

    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    console.error('Email send error:', error)
    return { success: false, error: String(error) }
  }
}

// Wrapper for notification emails
export async function sendNotificationEmail(
  userEmail: string,
  notificationType: string,
  data: {
    title: string
    message: string
    actionUrl?: string
    actionText?: string
  }
) {
  const html = renderNotificationEmail(notificationType, data)

  return sendEmail({
    to: userEmail,
    subject: data.title,
    html,
  })
}

// Simple HTML email template
function renderNotificationEmail(
  type: string,
  data: {
    title: string
    message: string
    actionUrl?: string
    actionText?: string
  }
) {
  const { title, message, actionUrl, actionText } = data

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f6f9fc; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px 40px; text-align: center;">
              <h1 style="margin: 0; color: #6366f1; font-size: 24px;">🪩 Prompt Party</h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 20px 40px;">
              <h2 style="margin: 0 0 16px 0; color: #1a1a1a; font-size: 20px;">${title}</h2>
              <p style="margin: 0; color: #666666; font-size: 16px; line-height: 1.6;">${message}</p>
            </td>
          </tr>

          <!-- Action Button -->
          ${
            actionUrl && actionText
              ? `
          <tr>
            <td style="padding: 20px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="${actionUrl}" style="display: inline-block; padding: 12px 32px; background-color: #6366f1; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 500; font-size: 16px;">${actionText}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          `
              : ''
          }

          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 8px 0; color: #999999; font-size: 14px; text-align: center;">
                You're receiving this because you have notifications enabled in your Prompt Party account.
              </p>
              <p style="margin: 0; color: #999999; font-size: 14px; text-align: center;">
                <a href="https://prompt-party.com/settings/notifications" style="color: #6366f1; text-decoration: none;">Manage notification preferences</a>
              </p>
            </td>
          </tr>
        </table>

        <!-- Footer Text -->
        <table width="600" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding: 20px 0; text-align: center;">
              <p style="margin: 0; color: #999999; font-size: 12px;">
                © ${new Date().getFullYear()} Prompt Party. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}
