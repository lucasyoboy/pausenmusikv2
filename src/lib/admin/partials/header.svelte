<script>
import { ArrowUpOnSquare, UserCircle, Cog8Tooth } from 'svelte-heros-v2';
export let data;
</script>

<header class=" bg-primery bg-opacity-80">
    <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
      <div class="flex lg:flex-1">
        <a href="/admin" class="-m-1.5 p-1.5">
          <img class="h-20 w-auto" src="/images/logo.svg" alt="">
        </a>
      </div>
      {#if (!data.verified)}
        <div class="lg:flex lg:flex-1 lg:justify-end">
            <ArrowUpOnSquare size="25" class="inline"/>
            <a href="#!" class="text-sm font-semibold leading-6 text-secondary inline">Einloggen </a>
        </div>
        {:else}
        <div class="flex justify-end items-center ">
          <div class="relative inline-block tooltip">
            <div class="flex justify-end items-center hover:text-gray-400 text-secondary">
              <UserCircle size="30" class="mr-1"/>
              <button class="text-lg font-semibold leading-6 "> {data.username} </button>
            </div>
            <div class="flex flex-col p-4 bg-white w-60 h-auto rounded-md z-20 absolute right-0 invisible tooltip-item">
              <span class="font-semibold pb-4 flex items-center"><Cog8Tooth size="20" class="mr-1"/> Optionen</span>
              <ul class="list-disc space-y-2">
                <li class="flex items-start">
                  <a href="/admin/logout" class="font-medium text-sm text-gray-500 hover:text-black"> Auslogen </a>
                </li>
                <li class="flex items-start">
                  <a href="/admin/settings" class="font-medium text-sm text-gray-500 hover:text-black"> Einstellungen </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      {/if}
    </nav>
  </header>
  