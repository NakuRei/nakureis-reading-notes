interface FooterProps {
  authorName: string;
  year: number;
  className?: string;
}

export default function Footer(props: FooterProps) {
  return (
    <footer className={`${props.className} footer footer-center p-4`}>
      <aside>
        <p>
          © {props.year} {props.authorName}
        </p>
      </aside>
    </footer>
  );
}
