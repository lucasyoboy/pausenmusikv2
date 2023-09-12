<script>
    import { toggleHistory } from '../../../stores';
    export let data;
</script>

{#if $toggleHistory}
<div class="relative z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
  
    <div class="fixed inset-0 overflow-hidden animate-fade-left animate-once animate-ease-linear " >
      <div class="absolute inset-0 overflow-hidden">
        <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
          <div class="pointer-events-auto relative w-screen max-w-md">
            <div class="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
              <button on:click={() => (toggleHistory.set(false))} type="button" class="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
                <span class="absolute -inset-2.5"></span>
                <span class="sr-only">Close panel</span>
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
  
            <div class="flex h-full flex-col overflow-y-scroll bg-primery py-6 shadow-xl">
              <div class="px-4 sm:px-6 flex items-center gap-2">
                <img class="w-12" src="images/Icons/history.svg" alt="song-history">
                <span class="font-medium leading-6 text-secondary text-2xl" id="slide-over-title">Kürzlich hinzugefügt</span>
              </div>
              <div class="relative mt-6 flex-1 px-4 sm:px-6">
                
                {#each data.items as track, index }
                <div class=" bg-white p-4 flex flex-row items-center rounded-md mb-3 hover:bg-gray-200">
                  <span class="font-bold text-xl mx-2">{index+1}</span>
                  <img class="mx-2 w-16 h-16 rounded-md" src="images/Icons/music.svg" alt="spotify-thumnail">
                  <div class="mx-2">
                    <span class="font-semibold text-xl">{track.name}</span>
                  </div>
                </div>
                {/each}
                {#if data.items < 1}
                <div class=" bg-white p-4 flex flex-row items-center rounded-md mb-3">
                  <div class="mx-2">
                    <span class="font-semibold text-lg">Nichts wurde kürzlich hinzugefügt!</span>
                  </div>
                </div>
                {/if}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}
