'use client'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from '../ui/textarea'
import { usePathname, useRouter } from 'next/navigation'
// import { updateUser } from '@/lib/actions/user.actions'
import { threadValidation } from './../../lib/validations/thread';
import { createThread } from '@/lib/actions/thread.actions'

interface Props  {
    user : {
        id: string;
        objectid: string;
        username: string;
        name: string;
        bio: string;
        image: string
    }
    btnTitle: string
}

function PostThread({ userId }: { userId: string }) {
        const  pathname  = usePathname()
        const router = useRouter()
      
          const form = useForm({
              resolver: zodResolver(threadValidation),
              defaultValues: {
                  thread: '',
                  accountId: userId,

              }
          });
    
  const onSubmit = async (values: z.infer<typeof threadValidation>) => {
    await createThread({
      text : values.thread,
      author: userId,
      communityId: null,
      path : pathname
    })
    
    router.push("/")
    }
    
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" mt-10 flex flex-col justify-start gap-10">
            <FormField
            control={form.control}
            name="thread"
            render={({ field }) => (
              <FormItem className='flex flex-col w-full gap-3'>
                <FormLabel className=' text-base-semibold text-light-1'>
                 Content
                </FormLabel>
                <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1'>
                  <Textarea rows={15}  {...field} />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <Button type='submit' className='bg-primary-500'>
           Post Thread
          </Button>
            </form>
            </Form>
    )
}

    export default PostThread;