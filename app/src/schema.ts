export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json }
	| Json[]

export interface Database {
	public: {
		Tables: {
			profiles: {
				Row: {
					id: number
					update_at: string | null
					username: string | null
					avatar_url: string | null
					website: string | null
				}
				Insert: {
					id?: number
					update_at?: string | null
					username?: string | null
					avatar_url?: string | null
					website?: string | null
				}
				id?: number
				update_at?: string | null
				username?: string | null
				avatar_url?: string | null
				website?: string | null
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

