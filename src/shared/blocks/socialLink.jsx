"use client";

import Link from "next/link";

export function SocialLink({ url, Icon }) {
  return (
    <Link href={url} target="_blank" rel="noopener noreferrer" passHref legacyBehavior>
      <a>
        {Icon}
      </a>
    </Link>
  );
}
