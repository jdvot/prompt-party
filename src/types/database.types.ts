export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          user_id: string
          name: string | null
          avatar_url: string | null
          ai_test_credits: number | null
          plan: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name?: string | null
          avatar_url?: string | null
          ai_test_credits?: number | null
          plan?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string | null
          avatar_url?: string | null
          ai_test_credits?: number | null
          plan?: string
          created_at?: string
        }
      }
      prompts: {
        Row: {
          id: string
          title: string
          body: string
          tags: string[]
          author: string
          likes_count: number
          is_public: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          body: string
          tags?: string[]
          author: string
          likes_count?: number
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          body?: string
          tags?: string[]
          author?: string
          likes_count?: number
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      likes: {
        Row: {
          user_id: string
          prompt_id: string
          created_at: string
        }
        Insert: {
          user_id: string
          prompt_id: string
          created_at?: string
        }
        Update: {
          user_id?: string
          prompt_id?: string
          created_at?: string
        }
      }
      comments: {
        Row: {
          id: string
          prompt_id: string
          user_id: string
          content: string
          created_at: string
        }
        Insert: {
          id?: string
          prompt_id: string
          user_id: string
          content: string
          created_at?: string
        }
        Update: {
          id?: string
          prompt_id?: string
          user_id?: string
          content?: string
          created_at?: string
        }
      }
      forks: {
        Row: {
          id: string
          original_prompt_id: string
          forked_prompt_id: string
          created_at: string
        }
        Insert: {
          id?: string
          original_prompt_id: string
          forked_prompt_id: string
          created_at?: string
        }
        Update: {
          id?: string
          original_prompt_id?: string
          forked_prompt_id?: string
          created_at?: string
        }
      }
      collections: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string | null
          is_public: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          description?: string | null
          is_public?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          description?: string | null
          is_public?: boolean
          created_at?: string
        }
      }
      collection_items: {
        Row: {
          collection_id: string
          prompt_id: string
          added_at: string
        }
        Insert: {
          collection_id: string
          prompt_id: string
          added_at?: string
        }
        Update: {
          collection_id?: string
          prompt_id?: string
          added_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
