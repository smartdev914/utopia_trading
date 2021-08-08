import React from 'react';
import Fade from 'react-reveal/Fade';
import Text from 'common/components/Text';
import Heading from 'common/components/Heading';
import Container from 'common/components/UI/Container';
import Image from 'next/image';
import TimmyPic from '../../../../public/assets/image/TeamMembers/ProfilePic-Timmy.png';
import IgorPic from '../../../../public/assets/image/TeamMembers/ProfilePic-Igor.png';
import ChristianPic from '../../../../public/assets/image/TeamMembers/ProfilePic-Christian.png';
import DerekPic from '../../../../public/assets/image/TeamMembers/ProfilePic-Derek.png';
import LanePic from '../../../../public/assets/image/TeamMembers/ProfilePic-Lane.png';
import JerryPic from '../../../../public/assets/image/TeamMembers/ProfilePic-Jerry.png';
import LinkedInIcon from '../../../../public/assets/image/icons/linkedin.svg';
import InstagramIcon from '../../../../public/assets/image/icons/Instagram.svg';
import SectionWrapper, { ContentWrapper, TeamMember } from './team.style';

const PrivacyPortal = () => (
  <SectionWrapper>
    <Container fullWidth>
      <ContentWrapper>
        <div className="content">
          <Heading content="TEAM" className="sectionHeaderStyle" />
        </div>
      </ContentWrapper>
      <ContentWrapper>
        <TeamMember>
          <Fade up delay={100}>
            <div>
              <Image src={TimmyPic} alt="Timmy Kuriakose" />
              <div className="nameHeader">
                <Heading as="h4" content="TIMMY KURIAKOSE" />
                <a href="https://www.linkedin.com/in/timmy-kuriakose-5a6537145/">
                  <Image src={LinkedInIcon} alt="Timmy Kuriakose's LinkedIn Profile" />
                </a>
              </div>
              <Text content="CO-FOUNDER / PROJECT COORDINATION" />
            </div>
          </Fade>
        </TeamMember>
        <TeamMember>
          <Fade up delay={175}>
            <div>
              <Image src={IgorPic} alt="Igor Ainbinder" />
              <div className="nameHeader">
                <Heading as="h4" content="IGOR AINBINDER" />
                <a href="https://www.linkedin.com/in/igor-ainbinder/">
                  <Image src={LinkedInIcon} alt="Igor Ainbinder's LinkedIn Profile" />
                </a>
              </div>
              <Text content="CO-FOUNDER / BUSINESS DEVELOPMENT" />
            </div>
          </Fade>
        </TeamMember>
        <TeamMember>
          <Fade up delay={225}>
            <div>
              <Image src={ChristianPic} alt="Christian Clayton" />
              <div className="nameHeader">
                <Heading as="h4" content="CHRISTIAN CLAYTON" />
                <a href="https://www.instagram.com/onlineboss__/">
                  <Image src={InstagramIcon} alt="Christian Clayton's Instagram Profile" />
                </a>
              </div>
              <Text content="CO-FOUNDER / MARKETING" />
            </div>
          </Fade>
        </TeamMember>
        <TeamMember>
          <Fade up delay={100}>
            <div>
              <Image src={DerekPic} alt="Derek Chin Zhi Xian" />
              <div className="nameHeader">
                <Heading as="h4" content="DEREK CHIN ZHI XIAN" />
                <a href="https://www.linkedin.com/in/derekzx/">
                  <Image src={LinkedInIcon} alt="Derek Chin Zhi Xian's LinkedIn Profile" />
                </a>
              </div>
              <Text content="HEAD OF TECHNOLOGY DEVELOPMENT" />
            </div>
          </Fade>
        </TeamMember>
        <TeamMember>
          <Fade up delay={175}>
            <div>
              <Image src={JerryPic} alt="Jerry Ku" />
              <div className="nameHeader">
                <Heading as="h4" content="JERRY KU" />
                <a href="https://www.linkedin.com/in/jerry-ku/">
                  <Image src={LinkedInIcon} alt="Jerry Ku's LinkedIn Profile" />
                </a>
              </div>
              <Text content="LEAD FRONT END DEVELOPER" />
            </div>
          </Fade>
        </TeamMember>
        <TeamMember>
          <Fade up delay={225}>
            <div>
              <Image src={LanePic} alt="Lane Ainbinder" />
              <div className="nameHeader">
                <Heading as="h4" content="LANE AINBINDER" />
                <a href="https://www.linkedin.com/in/julia-ainbinder/">
                  <Image src={LinkedInIcon} alt="Lane Ainbinder's LinkedIn Profile" />
                </a>
              </div>
              <Text content="LEAD DESIGNER" />
            </div>
          </Fade>
        </TeamMember>
      </ContentWrapper>
    </Container>
  </SectionWrapper>
);

export default PrivacyPortal;
