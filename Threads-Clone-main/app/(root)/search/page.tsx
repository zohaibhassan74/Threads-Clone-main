import ThreadCard from '@/components/cards/ThreadCard'
import Comments from '@/components/forms/Comments'
import { fetchThreadById } from '@/lib/actions/thread.actions'
import { fetchUser, fetchUsers } from '@/lib/actions/user.actions'
import { redirect } from 'next/navigation'
import React from 'react'
import { currentUser } from '@clerk/nextjs';
import UserCard from '@/components/cards/UserCard'

const search = async () => {
    
    const user = await currentUser()
    if (!user) return null
    
    const userInfo = await fetchUser(user.id)
    if (!userInfo?.onboarded) redirect('/onboarding')
    
    const result = await fetchUsers({
        userId: user.id,
        searchString: '',
        pageNumber: 1,
        pageSize: 25
    })
    return(
        <section>
            <h1 className='head-text mb-10'>Search</h1>
            {/* Search Bar */}
            <div className=' mt-14 flex flex-col gap-9'>
                {result.users.length === 0 ? (
                    <p className='no-result'>No users exist</p>
                ) : (
                        <>
                            {result.users.map((person) => (
                                <UserCard
                                    key={person.id}
                                    id={person.id}
                                    name={person.name}
                                    username={person.username}
                                    imgUrl={person.image}
                                    personType='User'
                                />
                            ))}
                        </>
                )}
            </div>
        </section>
    )
}

export default search