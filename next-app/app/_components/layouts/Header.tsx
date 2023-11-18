'use client';
import { useRouter, usePathname } from 'next/navigation';

import { SquaresFour, SquareSplitVertical } from '@phosphor-icons/react';

import ToggleModeCheckbox from './ToggleModeCheckbox';

interface HeaderProps {
  appName: string;
  homePath: string;
  className?: string;
}

export default function Header(props: HeaderProps) {
  const router = useRouter();

  function moveToHome() {
    router.push(props.homePath);
  }

  const pathname = usePathname();
  const isHome = pathname === props.homePath;
  function changeShow() {
    if (isHome) {
      router.push('/books');
      return;
    }
    router.push(props.homePath);
  }

  return (
    <header className={`${props.className}`}>
      <div className="navbar">
        <div className="navbar-start w-2/3">
          <button
            className="btn btn-ghost normal-case truncate inline-block max-w-full text-base sm:text-lg"
            onClick={moveToHome}
          >
            {props.appName}
          </button>
        </div>
        <div className="navbar-end mr-3">
          <label className="swap swap-rotate mr-3">
            <input type="checkbox" onChange={changeShow} checked={isHome} />
            <SquareSplitVertical className="swap-off" size={32} />
            <SquaresFour className="swap-on" size={32} />
          </label>
          <ToggleModeCheckbox />
        </div>
      </div>
    </header>
  );
}
