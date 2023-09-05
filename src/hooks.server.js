// src/hooks.server.js
import { PUBLIC_POCKETBASE_URL, PUBLIC_SPOTIFY_CLIENT, PUBLIC_SPOTIFY_SECRET } from '$env/static/public';
import PocketBase from 'pocketbase';
import { Client } from "spotify-api.js";

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    event.locals.spotifyApi = await Client.create({ token: { clientID: PUBLIC_SPOTIFY_CLIENT, clientSecret: PUBLIC_SPOTIFY_SECRET } });

    event.locals.pb = new PocketBase(PUBLIC_POCKETBASE_URL);

    // load the store data from the request cookie string
    event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

    try {
        // get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
        event.locals.pb.authStore.isValid && await event.locals.pb.collection('fkco_members').authRefresh();
    } catch (_) {
        // clear the auth store on failed refresh
        event.locals.pb.authStore.clear();
    }

    const response = await resolve(event);

    // send back the default 'pb_auth' cookie to the client with the latest store state
    response.headers.append('set-cookie', event.locals.pb.authStore.exportToCookie());

    return response;
}