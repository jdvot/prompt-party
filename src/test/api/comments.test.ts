import { describe, it, expect, vi, beforeEach } from 'vitest'
import { GET, POST, DELETE } from '@/app/api/prompts/[id]/comments/route'
import { createClient } from '@/lib/supabase/server'

vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(),
}))

describe('API /api/prompts/[id]/comments', () => {
  let mockSupabase: any

  beforeEach(() => {
    mockSupabase = {
      from: vi.fn().mockReturnThis(),
      select: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      delete: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
      single: vi.fn(),
      auth: {
        getUser: vi.fn(),
      },
    }
    vi.mocked(createClient).mockResolvedValue(mockSupabase as any)
  })

  describe('GET', () => {
    it('should return comments for a prompt', async () => {
      const mockComments = [
        {
          id: 'comment-1',
          content: 'Great prompt!',
          user_id: 'user-1',
          prompt_id: 'prompt-1',
          created_at: new Date().toISOString(),
        },
      ]

      const mockProfile = {
        name: 'Test User',
        avatar_url: null,
      }

      mockSupabase.from.mockImplementation((table: string) => {
        if (table === 'comments') {
          return {
            select: vi.fn().mockReturnThis(),
            eq: vi.fn().mockReturnThis(),
            order: vi.fn().mockResolvedValue({ data: mockComments, error: null }),
          }
        }
        if (table === 'profiles') {
          return {
            select: vi.fn().mockReturnThis(),
            eq: vi.fn().mockReturnThis(),
            single: vi.fn().mockResolvedValue({ data: mockProfile, error: null }),
          }
        }
        return mockSupabase
      })

      const request = new Request('http://localhost:3000/api/prompts/prompt-1/comments')
      const response = await GET(request, { params: Promise.resolve({ id: 'prompt-1' }) })
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.comments).toHaveLength(1)
      expect(data.comments[0].profiles).toEqual(mockProfile)
    })
  })

  describe('POST', () => {
    it('should create a comment when authenticated', async () => {
      const mockUser = { id: 'user-1', email: 'test@example.com' }
      mockSupabase.auth.getUser.mockResolvedValue({ data: { user: mockUser }, error: null })

      const mockComment = {
        id: 'comment-1',
        content: 'Nice!',
        user_id: 'user-1',
        prompt_id: 'prompt-1',
        created_at: new Date().toISOString(),
      }

      mockSupabase.from.mockReturnValue({
        insert: vi.fn().mockReturnThis(),
        select: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({ data: mockComment, error: null }),
      })

      const request = new Request('http://localhost:3000/api/prompts/prompt-1/comments', {
        method: 'POST',
        body: JSON.stringify({ content: 'Nice!' }),
      })

      const response = await POST(request, { params: Promise.resolve({ id: 'prompt-1' }) })
      const data = await response.json()

      expect(response.status).toBe(201)
      expect(data.comment).toBeDefined()
    })

    it('should return 401 when not authenticated', async () => {
      mockSupabase.auth.getUser.mockResolvedValue({ data: { user: null }, error: null })

      const request = new Request('http://localhost:3000/api/prompts/prompt-1/comments', {
        method: 'POST',
        body: JSON.stringify({ content: 'Test' }),
      })

      const response = await POST(request, { params: Promise.resolve({ id: 'prompt-1' }) })

      expect(response.status).toBe(401)
    })

    it('should return 400 when content is empty', async () => {
      const mockUser = { id: 'user-1', email: 'test@example.com' }
      mockSupabase.auth.getUser.mockResolvedValue({ data: { user: mockUser }, error: null })

      const request = new Request('http://localhost:3000/api/prompts/prompt-1/comments', {
        method: 'POST',
        body: JSON.stringify({ content: '' }),
      })

      const response = await POST(request, { params: Promise.resolve({ id: 'prompt-1' }) })

      expect(response.status).toBe(400)
    })
  })

  describe('DELETE', () => {
    it('should delete own comment', async () => {
      const mockUser = { id: 'user-1', email: 'test@example.com' }
      mockSupabase.auth.getUser.mockResolvedValue({ data: { user: mockUser }, error: null })

      mockSupabase.from.mockImplementation((table: string) => {
        if (table === 'comments') {
          return {
            select: vi.fn().mockReturnThis(),
            eq: vi.fn().mockReturnThis(),
            single: vi.fn().mockResolvedValue({
              data: { id: 'comment-1', user_id: 'user-1' },
              error: null,
            }),
            delete: vi.fn().mockReturnThis(),
          }
        }
        return mockSupabase
      })

      const request = new Request('http://localhost:3000/api/prompts/prompt-1/comments', {
        method: 'DELETE',
        body: JSON.stringify({ commentId: 'comment-1' }),
      })

      const response = await DELETE(request, { params: Promise.resolve({ id: 'prompt-1' }) })

      expect(response.status).toBe(200)
    })

    it('should return 403 when deleting others comment', async () => {
      const mockUser = { id: 'user-1', email: 'test@example.com' }
      mockSupabase.auth.getUser.mockResolvedValue({ data: { user: mockUser }, error: null })

      mockSupabase.from.mockReturnValue({
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({
          data: { id: 'comment-1', user_id: 'user-2' },
          error: null,
        }),
      })

      const request = new Request('http://localhost:3000/api/prompts/prompt-1/comments', {
        method: 'DELETE',
        body: JSON.stringify({ commentId: 'comment-1' }),
      })

      const response = await DELETE(request, { params: Promise.resolve({ id: 'prompt-1' }) })

      expect(response.status).toBe(403)
    })
  })
})
