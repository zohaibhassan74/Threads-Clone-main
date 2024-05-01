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
import {Input} from '@/components/ui/input'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
// import { updateUser } from '@/lib/actions/user.actions'
import { commentValidation } from './../../lib/validations/thread';
import { addCommentToThread } from '@/lib/actions/thread.actions'


interface Props { 
    threadId: string,
    currentUserImage: string,
    currentUserId: string
}

const Comments = ({ threadId, currentUserImage, currentUserId }: Props) => {
        const  pathname  = usePathname()
        const router = useRouter()
      
          const form = useForm({
              resolver: zodResolver(commentValidation),
              defaultValues: {
                  thread: '',

              }
          });
    
  const onSubmit = async (values: z.infer<typeof commentValidation>) => {
    await addCommentToThread(threadId, values.thread, JSON.parse(currentUserId), pathname)
    
    form.reset()
    }
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="comment-form">
    <FormField
    control={form.control}
    name="thread"
    render={({ field }) => (
      <FormItem className='flex w-full items-center gap-3'>
        <FormLabel>
                <Image
                    src={currentUserImage}
                    alt='User Image'
                    width={48}
                    height={48}
                    className='rounded-full object-cover' />
        </FormLabel>
        <FormControl className=' border-none bg-transparent'>
          <Input type='input' placeholder='comment...' className='text-light-1 no-focus outline-none'  {...field} />
        </FormControl>
      </FormItem>
    )}
  />
  <Button type='submit' className='comment-form_btn'>
   Reply
  </Button>
    </form>
    </Form>
  )
}

export default Comments