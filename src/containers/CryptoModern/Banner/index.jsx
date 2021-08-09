import React from 'react';
import Fade from 'react-reveal/Fade';
import Text from 'common/components/Text';
import Image from 'next/image';
import Button from 'common/components/Button';
import Container from 'common/components/UI/Container';

import BannerWrapper, {
  BannerContent,
  ButtonGroup,
} from './banner.style';

const Banner = () => {
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
    <BannerWrapper id="home">
      <Container>
        <BannerContent>
          <Fade up delay={50}>
            <Image src="/assets/image/utoptia/Utopia_dark_full.png" alt="Utopia Banner" width={1258} height={316} priority />
          </Fade>
          <Fade up delay={100}>
            <Text
              className="tagline"
              content="Built today, for a better tomorrow"
            />
          </Fade>
          <Fade up delay={150}>
            <ButtonGroup>
              <Button
                className="text"
                variant="textButton"
                title="EXCHANGE"
              />
              <Button className="primary" title="HOW TO BUY" onClick={scrollTo} />
            </ButtonGroup>
          </Fade>
        </BannerContent>
      </Container>
    </BannerWrapper>
  );
};

export default Banner;
