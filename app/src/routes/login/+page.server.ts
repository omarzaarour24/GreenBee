import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
  // redirect user logged in
  if (locals.session) {
    throw redirect(302, '/')
  }
}
