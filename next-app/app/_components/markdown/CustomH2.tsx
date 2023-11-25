import Link from 'next/link';

import { ExtraProps } from 'react-markdown';

export default function CustomH2(
  props: JSX.IntrinsicElements['h2'] & ExtraProps,
) {
  const title =
    props.node && 'value' in props.node.children[0]
      ? props.node.children[0].value
      : '';
  return (
    <Link className="text-inherit no-underline" id={title} href={`#${title}`}>
      <h2>{props.children}</h2>
    </Link>
  );
}
