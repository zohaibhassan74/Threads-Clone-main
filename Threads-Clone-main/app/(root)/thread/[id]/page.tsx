import ThreadCard from '@/components/cards/ThreadCard'
import Comments from '@/components/forms/Comments'
import { fetchThreadById } from '@/lib/actions/thread.actions'
import { fetchUser } from '@/lib/actions/user.actions'
import { redirect } from 'next/navigation'
import React from 'react'
import { currentUser } from '@clerk/nextjs';

const page = async({ params }: { params: { id: string } }) => {
    if (!params.id) return null
    
    const user = await currentUser()
    if (!user) return null
    
    const userInfo = await fetchUser(user.id)
    if (!userInfo?.onboarded) redirect('/onboarding')
    
    const thread = await fetchThreadById(params.id)

  return (
      <section className='relative'>
          <div>
          <ThreadCard
                  id={thread._id}
                  key={thread._id}
                  currentUserId={user?.id || ""}
                  parentId={thread.parentId}
                  content={thread.text}
                  author={thread.author}
                  community={thread.community}
                  createdAt={thread.createdAt}
                  comments={thread.children}
                />
          </div>
          <div className='mt-7'>
              <Comments
                  threadId={thread._id}
                  currentUserImage={userInfo.image}
                  currentUserId={JSON.stringify(userInfo?._id)}
              />
          </div>
          <div className='mt-10'>
          {thread.children.map((commentItem: any) => (
          <ThreadCard
                id={commentItem._id}
                key={commentItem._id}
                currentUserId={user?.id || ""}
                parentId={commentItem.parentId}
                content={commentItem.text}
                author={commentItem.author}
                community={commentItem.community}
                createdAt={commentItem.createdAt}
                comments={commentItem.children}
                isComment
                />
           ))}

          </div>
    </section>
  )
}

export default page
