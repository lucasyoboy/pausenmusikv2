<script>
  import { enhance } from '$app/forms';
  import Header from '../../lib/admin/partials/header.svelte';
  export let data;
  import { CheckCircle, XCircle, Trash } from 'svelte-heros-v2';
</script>

<div class="container-fluid font-montserrat bg-gray-100">
  <div class="bg-[url('/images/background.webp')] bg-cover">
    <Header data={data.user} />
    <div class="bg-primery bg-opacity-80 p-6 md:p-20">
        <div class="text-center">
          <span class="font-light uppercase text-2xl sm:text-6xl "><span class="font-bold text-four text-4xl sm:text-6xl md:text-7xl">Pausenmusik</span><br> Einsendungen für den CSN</span>
        </div>
    </div>
  </div>

  <div class="p-8 md:p-16">
    <div class="flex flex-wrap" id="tabs-id">
      <div class="w-full items-center justify-center flex flex-col">
        <ul class="flex list-none flex-row cursor-pointer mb-5 w-full md:w-4/6 flex-wrap">
          <li class=" m-2 flex-auto text-center">
            <a href="#!" class="text-sm md:text-md font-bold uppercase px-5 py-3 rounded block leading-normal text-white bg-three" onclick="changeAtiveTab(event,'tab-profile')">
              Neue Einsendungen
            </a>
          </li>
          <li class=" flex-auto text-center m-2">
            <a href="#!" class="text-sm md:text-md font-bold uppercase px-5 py-3 rounded block leading-normal text-pink-600 bg-white" onclick="changeAtiveTab(event,'tab-settings')">
              Akzeptierte Einsendungen
            </a>
          </li>
          <li class=" m-2  flex-auto text-center">
            <a href="#!" class="text-sm md:text-md font-bold uppercase px-5 py-3 rounded block leading-normal text-pink-600 bg-white" onclick="changeAtiveTab(event,'tab-options')">
              Alle Einsendungen
            </a>
          </li>
        </ul>
        <div class="relative flex flex-col min-w-0 break-words w-full mb-6 rounded">
          <div class="px-4 py-5 flex-auto">
            <div class="tab-content tab-space">
              <div class="block" id="tab-profile">
                {#each data.playList.items as song}
                  {#if !song.approved}
                    <div class="relative overflow-hidden bg-white p-4 flex flex-row items-center rounded-md mb-3 hover:bg-gray-200">
                      <img class="mx-2 w-16 h-16 rounded-md" src="images/Icons/music.svg" alt="spotify-thumnail">
                      <div class="flex flex-row items-center justify-between w-full">
                        <div class="mx-5">
                          <span class="font-semibold text-lg">{song.name}</span>
                          <p class="text-md">
                            {new Date(song.created).toLocaleDateString('de-de', { weekday:"short", year:"numeric", month:"short", day:"numeric"})}
                          </p>
                        </div>
                        <form method="POST" action="?/update" class="flex flex-col" use:enhance>
                          <input name="id" value="{song.id}" hidden/>
                          <button name="action" value="true"><CheckCircle size="30" variation="solid" color="#00FF00 "/></button>
                          <button name="action" value="false" data-value="false"><XCircle size="30" variation="solid" color="#ff0000 "/></button>
                        </form>
                      </div>
                    </div>
                  {/if}
                {/each}
              </div>
              <div class="hidden" id="tab-settings">
                {#each data.playList.items as song}
                  {#if song.approved}
                    <div class="relative overflow-hidden bg-white p-4 flex flex-row items-center rounded-md mb-3 hover:bg-gray-200">
                      <img class="mx-2 w-16 h-16 rounded-md" src="images/Icons/music.svg" alt="spotify-thumnail">
                      <div class="flex flex-row items-center justify-between w-full">
                        <div class="mx-5">
                          <span class="font-semibold text-lg">{song.name}</span>
                          <p class="text-md">
                            {new Date(song.created).toLocaleDateString('de-de', { weekday:"short", year:"numeric", month:"short", day:"numeric"})}
                          </p>
                        </div>
                        <form method="POST" action="?/delete" use:enhance>
                          <button value="{song.id}" name="id"><Trash size="30" variation="solid" color="red"/></button>
                        </form>
                      </div>
                    </div>
                  {/if}
                {/each}
                {#if data.playList.items < 1}
                  <div class="relative overflow-hidden bg-white p-4 flex flex-row items-center rounded-md mb-3">
                    <div class="mx-2">
                      <span class="font-semibold text-lg">Es konnten keine Songs gefunden werden!</span>
                    </div>
                  </div>
                {/if}
              </div>
              <div class="hidden" id="tab-options">
                {#each data.playList.items as song}
                  <div class="relative overflow-hidden bg-white p-4 flex flex-row items-center rounded-md mb-3 hover:bg-gray-200">
                    <img class="mx-2 w-16 h-16 rounded-md" src="images/Icons/music.svg" alt="spotify-thumnail">
                    <div class="flex flex-row items-center justify-between w-full">
                      <div class="mx-5">
                        <span class="font-semibold text-lg">{song.name}</span>
                        <p class="text-md">
                          {new Date(song.created).toLocaleDateString('de-de', { weekday:"short", year:"numeric", month:"short", day:"numeric"})}
                        </p>
                      </div>
                      <form method="POST" action="?/delete" use:enhance>
                        <button value="{song.id}" name="id"><Trash size="30" variation="solid" color="red"/></button>
                      </form>
                    </div>
                  </div>
              {/each}
              {#if data.playList.items < 1}
                  <div class="relative overflow-hidden bg-white p-4 flex flex-row items-center rounded-md mb-3">
                    <div class="mx-2">
                      <span class="font-semibold text-lg">Es konnten keine Songs gefunden werden!</span>
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
  <script type="text/javascript">
    function changeAtiveTab(event,tabID){
      let element = event.target;
      while(element.nodeName !== "A"){
        element = element.parentNode;
      }
      ulElement = element.parentNode.parentNode;
      aElements = ulElement.querySelectorAll("li > a");
      tabContents = document.getElementById("tabs-id").querySelectorAll(".tab-content > div");
      for(let i = 0 ; i < aElements.length; i++){
        aElements[i].classList.remove("text-white");
        aElements[i].classList.remove("bg-three");
        aElements[i].classList.add("text-pink-600");
        aElements[i].classList.add("bg-white");
        tabContents[i].classList.add("hidden");
        tabContents[i].classList.remove("block");
      }
      element.classList.remove("text-pink-600");
      element.classList.remove("bg-white");
      element.classList.add("text-white");
      element.classList.add("bg-three");
      document.getElementById(tabID).classList.remove("hidden");
      document.getElementById(tabID).classList.add("block");
    }
  </script>

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

</div>