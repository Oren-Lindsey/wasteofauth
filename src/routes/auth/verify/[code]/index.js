import mongoose from 'mongoose'
import 'dotenv/config'
import { User } from '$lib/UserSchema.js'
/** @type {import('./__types/[code]').RequestHandler} */
export async function GET({ params }) {
    try {
        const user = await checkIfUserExists(params.code)
        if (user) {
            return {
                status: 200,
                body: {
                    user
                }
            }
        } else {
            return {
                status: 404,
                body: {
                    error: 'User not found'
                }
            }
        }
    } catch (e) {
        console.log(e)
        return {
            status: 500
        }
    }
}
async function checkIfUserExists(id) {
    await mongoose.connect(process.env['DB'])
    const user = await User.findById(id)
    return user
}