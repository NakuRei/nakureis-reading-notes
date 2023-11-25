'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

import ToggleModeCheckbox from './ToggleModeCheckbox';

interface MainHeaderProps {
  appName?: string | React.ReactNode;
  homePath?: string;
  buttons?: React.ReactNode;
  className?: string;
}

export default function MainHeader(props: MainHeaderProps) {
  const router = useRouter();
  const homePath = props.homePath ?? '/';
  const appName = props.appName ?? 'NakuReiの読書メモたち';

  function moveToHome() {
    router.push(homePath);
  }

  return (
    <header
      className={`bg-neutral text-neutral-content w-full ${props.className}`}
    >
      <div className="navbar">
        <div className="navbar-start w-2/3">
          <button
            className="btn btn-ghost normal-case truncate inline-block max-w-full text-base sm:text-lg"
            onClick={moveToHome}
          >
            {appName}
          </button>
        </div>
        <div className="navbar-end mr-3">
          {props.buttons}
          <ToggleModeCheckbox />
        </div>
      </div>
    </header>
  );
}
