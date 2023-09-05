<script>
  import { enhance } from '$app/forms';
  import PopupHistroy from '../lib/history.svelte'
  import PopupNew from '../lib/new.svelte'
  import { toggleHistory, toggleNew } from '../lib/stores';

  export let data;
  export let form;

  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

</script>

<PopupHistroy data={data.trackHistory}/>
<PopupNew />
<div class="container-fluid font-montserrat">
  <div class="bg-[url('../images/background.webp')] bg-cover p-0 md:p-16">
    <div class="bg-primery bg-opacity-80 p-6 md:p-20">
      <div class="grid grid-cols-1 lg:grid-cols-2 items-center">
        <div class="text-center lg:text-left">
          <span class="font-light uppercase text-2xl sm:text-6xl "><span class="font-bold text-four text-4xl sm:text-6xl md:text-7xl">Pausenmusik</span><br> Einsendungen für den CSN</span>
        </div>
        <div class="flex justify-center lg:justify-end">
          <img class=" h-9/12  w-9/12 sm:h-5/12  sm:w-5/12 " alt="Colegio Secundario Neuland Logo" src="images/logo.svg">
        </div>
      </div>
      <div class="mt-14 flex justify-center items-center">
          <form class="relative w-full md:w-3/4 -z-0" action="?/create" method="post" use:enhance>
              <input type="text" name="name" class="sm:p-5 p-3 w-full text-xl rounded-lg" placeholder="Musik (Artist)" required>
              <button type="submit" class="absolute top-0 right-0 p-2.5 h-full sm:text-xl font-bold text-white bg-three rounded-r-lg ">SENDEN</button>
          </form>
      </div>
    </div>
  </div>
  <div class="md:p-16 p-6">
    <div class="flex justify-between items-center">
      <div>
        <span class="text-2xl font-semibold uppercase">PlayList</span>
        <p class="uppercase text-lg">Hinzugefügte Songs </p>
      </div>
      <div class="flex justify-center items-center gap-2">
        <a href="https://open.spotify.com/playlist/40xrjvL6wNJ0mhSUV1sFV3"><img class="w-10" src="images/Icons/spotify.svg" alt="spotify-url"></a>
        <a href="#!" on:click={() => (toggleHistory.set(true))}><img class="w-10" src="images/Icons/history.svg" alt="song-history"></a>
      </div>
    </div>
    <div class="mt-5">
      {#each data.playlistTracks as song, index}
        <a class="relative overflow-hidden bg-white p-4 flex flex-row items-center rounded-md mb-3 hover:bg-gray-200" href="{song.track.uri}">
          <span class="font-bold text-xl mx-2">{index+1}</span>
          <img class="mx-2 w-16 h-16 rounded-md" src="{song.track.album.images[0].url}" alt="spotify-thumnail">
          <div class="mx-2">
            <span class="font-semibold text-xl">{song.track.name}</span>
            <p class="text-lg">
              {#each song.track.artists as artist}
                {artist.name}
              {/each}
            </p>
          </div>
          <span class="font-bold text-xl ml-auto">{millisToMinutesAndSeconds(song.track.duration)}</span>
        </a>
      {/each}
    </div>
  </div>

  <footer>
    <div class="p-5 text-center">
      <span class="text-sm">© 2023 Copyright | Created by </span>
      <a
        class="text-sm font-semibold text-neutral-600 dark:text-neutral-400"
        href="https://lucasdev.app"
        >Lucas Heidebrecht</a
      >
    </div>
  </footer>

  {#if form?.success}
  <div class="fixed p-5 top-0 right-0 animate-fade-left animate-once animate-ease-linear animate-duration-5000">
    <div class="m-auto">
      <div class="bg-white rounded-lg border-gray-300 border p-3 shadow-lg">
        <div class="flex flex-row">
          <div class="px-2">
            <svg width="24" height="24" viewBox="0 0 1792 1792" fill="#44C997" xmlns="http://www.w3.org/2000/svg">
              <path d="M1299 813l-422 422q-19 19-45 19t-45-19l-294-294q-19-19-19-45t19-45l102-102q19-19 45-19t45 19l147 147 275-275q19-19 45-19t45 19l102 102q19 19 19 45t-19 45zm141 83q0-148-73-273t-198-198-273-73-273 73-198 198-73 273 73 273 198 198 273 73 273-73 198-198 73-273zm224 0q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"/>
              </svg>
          </div>
          <div class="ml-2 mr-6">
            <span class="font-semibold">Song hinzugefügt</span>
            <span class="block text-gray-500">{form?.message}</span>
          </div>
          <button onClick="return this.parentElement.parentElement.parentElement.remove();" class="p-1 ml-3 rounded bg-white/20 hover:bg-white/10">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd" />
            </svg>
        </button>
        </div>
      </div>
    </div>
  </div>
  {/if}


</div>
  
  <style lang="postcss">
    :global(html) {
      background-color: theme(colors.gray.100);
    }
  </style>