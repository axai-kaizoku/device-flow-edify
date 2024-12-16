import { Bug, Calendar, ChartColumnBig, LayoutDashboard, Settings, Settings2, ShoppingBag, Smartphone, Store, Upload, UserRound, Users, Wrench } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

type SidebarItemProps = {
  href: string;
  label: string;
  isActive?: boolean;
};

const SidebarItem = ({ href, label, isActive }: SidebarItemProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={href}>
      <div
        className="relative group w-10 h-10 flex items-center justify-center rounded-full transition-all"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className={`${
            isActive
              ? 'bg-black text-white dark:bg-white dark:text-black'
              : 'bg-white backdrop-blur-sm dark:bg-gray-800'
          } w-10 h-10 flex items-center justify-center rounded-full p-2`}
        >
          {
          label === 'Dashboard' ? 
            (<LayoutDashboard className='w-5 h-5'/>) : 
          label === 'Teams' ?
            (<Users className='w-5 h-5'/>) :
          label === 'Assets' ?
            (<Smartphone className='w-5 h-5'/>) :
          label === 'People' ?
            (<UserRound className='w-5 h-5'/>) :
          label === 'Org Chart' ?
            (<ChartColumnBig className='w-5 h-5'/>) :
          label === 'Store' ?
            (<Store className='w-5 h-5'/>) :
          label === 'Orders' ?
            (<ShoppingBag className='w-5 h-5'/>) :
          label === 'Reports' ?
            (<Calendar className='w-5 h-5'/>) :
          label === 'Onboarding' ?
            (<Upload className='w-5 h-5'/>) :
          label === 'Issues' ?
            (<Bug className='w-5 h-5'/>) :
          label === 'Settings' ?
            (<Wrench className='w-5 h-5'/>) :
          label === 'Profile' ?
            (<UserRound className='w-5 h-5'/>) :
          label === 'Devices' ?
            (<Smartphone className='w-5 h-5'/>) :
          label === 'Home' ?
            (<LayoutDashboard className='w-5 h-5'/>) :
          (<div/>)
          
        }
        </div>

        {/* Tooltip */}
        {isHovered && (
          <div className="absolute left-12 top-1/2 -translate-y-1/2 bg-black z-100 text-white text-sm rounded-full py-1 px-2 shadow-lg whitespace-nowrap">
            {label}
          </div>
        )}
      </div>
    </Link>
  );
};

export default SidebarItem;
