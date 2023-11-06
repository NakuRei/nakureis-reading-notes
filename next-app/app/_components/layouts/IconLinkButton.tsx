interface IconLinkButtonProps {
  href: string;
  ariaLabel: string;
  children: React.ReactNode;
}

export default function IconLinkButton(props: IconLinkButtonProps) {
  return (
    <a
      className="btn btn-circle btn-ghost"
      href={props.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={props.ariaLabel}
    >
      {props.children}
    </a>
  );
}
