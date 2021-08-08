/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import Button from 'common/components/Button';
import Container from 'common/components/UI/Container';

import { SocialIcon } from 'react-social-icons';
import NavbarWrapper, {
  MenuArea, SocialMediaButtonGroup,
} from './navbar.style';

const Navbar = ({ toggleShowWhitePaper, showWhitePaper }) => {
  const iconSize = '30px';

  const scrollTo = () => {
    const howToBuy = document.getElementById('howToBuy');

    const sectionTop = howToBuy.getBoundingClientRect().top;

    if (howToBuy) {
      window.scroll({
        top: sectionTop - '75',
        behavior: 'smooth',
      });
    }
  };

  return (
    <NavbarWrapper className="navbar">
      <Container>
        <SocialMediaButtonGroup>
          <SocialIcon url="https://twitter.com/utopia_bsc" bgColor="#2D75DC" network="twitter" style={{ width: iconSize, height: iconSize }} />
          <SocialIcon url="https://www.linkedin.com/company/utp-earth/about/" bgColor="#2D75DC" network="linkedin" style={{ width: iconSize, height: iconSize }} />
        </SocialMediaButtonGroup>
        <MenuArea>
          <Button onClick={() => toggleShowWhitePaper(!showWhitePaper)} className="whitepaper" title="WHITE PAPER" />
          <Button className="trail" title="HOW TO BUY" onClick={scrollTo} />
        </MenuArea>
      </Container>
    </NavbarWrapper>
  );
};

export default Navbar;
