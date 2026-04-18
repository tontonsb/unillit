import { ref, readonly } from 'vue'
import type { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

const user = ref<User | null>(null)

supabase.auth.getSession().then(({ data }) => {
	user.value = data.session?.user ?? null
})

supabase.auth.onAuthStateChange((_event, session) => {
	user.value = session?.user ?? null
})

export function useAuth() {
	async function loginWithDiscord() {
		await supabase.auth.signInWithOAuth({
			provider: 'discord',
			options: {
				redirectTo: window.location.origin,
			},
		})
	}

	async function logout() {
		await supabase.auth.signOut()
	}

	return {
		user: readonly(user),
		loginWithDiscord,
		logout,
	}
}
