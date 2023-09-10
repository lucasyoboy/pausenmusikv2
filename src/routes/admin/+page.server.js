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

		try {
			if(data.accept){
				await locals.pb.collection('pausenmusik').update(data.accept, {"approved": true});
			}
			if(data.decline){
				await locals.pb.collection('pausenmusik').update(data.decline, {"approved": false});
			}
			return {success: true}
		} catch (err) {
			console.log('Error:', err);
			return {success: false}
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
			return {success: false}
		}
	},
};
