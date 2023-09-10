import { redirect } from '@sveltejs/kit';
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

		console.log(data.username, data.password)

		try {
			const { token, user } = await locals.pb.collection('pausenmusik_members').authWithPassword(data.username, data.password);
			return {
				success: true,
			};
		} catch (err) {
			console.log('Error:', err);
			return {
				success: false,
			};
		}
	},
};