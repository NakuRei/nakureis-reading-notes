'use client';
import React, { useState, ReactNode } from 'react';

interface TabButtonProps {
  text: string;
  isActive: boolean;
  activateFunction: () => void;
  icon?: ReactNode;
  activeClass?: string;
  className?: string;
}

function TabButton(props: TabButtonProps) {
  const activeClass = props.activeClass ?? 'border-primary';
  return (
    <button
      className={`flex flex-row gap-1 items-center px-4 py-2 border-b-4 text-base ${
        props.isActive ? activeClass : 'border-transparent'
      } ${props.className}`}
      onClick={props.activateFunction}
    >
      {props.icon}
      {props.text}
    </button>
  );
}

interface Tab {
  name: string;
  content: ReactNode;
  icon?: ReactNode;
}

interface TabSwitcherProps {
  tabs: Tab[];
  activeClass?: string;
  className?: string;
}

export default function TabSwitcher(props: TabSwitcherProps) {
  const [activeTab, setActiveTab] = useState<string>(props.tabs[0].name);

  const content: { [key: string]: ReactNode } = {};
  props.tabs.forEach((tab) => {
    content[tab.name] = tab.content;
  });

  return (
    <>
      <div
        className={`flex bg-base-100 border-b-4 border-neutral-content w-full ${props.className}`}
      >
        {props.tabs.map((tab) => (
          <TabButton
            key={tab.name}
            text={tab.name}
            isActive={activeTab === tab.name}
            activateFunction={() => setActiveTab(tab.name)}
            icon={tab.icon}
            activeClass={props.activeClass}
            className="-mb-1"
          />
        ))}
      </div>
      {content[activeTab]}
    </>
  );
}
