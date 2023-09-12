import { error, invalid, redirect } from "@sveltejs/kit";
import { serializeNonPOJOs } from '../../../lib/utils';

export const load = ({ locals }) => {
	if (locals.pb.authStore.isValid) {
		throw redirect(303, '/admin');
	}
};

export const actions = {
	login: async ({ request, locals }) => {
		const formData = await request.formData();
		const data = Object.fromEntries([...formData]);

		try {
			await locals.pb.collection('pausenmusik_members').authWithPassword(data.username, data.password);
		} catch (err) {
			console.log('Error:', err);
			throw error(err.status, err.message);
		}
	},
};