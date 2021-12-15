import React from 'react';
import { TwitterShareButton, TwitterIcon } from 'react-share';

export default function SocialMediaButtons(props) {
  return (
    <TwitterShareButton
      url={`https://this-cat-does-not-exist.vercel.app/#seed=${props.seedValue}`}
      via={'VioletteBunny, Checkout this cat I just adopted!'}
      hashtag="#ThisCatDoesNotExist"
      image={'https://i.imgur.com/qPHk6xa.png'}
    >
      <TwitterIcon size={36} />
    </TwitterShareButton>
  );
}
