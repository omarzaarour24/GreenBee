// @ts-nocheck
import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load = async ({ locals }: Parameters<PageServerLoad>[0]) => {
  // redirect user logged in
  if (locals.session) {
    throw redirect(302, '/')
  }
}
