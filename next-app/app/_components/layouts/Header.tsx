'use client';
import { useRouter } from 'next/navigation';

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

  return (
    <header className={`${props.className}`}>
      <div className="navbar">
        <div className="navbar-start">
          <button
            className="btn btn-ghost normal-case truncate inline-block max-w-full text-lg"
            onClick={moveToHome}
          >
            {props.appName}
          </button>
        </div>
        <div className="navbar-end mr-3">
          <ToggleModeCheckbox />
        </div>
      </div>
    </header>
  );
}
