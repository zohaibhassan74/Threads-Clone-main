import * as z from 'zod'

export const threadValidation = z.object({
    thread: z.string().nonempty().min(3,{message: "Minimum three characters"}),
    accountId: z.string().nonempty(),
})

export const commentValidation = z.object({
    thread: z.string().nonempty().min(3,{message: "Minimum three characters"}),
})