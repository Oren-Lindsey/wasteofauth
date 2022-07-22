<script>
    let username
    export let redirect
    export let name
    let regex = "[a-z0-9_\\-]{1,20}"
    let stage = 1
    let code = ""
    let msg = ""
    import { goto } from '$app/navigation'
    function genCode() {
        code = Math.floor(Math.random() * 9000000) + 1000000
        stage = 2
    }
    async function check() {
        stage = 3
        try {
            const res = await fetch(`https://api.wasteof.money/users/${username}/wall?page=1`)
            const json = await res.json()
            const comments = json.comments
            if (comments[0].poster.name == username && comments[0].content == `<p>${code}</p>`) {
                msg = "logged in successfully!"
                stage = 4
                setTimeout(() => {
                    window.location.href = `${decodeURIComponent(redirect)}?success=true&username=${username}`
                }, 1000)
            } else {
                msg = "failed to login :("
                stage = 4
                setTimeout(() => {
                    window.location.href = `${decodeURIComponent(redirect)}?success=false`
                }, 1000)
            }
        } catch (e) {
            msg = "failed to login :("
            stage = 4
            setTimeout(() => {
                window.location.href = `${decodeURIComponent(redirect)}?success=false`
            }, 1000)
        }
    }
</script>
<h1 class="text-2xl m-1 text-center">Sign in to <span class="underline decoration-2 decoration-wavy decoration-[#755540]">{name}</span> with wasteof</h1>
<div class="grid place-items-center">
    {#key stage}
    {#if stage == 1}
    <form class="grid place-items-center bg-[#f0e4cb] w-fit m-2 p-4 border-black border-4" on:submit|preventDefault={genCode}>
        <h2 class="text-xl m-1 text-center">Login</h2>
        <label for="username" class="mb-1">Enter your username:</label>
        <input type="text" required pattern={regex} minlength="1" maxlength="20" id="username" name="username" class="p-1 bg-[#ebd7ab] border-4 border-black placeholder-[#755540]" placeholder="username..." bind:value={username}>
        <button class="mt-1 p-1 bg-[#ebd7ab] hover:bg-[#f0e4cb] active:valid:translate-y-1 transition delay-75 ease-in-out border-4 border-black" type="submit">Next</button>
    </form>
    {:else if stage == 2}
    <form class="grid place-items-center bg-[#f0e4cb] w-fit m-2 p-4 border-black border-4" on:submit|preventDefault={check}>
        <h2 class="text-xl m-1 text-center">Login</h2>
        <span class="text-center">Your code is: <p class="select-all text-[#755540] text-lg">{code}</p></span>
        <span class="my-1">Comment it on your wall: <a target="_blank" rel="noopener noreferrer" class="m-1 mb-2 mt-1 p-1 bg-[#ebd7ab] hover:bg-[#f0e4cb] active:translate-y-1 transition delay-75 ease-in-out border-4 border-black" href="https://wasteof.money/users/{username}/wall">@{username}'s wall</a></span>
        <button class="mt-1 p-1 bg-[#ebd7ab] hover:bg-[#f0e4cb] active:valid:translate-y-1 transition delay-75 ease-in-out border-4 border-black" type="submit">Next</button>
    </form>
    {:else if stage == 3}
    <form class="grid place-items-center bg-[#f0e4cb] w-fit m-2 p-4 border-black border-4">
        <h2 class="text-xl m-1 text-center">Login</h2>
        <span class="text-[#755540]">Please wait, checking...</span>
    </form>
    {:else if stage == 4}
    <form class="grid place-items-center bg-[#f0e4cb] w-fit m-2 p-4 border-black border-4">
        <h2 class="text-xl m-1 text-center">Login</h2>
        <span class="text-[#755540]">{msg}</span>
    </form>
    {/if}
    {/key}
</div>