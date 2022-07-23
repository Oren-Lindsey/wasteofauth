<script>
    import { page } from '$app/stores'
    const url = $page.url.origin
</script>
<h1 class="text-4xl m-1 mt-2 text-center">Docs</h1>
<div class="m-2">
<div class="grid place-items-center">
<p class="text-center">wasteofauth is pretty simple. Begin by navigating the user to: <br><code>{url}/auth</code>, and include the below parameters:</p>
<br>
<h2 class="text-xl">Auth url parameters</h2>
<p class="text-center">The auth url accepts 2 url parameters:</p>
<p class="text-center"><code>name</code>: This parameter is the name of your site, URI encoded. This parameter is required.</p>
<p class="text-center"><code>redirect</code>: This parameter is the url it should redirect to after authenticating. It should be URI encoded.</p>
<p class="text-center">The complete auth url should look like: <code>{url}/auth?name=yourname&redirect=yoururl</code></p>
<br>
<h2 class="text-xl">Redirect url parameters</h2>
<p class="text-center">Once you have authenticated, it will redirect to the specified redirect url. It will also add at least one url parameter to that url:</p>
<p class="text-center"><code>success</code>: This parameter is a boolean, specifying whether the authentication was successful.</p>
<p class="text-center"><code>username</code>: If success is <code>true</code>, then this parameter will also be included. It is the username of the user who authenticated.</p>
<p class="text-center"><code>id</code>: If success is <code>true</code>, then this parameter will also be included. It is the id of the authentication session. It is used to verify that the authentication was real, not spoofed. See below:</p>
<br>
<h2 class="text-xl">Verify auth</h2>
<p class="text-center">To confirm that the user has been truly authenticated, perform a get request to this url: <code>{url}/auth/verify/ID</code></p> <p>ID should be the authentication id (See above)</p>
</div>
</div>