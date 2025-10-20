import { describe, it, expect, vi, beforeEach } from 'vitest'
import { GET, POST } from '@/app/api/prompts/route'
import { createClient } from '@/lib/supabase/server'

// Mock Supabase client
vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(),
}))

describe('API /api/prompts', () => {
  let mockSupabase: any

  beforeEach(() => {
    mockSupabase = {
      from: vi.fn().mockReturnThis(),
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      in: vi.fn().mockReturnThis(),
      range: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
      gte: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      single: vi.fn(),
      auth: {
        getUser: vi.fn(),
      },
    }
    vi.mocked(createClient).mockResolvedValue(mockSupabase as any)
  })

  describe('GET', () => {
    it('should return prompts sorted by new (default)', async () => {
      const mockPrompts = [
        {
          id: '1',
          title: 'Test Prompt',
          body: 'Test body',
          author: 'user-1',
          tags: [],
          likes_count: 0,
          is_public: true,
          created_at: new Date().toISOString(),
        },
      ]

      const mockProfiles = [
        {
          user_id: 'user-1',
          name: 'Test User',
          avatar_url: null,
        },
      ]

      mockSupabase.from.mockImplementation((table: string) => {
        if (table === 'prompts') {
          return {
            ...mockSupabase,
            select: vi.fn().mockReturnThis(),
            eq: vi.fn().mockReturnThis(),
            range: vi.fn().mockReturnThis(),
            order: vi.fn().mockResolvedValue({ data: mockPrompts, error: null }),
          }
        }
        if (table === 'profiles') {
          return {
            ...mockSupabase,
            select: vi.fn().mockReturnThis(),
            in: vi.fn().mockResolvedValue({ data: mockProfiles, error: null }),
          }
        }
        return mockSupabase
      })

      const request = new Request('http://localhost:3000/api/prompts?sort=new&page=1')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.prompts).toBeDefined()
      expect(data.prompts).toHaveLength(1)
      expect(data.prompts[0].profiles).toBeDefined()
    })

    it('should return prompts sorted by top', async () => {
      const mockPrompts = [
        {
          id: '1',
          title: 'Top Prompt',
          body: 'Test',
          author: 'user-1',
          tags: [],
          likes_count: 100,
          is_public: true,
          created_at: new Date().toISOString(),
        },
      ]

      mockSupabase.from.mockReturnValue({
        ...mockSupabase,
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        range: vi.fn().mockReturnThis(),
        order: vi.fn().mockResolvedValue({ data: mockPrompts, error: null }),
      })

      const request = new Request('http://localhost:3000/api/prompts?sort=top')
      const response = await GET(request)

      expect(response.status).toBe(200)
    })

    it('should handle database errors gracefully', async () => {
      mockSupabase.from.mockReturnValue({
        ...mockSupabase,
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        range: vi.fn().mockReturnThis(),
        order: vi.fn().mockResolvedValue({
          data: null,
          error: { message: 'Database error' },
        }),
      })

      const request = new Request('http://localhost:3000/api/prompts')
      const response = await GET(request)

      expect(response.status).toBe(500)
    })
  })

  describe('POST', () => {
    it('should create a prompt when authenticated', async () => {
      const mockUser = { id: 'user-1', email: 'test@example.com' }
      mockSupabase.auth.getUser.mockResolvedValue({ data: { user: mockUser }, error: null })

      const mockPrompt = {
        id: 'prompt-1',
        title: 'New Prompt',
        body: 'Test body',
        tags: ['test'],
        author: 'user-1',
        is_public: true,
        created_at: new Date().toISOString(),
      }

      mockSupabase.from.mockReturnValue({
        insert: vi.fn().mockReturnThis(),
        select: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({ data: mockPrompt, error: null }),
      })

      const request = new Request('http://localhost:3000/api/prompts', {
        method: 'POST',
        body: JSON.stringify({
          title: 'New Prompt',
          body: 'Test body',
          tags: ['test'],
          is_public: true,
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(201)
      expect(data.prompt).toBeDefined()
      expect(data.prompt.title).toBe('New Prompt')
    })

    it('should return 401 when not authenticated', async () => {
      mockSupabase.auth.getUser.mockResolvedValue({ data: { user: null }, error: null })

      const request = new Request('http://localhost:3000/api/prompts', {
        method: 'POST',
        body: JSON.stringify({
          title: 'Test',
          body: 'Test',
        }),
      })

      const response = await POST(request)

      expect(response.status).toBe(401)
    })

    it('should return 400 when missing required fields', async () => {
      const mockUser = { id: 'user-1', email: 'test@example.com' }
      mockSupabase.auth.getUser.mockResolvedValue({ data: { user: mockUser }, error: null })

      const request = new Request('http://localhost:3000/api/prompts', {
        method: 'POST',
        body: JSON.stringify({
          title: 'Only title',
          // Missing body
        }),
      })

      const response = await POST(request)

      expect(response.status).toBe(400)
    })
  })
})
