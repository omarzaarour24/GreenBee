// @ts-nocheck
import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load = async ({ locals }: Parameters<PageServerLoad>[0]) => {
  if (!locals.session) {
    throw redirect(302, '/')
  }
  if (locals.session?.user.app_metadata?.role != 'admin') {
    throw redirect(302, '/dashboard')
  }
}