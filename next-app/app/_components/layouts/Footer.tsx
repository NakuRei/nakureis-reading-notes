import {
  GithubLogo,
  NotePencil,
  TwitterLogo,
} from '@phosphor-icons/react/dist/ssr';

import IconLinkButton from './IconLinkButton';
import ZennLogoButton from './ZennLogoButton';

interface FooterProps {
  authorName: string;
  year: number;
  className?: string;
}

export default function Footer(props: FooterProps) {
  return (
    <footer className={`${props.className} footer items-center p-4 gap-1`}>
      <aside className="items-center grid-flow-row">
        <p>
          © {props.year} {props.authorName}
        </p>
        {/* <!-- Rakuten Web Services Attribution Snippet FROM HERE --> */}
        <a
          href="https://developers.rakuten.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Supported by Rakuten Developers"
        >
          Supported by Rakuten Developers
        </a>
        {/* <!-- Rakuten Web Services Attribution Snippet TO HERE --> */}
      </aside>
      <nav className="grid-flow-col gap-1 md:place-self-center md:justify-self-end">
        <IconLinkButton
          href="https://github.com/NakuRei"
          ariaLabel="Visit GitHub page"
        >
          <GithubLogo size={32} />
        </IconLinkButton>
        <ZennLogoButton />
        <IconLinkButton
          href="https://notes.nakurei.com"
          ariaLabel="Visit Tech blog"
        >
          <NotePencil size={32} />
        </IconLinkButton>
        <IconLinkButton
          href="https://twitter.com/nakurei7901"
          ariaLabel="Visit Twitter"
        >
          <TwitterLogo size={32} />
        </IconLinkButton>
      </nav>
    </footer>
  );
}
