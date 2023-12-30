import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const linkPath = [
  {
    id: 1,
    path: '/terms',
    name: 'Terms of use',
  },
  {
    id: 2,
    path: '/privacy-policy',
    name: 'Privacy Policy',
  },
  {
    id: 3,
    path: '/cookies-policy',
    name: 'Cookies Policy',
  },
];

const activeStyle = {
  backgroundColor: 'bg-[#2d88ff]/10',
};
export default function SideBarLinks() {
  const pathname = usePathname();
  const [active, setActive] = useState<number>();
  const handleClick = (id: number) => () => {
    const activeElement = linkPath.find(item => item.id === id);

    activeElement && setActive(id);
  };

  return (
    <ul className="mt-10">
      {linkPath.map((id, item) => (
        <li
          key={id.id}
          className={
            active === id.id ? `p-5 w-[328px] rounded-lg ${activeStyle.backgroundColor}` : `p-5 w-[328px] rounded-lg`
          }
          onClick={handleClick(id.id)}
        >
          <Link
            href={id.path}
            scroll={false}
            className={`flex justify-start items-center ${
              active === id.id
                ? `hover:(font-bold ${activeStyle.backgroundColor}}) ${pathname === '/' ? 'font-bold' : ''}`
                : 'hover:font-bold'
            }`}
          >
            <h3 className="text-lg lg:text-xl ml-2 text-center">{id.name}</h3>
          </Link>
        </li>
      ))}
    </ul>
  );
}
