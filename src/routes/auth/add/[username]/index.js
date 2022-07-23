import mongoose from 'mongoose'
import 'dotenv/config'
import { User } from '$lib/UserSchema.js'
import { Wasteof2 } from 'wasteof-client'
/** @type {import('./__types/[username]').RequestHandler} */
export async function POST({ params, request }) {
    try {
        const body = await request.json()
        const username = params.username
        const wasteof = new Wasteof2()
        const json = await wasteof.getWallComments(username, 1)
        const comments = json.comments
        if (comments[0].poster.name == username && comments[0].content == `<p>${body.code}</p>`) {
            const user = await addUser(username)
            return {
                status: 200,
                body: {
                    user
                }
            }
        } else {
            return {
                status: 403
            }
        }
    } catch (e) {
        console.log(e)
        return {
            status: 500
        }
    }
}
async function addUser(username) {
    await mongoose.connect(process.env['DB'])
    const user = new User({
        name: username
    })
    await user.save()
    return user
}