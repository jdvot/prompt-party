# 💳 Stripe Setup Guide - Marketing Suite

Guide complet pour configurer Stripe et activer les paiements pour le Marketing Suite package.

---

## 🎯 Overview

Le Marketing Suite utilise Stripe pour :
- Checkout sessions (paiement one-time ou récurrent)
- Subscriptions management (€49/mois)
- Webhooks (activation/désactivation plan)
- Customer Portal (upgrade, cancel, update card)

---

## 📋 Prerequisites

1. **Compte Stripe** : [stripe.com/register](https://stripe.com/register)
2. **Mode Test activé** : Pour développement
3. **API Keys** : Récupérées depuis Dashboard > Developers > API Keys

---

## 🚀 Step 1: Create Products & Prices

### Via Stripe Dashboard

**1. Accéder à Products**
- Dashboard > Products > Add Product

**2. Créer : Marketing Suite**

```
Name: Marketing Suite
Description: AI-powered marketing prompts suite with 500+ templates, multi-LLM testing, brand voice training, and analytics dashboard
Statement Descriptor: PROMPT PARTY MS
```

**Pricing** :
- Type : Recurring
- Price : €49.00 EUR
- Billing period : Monthly
- Free trial : 14 days

**Metadata** (important pour webhooks) :
```json
{
  "plan_name": "marketing_suite",
  "features": "500_prompts,unlimited_ai_testing,brand_voice,analytics,mini_team,priority_support,masterclasses",
  "team_seats": "3"
}
```

**3. Copier le Price ID**
```
price_xxxxxxxxxxxx
```

**4. Répéter pour les autres plans** :

**Pro** :
- Price : €9.99 EUR / month
- Metadata : `{ "plan_name": "pro" }`

**Team** :
- Price : €99.00 EUR / month
- Metadata : `{ "plan_name": "team", "team_seats": "10" }`

**Business** :
- Price : Custom (sur demande)

---

## 🔑 Step 2: Get API Keys

### Test Mode Keys

Dashboard > Developers > API Keys

**Publishable Key** (public, frontend) :
```
pk_test_xxxxxxxxxxxx
```

**Secret Key** (private, backend) :
```
sk_test_xxxxxxxxxxxx
```

### Add to `.env.local`

```env
# Stripe
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxx

# Price IDs
STRIPE_PRICE_PRO_MONTHLY=price_xxxxxxxxxxxx
STRIPE_PRICE_MARKETING_SUITE_MONTHLY=price_xxxxxxxxxxxx
STRIPE_PRICE_TEAM_MONTHLY=price_xxxxxxxxxxxx
```

---

## 🪝 Step 3: Setup Webhooks

### Why Webhooks?

Stripe envoie des events quand :
- Payment réussit → Activer plan Marketing Suite
- Subscription cancellée → Downgrade vers Free
- Payment échoue → Suspendre compte

### Create Webhook Endpoint

**1. Dashboard > Developers > Webhooks > Add Endpoint**

**Endpoint URL** :
```
https://your-domain.vercel.app/api/webhooks/stripe
```

**Events to listen** :
```
checkout.session.completed
customer.subscription.created
customer.subscription.updated
customer.subscription.deleted
invoice.payment_succeeded
invoice.payment_failed
```

**2. Copier Webhook Secret**
```
whsec_xxxxxxxxxxxx
```

**3. Add to `.env.local`**
```env
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxx
```

---

## 💻 Step 4: Implement Checkout Flow

### Create Checkout API Route

`/src/app/api/stripe/create-checkout-session/route.ts` :

```typescript
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@/lib/supabase/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
})

export async function POST(request: NextRequest) {
  try {
    const { priceId } = await request.json()
    const supabase = await createClient()

    // Get authenticated user
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get or create Stripe customer
    const { data: profile } = await supabase
      .from('profiles')
      .select('stripe_customer_id, email')
      .eq('user_id', user.id)
      .single()

    let customerId = profile?.stripe_customer_id

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          supabase_user_id: user.id,
        },
      })
      customerId = customer.id

      // Save customer ID
      await supabase
        .from('profiles')
        .update({ stripe_customer_id: customerId })
        .eq('user_id', user.id)
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/marketing-suite/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing`,
      subscription_data: {
        trial_period_days: 14, // 14-day free trial
        metadata: {
          supabase_user_id: user.id,
        },
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
```

### Frontend Checkout Button

```typescript
// Component: PricingCard.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function CheckoutButton({ priceId }: { priceId: string }) {
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    setLoading(true)

    try {
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      })

      const { url } = await response.json()

      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Payment failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button onClick={handleCheckout} disabled={loading}>
      {loading ? 'Redirecting...' : 'Start Free Trial'}
    </Button>
  )
}
```

---

## 🎣 Step 5: Handle Webhooks

### Webhook Handler

`/src/app/api/webhooks/stripe/route.ts` :

```typescript
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
})

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Admin client
)

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    // Verify webhook signature
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error: any) {
    console.error('Webhook signature verification failed:', error.message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  // Handle events
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      await handleCheckoutCompleted(session)
      break
    }

    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription
      await handleSubscriptionUpdated(subscription)
      break
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription
      await handleSubscriptionDeleted(subscription)
      break
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object as Stripe.Invoice
      await handlePaymentFailed(invoice)
      break
    }

    default:
      console.log(`Unhandled event type: ${event.type}`)
  }

  return NextResponse.json({ received: true })
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const userId = session.subscription_data?.metadata?.supabase_user_id

  if (!userId) {
    console.error('No user ID in session metadata')
    return
  }

  // Get subscription details
  const subscription = await stripe.subscriptions.retrieve(
    session.subscription as string
  )

  const priceId = subscription.items.data[0].price.id
  const planName = getPlanNameFromPriceId(priceId)

  // Update user profile
  await supabase
    .from('profiles')
    .update({
      plan: planName,
      stripe_subscription_id: subscription.id,
      subscription_status: subscription.status,
      subscription_current_period_end: new Date(
        subscription.current_period_end * 1000
      ),
    })
    .eq('user_id', userId)

  console.log(`User ${userId} upgraded to ${planName}`)

  // Send confirmation email
  // await sendPlanUpgradeEmail(userId, planName)
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const userId = subscription.metadata?.supabase_user_id

  if (!userId) return

  const priceId = subscription.items.data[0].price.id
  const planName = getPlanNameFromPriceId(priceId)

  await supabase
    .from('profiles')
    .update({
      plan: planName,
      subscription_status: subscription.status,
      subscription_current_period_end: new Date(
        subscription.current_period_end * 1000
      ),
    })
    .eq('user_id', userId)

  console.log(`Subscription updated for user ${userId}`)
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const userId = subscription.metadata?.supabase_user_id

  if (!userId) return

  // Downgrade to free
  await supabase
    .from('profiles')
    .update({
      plan: 'free',
      subscription_status: 'canceled',
    })
    .eq('user_id', userId)

  console.log(`User ${userId} downgraded to free`)
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  // Send payment failed email
  console.log(`Payment failed for invoice ${invoice.id}`)
  // Implement grace period or suspend account
}

function getPlanNameFromPriceId(priceId: string): string {
  const priceMap: Record<string, string> = {
    [process.env.STRIPE_PRICE_PRO_MONTHLY!]: 'pro',
    [process.env.STRIPE_PRICE_MARKETING_SUITE_MONTHLY!]: 'marketing_suite',
    [process.env.STRIPE_PRICE_TEAM_MONTHLY!]: 'team',
  }

  return priceMap[priceId] || 'free'
}
```

---

## 🧪 Step 6: Test the Flow

### Test Cards

Use Stripe test cards :

**Success** :
```
4242 4242 4242 4242
Any future date / Any 3 digits
```

**Decline** :
```
4000 0000 0000 0002
```

### Test Scenario

1. **Start Free Trial**
   - Click "Start Free Trial" on `/marketing-suite`
   - Redirected to Stripe Checkout
   - Enter test card `4242 4242 4242 4242`
   - Complete payment

2. **Check Webhook**
   - Dashboard > Developers > Webhooks > Events
   - Verify `checkout.session.completed` received

3. **Verify Profile Update**
   - Query Supabase :
   ```sql
   SELECT user_id, plan, stripe_subscription_id, subscription_status
   FROM profiles
   WHERE user_id = 'xxx'
   ```
   - Should show `plan = 'marketing_suite'`

4. **Test Customer Portal**
   - Create portal session :
   ```typescript
   const session = await stripe.billingPortal.sessions.create({
     customer: customerId,
     return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/settings/billing`,
   })
   ```
   - User can cancel/update card

---

## 🚨 Production Checklist

Before going live :

- [ ] **Switch to Live Mode**
  - Dashboard > Toggle "Test mode" OFF
  - Get new API keys (live keys start with `pk_live_` and `sk_live_`)

- [ ] **Update Environment Variables**
  - Vercel : Settings > Environment Variables
  - Add live keys for Production

- [ ] **Webhook URL**
  - Update to production domain
  - Re-copy webhook secret (different from test)

- [ ] **Business Verification**
  - Complete Stripe business verification
  - Required to receive payments

- [ ] **Tax Settings**
  - Dashboard > Settings > Tax
  - Enable automatic tax calculation (Stripe Tax)

- [ ] **Legal**
  - Terms of Service
  - Privacy Policy
  - Refund Policy (14-day money-back guarantee)

- [ ] **Email Notifications**
  - Customize Stripe email templates
  - Dashboard > Settings > Emails

---

## 📊 Monitoring

### Stripe Dashboard

**Key Metrics** :
- MRR (Monthly Recurring Revenue)
- Churn rate
- Failed payments
- Trial conversion rate

### Alerts

Set up alerts for :
- Payment failures
- High churn (>10%)
- Webhook errors

---

## 🛠️ Troubleshooting

### Webhook Not Receiving Events

1. Check webhook URL is accessible (public, not localhost)
2. Verify webhook secret matches `.env`
3. Check Stripe Dashboard > Webhooks > Attempts
4. Test with Stripe CLI :
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

### Checkout Session Not Creating

1. Verify `STRIPE_SECRET_KEY` is set
2. Check Price ID is correct
3. Ensure user is authenticated
4. Check Stripe Dashboard > Logs

### Profile Not Updating After Payment

1. Check webhook received (`checkout.session.completed`)
2. Verify `supabase_user_id` in metadata
3. Check Supabase logs for errors
4. Ensure RLS policies allow update

---

## 📚 Resources

- [Stripe Docs : Subscriptions](https://docs.stripe.com/billing/subscriptions/overview)
- [Stripe Docs : Webhooks](https://docs.stripe.com/webhooks)
- [Stripe Docs : Checkout](https://docs.stripe.com/payments/checkout)
- [Stripe Testing](https://docs.stripe.com/testing)

---

**Last updated** : 2025-01-01
**Author** : Julien Devot
