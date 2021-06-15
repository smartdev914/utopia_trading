import React from 'react';
import ScrollSpyMenu from 'common/components/ScrollSpyMenu';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import Button from 'common/components/Button';
import Container from 'common/components/UI/Container';

import { navbar } from 'common/data/CryptoModern';
import { SocialIcon } from 'react-social-icons';
import NavbarWrapper, {
  MenuArea, SocialMediaButtonGroup,
} from './navbar.style';

const Navbar = () => {
  const { navMenu } = navbar;

  const iconSize = '30px';

  return (
    <NavbarWrapper className="navbar">
      <Container>
        <SocialMediaButtonGroup>
          <SocialIcon bgColor="#2D75DC" network="tiktok" style={{ width: iconSize, height: iconSize }} />
          <SocialIcon bgColor="#2D75DC" network="snapchat" style={{ width: iconSize, height: iconSize }} />
          <SocialIcon bgColor="#2D75DC" network="linkedin" style={{ width: iconSize, height: iconSize }} />
          <SocialIcon bgColor="#2D75DC" network="reddit" style={{ width: iconSize, height: iconSize }} />
          <SocialIcon bgColor="#2D75DC" network="twitch" style={{ width: iconSize, height: iconSize }} />
          <SocialIcon bgColor="#2D75DC" network="telegram" style={{ width: iconSize, height: iconSize }} />
          <SocialIcon bgColor="#2D75DC" network="facebook" style={{ width: iconSize, height: iconSize }} />
          <SocialIcon bgColor="#2D75DC" network="pinterest" style={{ width: iconSize, height: iconSize }} />
        </SocialMediaButtonGroup>
        <MenuArea>
          <Button className="whitepaper" title="WHITE PAPER" />
          <Button className="trail" title="HOW TO BUY" />
        </MenuArea>
      </Container>
    </NavbarWrapper>
  );
};

export default Navbar;
