import { serializeNonPOJOs } from '../lib/utils';

export const load = async ({ locals }) => {
    const trackList = await locals.spotifyApi.playlists.getTracks('40xrjvL6wNJ0mhSUV1sFV3')
	const trackHistory = await locals.pb.collection('pausenmusik').getList(1, 50, {filter: 'approved = true'});
    return {
      playlistTracks: serializeNonPOJOs(trackList),
	  trackHistory: serializeNonPOJOs(trackHistory)
	};
};

export const actions = {
	create: async ({ request, locals }) => {
		const formData = await request.formData();
		const data = Object.fromEntries([...formData]);

		try {
      await locals.pb.collection('pausenmusik').create({"name": data.name,"approved": false});
			return {success: true, message: 'Song "'+data.name+'" hinzugefügt!'}
		} catch (err) {
			console.log('Error:', err);
			return {success: false, message: 'Der Song konnte nicht hinzugefügt werden!'}
		}
	},
};