import { describe, it, expect, vi, beforeEach } from 'vitest'
import { POST, DELETE } from '@/app/api/prompts/[id]/like/route'
import { createClient } from '@/lib/supabase/server'

vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(),
}))

describe('API /api/prompts/[id]/like', () => {
  let mockSupabase: any

  beforeEach(() => {
    mockSupabase = {
      from: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      delete: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      select: vi.fn().mockReturnThis(),
      single: vi.fn(),
      auth: {
        getUser: vi.fn(),
      },
    }
    vi.mocked(createClient).mockResolvedValue(mockSupabase as any)
  })

  describe('POST (like)', () => {
    it('should create a like when authenticated', async () => {
      const mockUser = { id: 'user-1', email: 'test@example.com' }
      mockSupabase.auth.getUser.mockResolvedValue({ data: { user: mockUser }, error: null })

      mockSupabase.from.mockReturnValue({
        insert: vi.fn().mockResolvedValue({ data: null, error: null }),
      })

      const request = new Request('http://localhost:3000/api/prompts/prompt-1/like', {
        method: 'POST',
      })

      const response = await POST(request, { params: Promise.resolve({ id: 'prompt-1' }) })
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
    })

    it('should return 401 when not authenticated', async () => {
      mockSupabase.auth.getUser.mockResolvedValue({ data: { user: null }, error: null })

      const request = new Request('http://localhost:3000/api/prompts/prompt-1/like', {
        method: 'POST',
      })

      const response = await POST(request, { params: Promise.resolve({ id: 'prompt-1' }) })

      expect(response.status).toBe(401)
    })

    it('should handle duplicate likes gracefully', async () => {
      const mockUser = { id: 'user-1', email: 'test@example.com' }
      mockSupabase.auth.getUser.mockResolvedValue({ data: { user: mockUser }, error: null })

      mockSupabase.from.mockReturnValue({
        insert: vi.fn().mockResolvedValue({
          data: null,
          error: { code: '23505', message: 'duplicate key' },
        }),
      })

      const request = new Request('http://localhost:3000/api/prompts/prompt-1/like', {
        method: 'POST',
      })

      const response = await POST(request, { params: Promise.resolve({ id: 'prompt-1' }) })

      expect(response.status).toBe(400)
    })
  })

  describe('DELETE (unlike)', () => {
    it('should delete a like when authenticated', async () => {
      const mockUser = { id: 'user-1', email: 'test@example.com' }
      mockSupabase.auth.getUser.mockResolvedValue({ data: { user: mockUser }, error: null })

      const mockEq = vi.fn().mockResolvedValue({ data: null, error: null })
      mockSupabase.from.mockReturnValue({
        delete: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
      })
      mockSupabase.from().delete().eq.mockReturnValue({
        eq: mockEq,
      })

      const request = new Request('http://localhost:3000/api/prompts/prompt-1/like', {
        method: 'DELETE',
      })

      const response = await DELETE(request, { params: Promise.resolve({ id: 'prompt-1' }) })

      expect(response.status).toBe(200)
    })

    it('should return 401 when not authenticated', async () => {
      mockSupabase.auth.getUser.mockResolvedValue({ data: { user: null }, error: null })

      const request = new Request('http://localhost:3000/api/prompts/prompt-1/like', {
        method: 'DELETE',
      })

      const response = await DELETE(request, { params: Promise.resolve({ id: 'prompt-1' }) })

      expect(response.status).toBe(401)
    })
  })
})
