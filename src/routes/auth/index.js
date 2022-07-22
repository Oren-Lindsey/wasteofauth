/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET(e) {
    const url = e.url
    let redirect
    let name
    if (url.searchParams !== undefined) {
        redirect = url.searchParams.get('redirect')
        name = url.searchParams.get('name')
    }
    return {
      status: 200,
      body: {
        redirect: redirect,
        name: name,
      }
    }
}