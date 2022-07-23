import { Wasteof2 } from 'wasteof-client'
/** @type {import('./__types/[username]').RequestHandler} */
export async function GET({ params }) {
    const username = params.username
    const wasteof = new Wasteof2()
    const wallComments = await wasteof.getWallComments(username, 1)
    return {
        body: {
            wallComments
        }
    }
}