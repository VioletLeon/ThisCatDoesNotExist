import React from 'react';
import { FacebookShareButton, FacebookIcon } from 'react-share';

export default function SocialMediaButtons(props) {
  return (
    <FacebookShareButton
      url={`https://this-cat-does-not-exist.vercel.app/#seed=${props.seedValue}`}
      quote={'This Cat Does Not Exist - Adopt Your Own Cat!'}
      hashtag="#ThisCatDoesNotExist"
      image={`https://this-cat-does-not-exist.vercel.app/catLogoImage.png`}
    >
      <FacebookIcon size={36} />
    </FacebookShareButton>
  );
}
