import React from 'react';
import Fade from 'react-reveal/Fade';
import Text from 'common/components/Text';
import Image from 'common/components/Image';
import Button from 'common/components/Button';
import Container from 'common/components/UI/Container';
import { SocialIcon } from 'react-social-icons';

import UtopiaBanner from 'common/assets/image/utoptia/Utopia_dark_full.png';
import BannerWrapper, {
  BannerContent,
  ButtonGroup,
} from './banner.style';

const Banner = () => (
  <BannerWrapper id="home">
    <Container>
      <BannerContent>
        <Fade up delay={100}>
          <Image src={UtopiaBanner} alt="Utopia Banner" />
        </Fade>
        <Fade up delay={200}>
          <Text
            content="Lorem ipsum dolor sit amet consectetur adipisicing elit sed eiusmod tempor incididunt labore dolore magna
          ipsum dolor sit amet consectetur."
          />
        </Fade>
        <Fade up delay={300}>
          <ButtonGroup>
            <SocialIcon network="tiktok" />
            <SocialIcon network="snapchat" />
            <SocialIcon network="linkedin" />
            <SocialIcon network="reddit" />
            <SocialIcon network="twitch" />
            <SocialIcon network="telegram" />
            <SocialIcon network="facebook" />
            <SocialIcon network="pinterest" />
          </ButtonGroup>
        </Fade>
        <Fade up delay={400}>
          <ButtonGroup>
            <Button
              className="text"
              variant="textButton"
              title="EXCHANGE"
            />
            <Button className="primary" title="HOW TO BUY" />

          </ButtonGroup>
        </Fade>
      </BannerContent>
    </Container>
  </BannerWrapper>
);

export default Banner;
