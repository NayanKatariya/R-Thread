import React from 'react'
import { useLocation } from 'react-router-dom'
import { SidebarTrigger, useSidebar } from '../components/ui/sidebar'
import { headerText } from '../utils/constant';
import DropdownMenuWithIcon from '../components/UserProfile/dropdown-menu';

const Header = () => {
    const location = useLocation()
    const { open } = useSidebar()


    return (
        <div>
            <header className="sticky top-0 z-10 bg-white py-5 px-4 mt-3 flex items-center justify-between  mr-4 gap-4 text-2xl font-bold text-black ">
                <p className='text-[30px] font-bold'>
                    {headerText?.[location.pathname]}
                </p>
                <DropdownMenuWithIcon />
            </header>
        </div>
    )
}

export default Header
