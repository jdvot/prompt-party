'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Progress } from '@/components/ui/progress'
import { useToast } from '@/hooks/use-toast'
import {
  Key,
  Copy,
  Eye,
  EyeOff,
  Trash2,
  Plus,
  AlertCircle,
  Activity,
  Zap,
  Code,
  Webhook,
} from 'lucide-react'
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations'

interface ApiKey {
  id: string
  name: string
  key: string
  created_at: string
  last_used_at: string | null
  requests_count: number
}

interface ApiAccessDashboardProps {
  apiKeys: ApiKey[]
  userId: string
}

export function ApiAccessDashboard({ apiKeys: initialApiKeys, userId }: ApiAccessDashboardProps) {
  const { toast } = useToast()
  const [apiKeys, setApiKeys] = useState<ApiKey[]>(initialApiKeys)
  const [newKeyName, setNewKeyName] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set())

  const totalRequests = apiKeys.reduce((sum, key) => sum + key.requests_count, 0)
  const monthlyLimit = 10000 // Business plan limit
  const usagePercentage = (totalRequests / monthlyLimit) * 100

  const createApiKey = async () => {
    if (!newKeyName.trim()) {
      toast({
        variant: 'destructive',
        title: 'Name required',
        description: 'Please enter a name for your API key',
      })
      return
    }

    setIsCreating(true)
    // Simulate API key creation
    setTimeout(() => {
      const newKey: ApiKey = {
        id: Math.random().toString(36).substr(2, 9),
        name: newKeyName,
        key: `pp_${Math.random().toString(36).substr(2, 32)}`,
        created_at: new Date().toISOString(),
        last_used_at: null,
        requests_count: 0,
      }
      setApiKeys([newKey, ...apiKeys])
      setNewKeyName('')
      setIsCreating(false)
      toast({
        title: 'API key created',
        description: 'Your new API key has been generated. Make sure to copy it now!',
      })
    }, 1000)
  }

  const deleteApiKey = (id: string) => {
    setApiKeys(apiKeys.filter((k) => k.id !== id))
    toast({ title: 'API key deleted', description: 'The API key has been revoked.' })
  }

  const copyApiKey = (key: string) => {
    navigator.clipboard.writeText(key)
    toast({ title: 'Copied!', description: 'API key copied to clipboard' })
  }

  const toggleKeyVisibility = (id: string) => {
    const newVisible = new Set(visibleKeys)
    if (newVisible.has(id)) {
      newVisible.delete(id)
    } else {
      newVisible.add(id)
    }
    setVisibleKeys(newVisible)
  }

  const maskKey = (key: string) => {
    return `${key.substring(0, 8)}${'*'.repeat(24)}${key.substring(key.length - 4)}`
  }

  return (
    <div className="space-y-8">
      {/* Usage Overview */}
      <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="grid gap-4 md:grid-cols-3">
        <motion.div variants={staggerItem}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">API Keys</CardTitle>
              <Key className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{apiKeys.length}</div>
              <p className="text-xs text-muted-foreground">Active keys</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={staggerItem}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Requests (Month)</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalRequests.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">of {monthlyLimit.toLocaleString()} limit</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={staggerItem}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rate Limit</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">10,000/hr</div>
              <p className="text-xs text-muted-foreground">Business plan</p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Usage Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Usage</CardTitle>
          <CardDescription>API requests this month</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Progress value={usagePercentage} />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{totalRequests.toLocaleString()} requests</span>
            <span>{monthlyLimit.toLocaleString()} limit</span>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="keys">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="keys">API Keys</TabsTrigger>
          <TabsTrigger value="docs">Documentation</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
        </TabsList>

        <TabsContent value="keys" className="mt-6 space-y-6">
          {/* Create New Key */}
          <Card>
            <CardHeader>
              <CardTitle>Create New API Key</CardTitle>
              <CardDescription>Generate a new API key for your applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3">
                <Input
                  placeholder="Key name (e.g., Production App)"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && createApiKey()}
                />
                <Button onClick={createApiKey} disabled={isCreating}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* API Keys List */}
          <Card>
            <CardHeader>
              <CardTitle>Your API Keys</CardTitle>
              <CardDescription>Manage and monitor your API keys</CardDescription>
            </CardHeader>
            <CardContent>
              {apiKeys.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  No API keys yet. Create one to get started!
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Key</TableHead>
                      <TableHead>Requests</TableHead>
                      <TableHead>Last Used</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {apiKeys.map((apiKey) => (
                      <TableRow key={apiKey.id}>
                        <TableCell className="font-medium">{apiKey.name}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <code className="text-sm">
                              {visibleKeys.has(apiKey.id) ? apiKey.key : maskKey(apiKey.key)}
                            </code>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleKeyVisibility(apiKey.id)}
                            >
                              {visibleKeys.has(apiKey.id) ? (
                                <EyeOff className="h-3 w-3" />
                              ) : (
                                <Eye className="h-3 w-3" />
                              )}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyApiKey(apiKey.key)}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>{apiKey.requests_count.toLocaleString()}</TableCell>
                        <TableCell>
                          {apiKey.last_used_at
                            ? new Date(apiKey.last_used_at).toLocaleDateString()
                            : 'Never'}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteApiKey(apiKey.id)}
                          >
                            <Trash2 className="h-3 w-3 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="docs" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5" />
                API Documentation
              </CardTitle>
              <CardDescription>Learn how to integrate with the Prompt Party API</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Authentication</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Include your API key in the Authorization header:
                </p>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                  <code className="text-sm">{`curl -H "Authorization: Bearer YOUR_API_KEY" \\
  https://api.promptparty.com/v1/prompts`}</code>
                </pre>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Get All Prompts</h3>
                <Badge variant="outline" className="mb-3">GET</Badge>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                  <code className="text-sm">{`GET /v1/prompts
Parameters:
  - page (optional): Page number
  - limit (optional): Results per page (max 100)
  - category (optional): Filter by category`}</code>
                </pre>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Get Single Prompt</h3>
                <Badge variant="outline" className="mb-3">GET</Badge>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                  <code className="text-sm">{`GET /v1/prompts/:id`}</code>
                </pre>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Create Prompt</h3>
                <Badge variant="outline" className="mb-3">POST</Badge>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                  <code className="text-sm">{`POST /v1/prompts
Body:
{
  "title": "string",
  "body": "string",
  "category": "string",
  "tags": ["string"],
  "is_public": boolean
}`}</code>
                </pre>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Full API documentation is available at{' '}
                  <a href="https://docs.promptparty.com/api" className="underline">
                    docs.promptparty.com/api
                  </a>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="webhooks" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Webhook className="w-5 h-5" />
                Webhooks
              </CardTitle>
              <CardDescription>Receive real-time notifications for events</CardDescription>
            </CardHeader>
            <CardContent>
              <Alert className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Webhook configuration coming soon. You'll be able to receive notifications for:
                  new likes, comments, remixes, and followers.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Webhook Endpoint</h4>
                    <p className="text-sm text-muted-foreground">POST https://your-app.com/webhook</p>
                  </div>
                  <Badge variant="secondary">Coming Soon</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
