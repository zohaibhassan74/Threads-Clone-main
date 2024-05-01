'use client'
import Link from 'next/link';
import Image from "next/image";
import { sidebarLinks } from './../../constants/index';
import { useRouter, usePathname } from 'next/navigation';


export default function Bottombar() {
    const pathname = usePathname()
    return (
        <section className="bottombar">
            <div className="bottombar_container">
            {sidebarLinks.map((link) => {
                    const isActive = (pathname.includes(link.route) && link.route.length > 1 || pathname === link.route)
                    return (
                        <Link href={link.route}
                            key={link.label}
                            className = {`leftsidebar_link ${isActive && 'bg-primary-500'}`} >
                        <Image 
                        src={link.imgURL}
                         alt='Image' 
                         width={24} 
                         height={24} />
                        <p className=' text-subtle-medium text-light-1 max-sm:hidden'>{link.label.split(/\s+/)[0]}</p>
                        </Link>
                    )
                })}
            </div>
        </section>
    )
}