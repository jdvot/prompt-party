export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      collection_items: {
        Row: {
          added_at: string | null
          collection_id: string
          prompt_id: string
        }
        Insert: {
          added_at?: string | null
          collection_id: string
          prompt_id: string
        }
        Update: {
          added_at?: string | null
          collection_id?: string
          prompt_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "collection_items_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "collections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "collection_items_prompt_id_fkey"
            columns: ["prompt_id"]
            isOneToOne: false
            referencedRelation: "prompts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "collection_items_prompt_id_fkey"
            columns: ["prompt_id"]
            isOneToOne: false
            referencedRelation: "prompts_with_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      collections: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_public: boolean | null
          name: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          name: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          name?: string
          user_id?: string
        }
        Relationships: []
      }
      comments: {
        Row: {
          content: string
          created_at: string | null
          id: string
          prompt_id: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          prompt_id: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          prompt_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_prompt_id_fkey"
            columns: ["prompt_id"]
            isOneToOne: false
            referencedRelation: "prompts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_prompt_id_fkey"
            columns: ["prompt_id"]
            isOneToOne: false
            referencedRelation: "prompts_with_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      forks: {
        Row: {
          created_at: string | null
          forked_prompt_id: string
          id: string
          original_prompt_id: string
        }
        Insert: {
          created_at?: string | null
          forked_prompt_id: string
          id?: string
          original_prompt_id: string
        }
        Update: {
          created_at?: string | null
          forked_prompt_id?: string
          id?: string
          original_prompt_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "forks_forked_prompt_id_fkey"
            columns: ["forked_prompt_id"]
            isOneToOne: true
            referencedRelation: "prompts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forks_forked_prompt_id_fkey"
            columns: ["forked_prompt_id"]
            isOneToOne: true
            referencedRelation: "prompts_with_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forks_original_prompt_id_fkey"
            columns: ["original_prompt_id"]
            isOneToOne: false
            referencedRelation: "prompts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forks_original_prompt_id_fkey"
            columns: ["original_prompt_id"]
            isOneToOne: false
            referencedRelation: "prompts_with_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      likes: {
        Row: {
          created_at: string | null
          prompt_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          prompt_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          prompt_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "likes_prompt_id_fkey"
            columns: ["prompt_id"]
            isOneToOne: false
            referencedRelation: "prompts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "likes_prompt_id_fkey"
            columns: ["prompt_id"]
            isOneToOne: false
            referencedRelation: "prompts_with_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          ai_test_credits: number | null
          avatar_url: string | null
          created_at: string | null
          id: string
          name: string | null
          onboarding_completed: boolean | null
          onboarding_completed_at: string | null
          onboarding_step: number | null
          plan: string | null
          selected_interests: string[] | null
          user_id: string
          username: string | null
        }
        Insert: {
          ai_test_credits?: number | null
          avatar_url?: string | null
          created_at?: string | null
          id?: string
          name?: string | null
          onboarding_completed?: boolean | null
          onboarding_completed_at?: string | null
          onboarding_step?: number | null
          plan?: string | null
          selected_interests?: string[] | null
          user_id: string
          username?: string | null
        }
        Update: {
          ai_test_credits?: number | null
          avatar_url?: string | null
          created_at?: string | null
          id?: string
          name?: string | null
          onboarding_completed?: boolean | null
          onboarding_completed_at?: string | null
          onboarding_step?: number | null
          plan?: string | null
          selected_interests?: string[] | null
          user_id?: string
          username?: string | null
        }
        Relationships: []
      }
      prompts: {
        Row: {
          author: string
          body: string
          comments_count: number | null
          created_at: string | null
          id: string
          is_public: boolean | null
          likes_count: number | null
          tags: string[] | null
          title: string
          updated_at: string | null
          views_count: number | null
        }
        Insert: {
          author: string
          body: string
          comments_count?: number | null
          created_at?: string | null
          id?: string
          is_public?: boolean | null
          likes_count?: number | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
          views_count?: number | null
        }
        Update: {
          author?: string
          body?: string
          comments_count?: number | null
          created_at?: string | null
          id?: string
          is_public?: boolean | null
          likes_count?: number | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          views_count?: number | null
        }
        Relationships: []
      }
      prompt_versions: {
        Row: {
          id: string
          prompt_id: string
          version_number: number
          title: string
          body: string
          category: string | null
          tags: string[] | null
          changed_by: string
          changed_by_name: string
          change_summary: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          prompt_id: string
          version_number: number
          title: string
          body: string
          category?: string | null
          tags?: string[] | null
          changed_by: string
          changed_by_name: string
          change_summary?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          prompt_id?: string
          version_number?: number
          title?: string
          body?: string
          category?: string | null
          tags?: string[] | null
          changed_by?: string
          changed_by_name?: string
          change_summary?: string | null
          created_at?: string | null
        }
        Relationships: []
      }
      api_keys: {
        Row: {
          id: string
          user_id: string
          name: string
          key_hash: string
          key_prefix: string
          last_used_at: string | null
          requests_count: number | null
          monthly_limit: number | null
          is_active: boolean | null
          created_at: string | null
          expires_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          key_hash: string
          key_prefix: string
          last_used_at?: string | null
          requests_count?: number | null
          monthly_limit?: number | null
          is_active?: boolean | null
          created_at?: string | null
          expires_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          key_hash?: string
          key_prefix?: string
          last_used_at?: string | null
          requests_count?: number | null
          monthly_limit?: number | null
          is_active?: boolean | null
          created_at?: string | null
          expires_at?: string | null
        }
        Relationships: []
      }
      challenges: {
        Row: { id: string; title: string; description: string; type: string; [key: string]: any }
        Insert: { id?: string; [key: string]: any }
        Update: { id?: string; [key: string]: any }
        Relationships: []
      }
      challenge_submissions: {
        Row: { id: string; challenge_id: string; prompt_id: string; user_id: string; votes: number; [key: string]: any }
        Insert: { id?: string; [key: string]: any }
        Update: { id?: string; [key: string]: any }
        Relationships: []
      }
      challenge_votes: {
        Row: { submission_id: string; user_id: string; [key: string]: any }
        Insert: { submission_id: string; user_id: string; [key: string]: any }
        Update: { [key: string]: any }
        Relationships: []
      }
      user_progress: {
        Row: { id: string; user_id: string; level: number; xp: number; prompts_count: number; likes_received: number; [key: string]: any }
        Insert: { id?: string; user_id: string; [key: string]: any }
        Update: { id?: string; [key: string]: any }
        Relationships: []
      }
      badges: {
        Row: { id: string; name: string; description: string; icon: string; [key: string]: any }
        Insert: { id?: string; [key: string]: any }
        Update: { id?: string; [key: string]: any }
        Relationships: []
      }
      user_badges: {
        Row: { user_id: string; badge_id: string; earned_at: string; [key: string]: any }
        Insert: { user_id: string; badge_id: string; [key: string]: any }
        Update: { [key: string]: any }
        Relationships: []
      }
      user_challenge_progress: {
        Row: { user_id: string; challenge_id: string; progress: number; completed: boolean; [key: string]: any }
        Insert: { user_id: string; challenge_id: string; [key: string]: any }
        Update: { [key: string]: any }
        Relationships: []
      }
      notification_preferences: {
        Row: { user_id: string; [key: string]: any }
        Insert: { user_id: string; [key: string]: any }
        Update: { user_id?: string; [key: string]: any }
        Relationships: []
      }
      prompt_templates: {
        Row: { id: string; title: string; description: string; content: string; category: string; [key: string]: any }
        Insert: { id?: string; [key: string]: any }
        Update: { id?: string; [key: string]: any }
        Relationships: []
      }
      notifications: {
        Row: { id: string; user_id: string; actor_id: string; actor_name: string; type: string; content: Json; is_read: boolean; created_at: string; [key: string]: any }
        Insert: { id?: string; user_id: string; [key: string]: any }
        Update: { id?: string; [key: string]: any }
        Relationships: []
      }
    }
    Views: {
      prompts_with_profiles: {
        Row: {
          author: string | null
          author_avatar: string | null
          author_name: string | null
          author_username: string | null
          body: string | null
          created_at: string | null
          id: string | null
          is_public: boolean | null
          likes_count: number | null
          tags: string[] | null
          title: string | null
          updated_at: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      complete_onboarding: {
        Args: { user_id_param: string }
        Returns: undefined
      }
      restore_prompt_version: {
        Args: { p_prompt_id: string; p_version_id: string }
        Returns: boolean
      }
      increment_prompt_views: {
        Args: { prompt_id: string }
        Returns: undefined
      }
      check_api_rate_limit: {
        Args: { key_hash_input: string }
        Returns: boolean
      }
      increment_api_usage: {
        Args: { key_hash_input: string }
        Returns: undefined
      }
      log_api_request: {
        Args: {
          key_id: string
          endpoint_path: string
          http_method: string
          status: number
          response_time: number
          ip?: string
          agent?: string
        }
        Returns: string
      }
      mark_notification_read: {
        Args: { notification_id: string }
        Returns: undefined
      }
      mark_all_notifications_read: {
        Args: Record<string, never>
        Returns: undefined
      }
      increment_template_usage: {
        Args: { template_uuid: string }
        Returns: undefined
      }
      increment_submission_votes: {
        Args: { submission_uuid: string }
        Returns: undefined
      }
      decrement_submission_votes: {
        Args: { submission_uuid: string }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
