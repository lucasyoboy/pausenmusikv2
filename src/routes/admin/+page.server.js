import { redirect } from '@sveltejs/kit';
import { serializeNonPOJOs } from '../../lib/utils'

export const load = async ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/admin/login');
	}
	return{
		user: serializeNonPOJOs(locals.pb.authStore.model),
		playList: serializeNonPOJOs(await locals.pb.collection('pausenmusik').getList(undefined)),
	};
};

export const actions = {
	update: async ({ request, locals }) => {
		const formData = await request.formData();
		const data = Object.fromEntries([...formData]);

		console.log(data.id);
		try {
			await locals.pb.collection('pausenmusik').update(data.id, {"approved": data.action});
			return {success: true}
		} catch (err) {
			console.log('Error:', err);
		}
	},
	delete: async ({ request, locals }) => {
		const formData = await request.formData();
		const data = Object.fromEntries([...formData]);

		try {
			await locals.pb.collection('pausenmusik').delete(data.id);
			return {success: true}
		} catch (err) {
			console.log('Error:', err);
		}
	},
};
