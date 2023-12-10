import { Components } from 'react-markdown';

import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nightOwl } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface InlineCodeProps {
  children: React.ReactNode;
}

function InlineCode(props: InlineCodeProps) {
  return (
    <code className="rounded-md bg-base-300 text-base-content before:content-[''] after:content-['']">
      {props.children}
    </code>
  );
}

const customCode: Components['code'] = (props) => {
  const match = /language-(\w+)(:?.+)?/.exec(props.className || '');
  const language = match && match[1] ? match[1] : '';
  const name = match && match[2] ? match[2].slice(1) : '';

  if (match) {
    return (
      <>
        {name && (
          <span className="bg-neutral-content text-neutral py-1 px-2 text-xs rounded-md">
            {name}
          </span>
        )}
        <SyntaxHighlighter
          style={nightOwl}
          customStyle={{ margin: 0, lineHeight: 1.3 }}
          language={language}
          PreTag="div"
          className="rounded-md text-sm border-gray-500 border-2"
        >
          {String(props.children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      </>
    );
  }

  return <InlineCode>{props.children}</InlineCode>;
};

export default customCode;
