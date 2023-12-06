export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      Assets: {
        Row: {
          challenge_id: number
          created_at: string
          file_path: string | null
          id: number
          url: string | null
        }
        Insert: {
          challenge_id: number
          created_at?: string
          file_path?: string | null
          id?: number
          url?: string | null
        }
        Update: {
          challenge_id?: number
          created_at?: string
          file_path?: string | null
          id?: number
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Assets_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "Challenges"
            referencedColumns: ["id"]
          }
        ]
      }
      Challenges: {
        Row: {
          active: boolean
          assets_file_path: Json | null
          author_id: string | null
          created_at: string | null
          game_pin: string | null
          id: number
          image_url: string | null
          instructions: string | null
          name: string | null
          practice: boolean
          reference_image_file_path: string | null
          updated_at: string | null
        }
        Insert: {
          active?: boolean
          assets_file_path?: Json | null
          author_id?: string | null
          created_at?: string | null
          game_pin?: string | null
          id?: number
          image_url?: string | null
          instructions?: string | null
          name?: string | null
          practice?: boolean
          reference_image_file_path?: string | null
          updated_at?: string | null
        }
        Update: {
          active?: boolean
          assets_file_path?: Json | null
          author_id?: string | null
          created_at?: string | null
          game_pin?: string | null
          id?: number
          image_url?: string | null
          instructions?: string | null
          name?: string | null
          practice?: boolean
          reference_image_file_path?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Challenges_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      Results: {
        Row: {
          challenge_id: number
          created_at: string | null
          id: number
          name: string
          updated_at: string | null
          value: string
        }
        Insert: {
          challenge_id: number
          created_at?: string | null
          id?: number
          name: string
          updated_at?: string | null
          value: string
        }
        Update: {
          challenge_id?: number
          created_at?: string | null
          id?: number
          name?: string
          updated_at?: string | null
          value?: string
        }
        Relationships: [
          {
            foreignKeyName: "Results_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "Challenges"
            referencedColumns: ["id"]
          }
        ]
      }
      Stats: {
        Row: {
          challenge_id: number | null
          created_at: string | null
          id: number
          key: string | null
          name: string | null
          user_id: string
          value: string | null
        }
        Insert: {
          challenge_id?: number | null
          created_at?: string | null
          id?: number
          key?: string | null
          name?: string | null
          user_id: string
          value?: string | null
        }
        Update: {
          challenge_id?: number | null
          created_at?: string | null
          id?: number
          key?: string | null
          name?: string | null
          user_id?: string
          value?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Stats_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "Challenges"
            referencedColumns: ["id"]
          }
        ]
      }
      Vote: {
        Row: {
          challenge_id: number
          created_at: string | null
          id: number
          result_id: number
        }
        Insert: {
          challenge_id: number
          created_at?: string | null
          id?: number
          result_id: number
        }
        Update: {
          challenge_id?: number
          created_at?: string | null
          id?: number
          result_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "Vote_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "Challenges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Vote_result_id_fkey"
            columns: ["result_id"]
            isOneToOne: false
            referencedRelation: "Results"
            referencedColumns: ["id"]
          }
        ]
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
