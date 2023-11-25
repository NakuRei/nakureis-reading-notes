import Link from 'next/link';

import { ExtraProps } from 'react-markdown';

export default function TocLinkLi(
  props: JSX.IntrinsicElements['h2'] & ExtraProps,
) {
  const title =
    props.node && 'value' in props.node.children[0]
      ? props.node.children[0].value
      : '';
  return (
    <li>
      <Link href={`#${title}`} className="text-sm">
        {props.children}
      </Link>
    </li>
  );
}
