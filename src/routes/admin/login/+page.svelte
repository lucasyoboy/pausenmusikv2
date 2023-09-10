<script>
  import { enhance } from '$app/forms';
</script>
<div class="container-fluid bg-[url('../images/background.webp')] bg-cover grid h-screen place-items-center">
  <div class="flex flex-col bg-primery w-auto p-5">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-36 w-auto" src="/images/logo.svg" alt="Your Company">
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Bitte loggen Sie sich ein.</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="?/login" method="POST" use:enhance>
        <div>
          <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
          <div class="mt-2">
            <input id="username" name="username" type="text" autocomplete="username" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
            <div class="text-sm">
              <a href="https://wa.me/+595985846174?text=Hallo.%20ich%20kann%20mich%20nicht%20einloggen%20auf%20der%20Pausenmusik%20Webseite.%20Kannst%20du%20mir%20helfen?" class="font-semibold text-indigo-600 hover:text-indigo-500">Password vergessen?</a>
            </div>
          </div>
          <div class="mt-2">
            <input id="password" name="password" type="password" autocomplete="current-password" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
          </div>
        </div>

        <div>
          <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Einloggen</button>
        </div>
      </form>
    </div>
  </div>
</div>