'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PlusIcon, CopyIcon, TrashIcon, EyeIcon, EyeOffIcon } from 'lucide-react'
import { format } from 'date-fns'
import crypto from 'crypto'

type ApiKey = {
  id: string
  name: string
  key_prefix: string
  requests_count: number
  monthly_limit: number
  last_used_at: string | null
  created_at: string
  is_active: boolean
}

interface ApiKeyManagerProps {
  initialKeys: ApiKey[]
}

export function ApiKeyManager({ initialKeys }: ApiKeyManagerProps) {
  const [keys, setKeys] = useState<ApiKey[]>(initialKeys)
  const [newKeyName, setNewKeyName] = useState('')
  const [creating, setCreating] = useState(false)
  const [newKeyValue, setNewKeyValue] = useState<string | null>(null)
  const [showKey, setShowKey] = useState(false)
  const supabase = createClient()

  const generateApiKey = () => {
    return 'pp_' + crypto.randomBytes(32).toString('hex')
  }

  const handleCreateKey = async () => {
    if (!newKeyName.trim()) return

    setCreating(true)
    const apiKey = generateApiKey()
    const keyHash = crypto.createHash('sha256').update(apiKey).digest('hex')
    const keyPrefix = apiKey.substring(0, 10) + '...'

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from('api_keys')
        .insert({
          user_id: user.id,
          name: newKeyName,
          key_hash: keyHash,
          key_prefix: keyPrefix,
        })
        .select()
        .single()

      if (error) throw error

      setKeys([data, ...keys])
      setNewKeyValue(apiKey)
      setNewKeyName('')
    } catch (error) {
      console.error('Failed to create API key:', error)
    } finally {
      setCreating(false)
    }
  }

  const handleDeleteKey = async (keyId: string) => {
    if (!confirm('Are you sure you want to delete this API key? This action cannot be undone.')) {
      return
    }

    await supabase.from('api_keys').delete().eq('id', keyId)
    setKeys(keys.filter((k) => k.id !== keyId))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="space-y-6">
      {/* New key created notification */}
      {newKeyValue && (
        <Card className="border-primary bg-primary/5">
          <CardHeader>
            <CardTitle>API Key Created!</CardTitle>
            <CardDescription>
              Copy this key now. You won't be able to see it again.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <Input
                type={showKey ? 'text' : 'password'}
                value={newKeyValue}
                readOnly
                className="font-mono text-sm"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowKey(!showKey)}
              >
                {showKey ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(newKeyValue)}
              >
                <CopyIcon className="h-4 w-4" />
              </Button>
            </div>
            <Button onClick={() => setNewKeyValue(null)} variant="ghost" size="sm">
              I've saved my key
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Create new key */}
      <Card>
        <CardHeader>
          <CardTitle>Create New API Key</CardTitle>
          <CardDescription>
            API keys allow you to access the Prompt Party API programmatically
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <div className="flex-1">
              <Label htmlFor="keyName">Key Name</Label>
              <Input
                id="keyName"
                placeholder="My App Integration"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={handleCreateKey} disabled={creating || !newKeyName.trim()}>
                <PlusIcon className="mr-2 h-4 w-4" />
                Create Key
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Existing keys */}
      <Card>
        <CardHeader>
          <CardTitle>Your API Keys ({keys.length})</CardTitle>
          <CardDescription>
            Manage your existing API keys. Monthly limit: 10,000 requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          {keys.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              No API keys yet. Create one to get started.
            </p>
          ) : (
            <div className="space-y-4">
              {keys.map((key) => (
                <div
                  key={key.id}
                  className="flex items-center justify-between p-4 rounded-lg border"
                >
                  <div className="flex-1">
                    <h4 className="font-medium">{key.name}</h4>
                    <p className="text-sm text-muted-foreground font-mono">
                      {key.key_prefix}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span>
                        {key.requests_count.toLocaleString()} / {key.monthly_limit.toLocaleString()} requests
                      </span>
                      <span>
                        Last used: {key.last_used_at ? format(new Date(key.last_used_at), 'MMM dd, yyyy') : 'Never'}
                      </span>
                      <span>
                        Created: {format(new Date(key.created_at), 'MMM dd, yyyy')}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteKey(key.id)}
                  >
                    <TrashIcon className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* API Documentation link */}
      <Card>
        <CardHeader>
          <CardTitle>API Documentation</CardTitle>
          <CardDescription>
            Learn how to integrate with the Prompt Party API
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-sm space-y-2">
            <p><strong>Base URL:</strong> <code className="bg-muted px-2 py-1 rounded">https://promptparty.com/api/v1</code></p>
            <p><strong>Authentication:</strong> Include your API key in the <code className="bg-muted px-2 py-1 rounded">x-api-key</code> header</p>
            <p><strong>Endpoints:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li><code className="bg-muted px-2 py-1 rounded">GET /prompts</code> - List prompts</li>
              <li><code className="bg-muted px-2 py-1 rounded">POST /prompts</code> - Create prompt</li>
              <li><code className="bg-muted px-2 py-1 rounded">GET /prompts/:id</code> - Get prompt</li>
              <li><code className="bg-muted px-2 py-1 rounded">PUT /prompts/:id</code> - Update prompt</li>
              <li><code className="bg-muted px-2 py-1 rounded">DELETE /prompts/:id</code> - Delete prompt</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
