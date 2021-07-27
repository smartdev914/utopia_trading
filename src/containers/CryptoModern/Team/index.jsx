import React from 'react';
import Fade from 'react-reveal/Fade';
import Text from 'common/components/Text';
import Heading from 'common/components/Heading';
import Container from 'common/components/UI/Container';
import TimmyPic from 'common/assets/image/TeamMembers/ProfilePic-Timmy.png';
import IgorPic from 'common/assets/image/TeamMembers/ProfilePic-Igor.png';
import ChristianPic from 'common/assets/image/TeamMembers/ProfilePic-Christian.png';
import DerekPic from 'common/assets/image/TeamMembers/ProfilePic-Derek.png';
import LanePic from 'common/assets/image/TeamMembers/ProfilePic-Lane.png';
import JerryPic from 'common/assets/image/TeamMembers/ProfilePic-Jerry.png';
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
              <a href="https://www.linkedin.com/in/timmy-kuriakose-5a6537145/">
                <img src={TimmyPic} alt="Timmy Kuriakose" />
              </a>
              <Heading as="h4" content="TIMMY KURIAKOSE" />
              <Text content="CO-FOUNDER / PROJECT COORDINATION" />
            </div>
          </Fade>
        </TeamMember>
        <TeamMember>
          <Fade up delay={175}>
            <div>
              <a href="https://www.linkedin.com/in/igor-ainbinder/">
                <img src={IgorPic} alt="Igor Ainbinder" />
              </a>
              <Heading as="h4" content="IGOR AINBINDER" />
              <Text content="CO-FOUNDER / BUSINESS DEVELOPMENT" />
            </div>
          </Fade>
        </TeamMember>
        <TeamMember>
          <Fade up delay={225}>
            <div>
              <a href="/">
                <img src={ChristianPic} alt="Christian Clayton" />
              </a>
              <Heading as="h4" content="CHRISTIAN CLAYTON" />
              <Text content="CO-FOUNDER / MARKETING" />
            </div>
          </Fade>
        </TeamMember>
        <TeamMember>
          <Fade up delay={100}>
            <div>
              <a href="https://www.linkedin.com/in/derekzx/">
                <img src={DerekPic} alt="Derek Chin" />
              </a>
              <Heading as="h4" content="DEREK CHIN" />
              <Text content="HEAD OF TECHNOLOGY DEVELOPMENT" />
            </div>
          </Fade>
        </TeamMember>
        <TeamMember>
          <Fade up delay={175}>
            <div>
              <a href="https://www.linkedin.com/in/jerry-ku/">
                <img src={JerryPic} alt="Jerry Ku" />
              </a>
              <Heading as="h4" content="JERRY KU" />
              <Text content="LEAD FRONT END DEVELOPER" />
            </div>
          </Fade>
        </TeamMember>
        <TeamMember>
          <Fade up delay={225}>
            <div>
              <a href="https://www.linkedin.com/in/julia-ainbinder/">
                <img src={LanePic} alt="Lane Ainbinder" />
              </a>
              <Heading as="h4" content="LANE AINBINDER" />
              <Text content="LEAD DESIGNER" />
            </div>
          </Fade>
        </TeamMember>
      </ContentWrapper>
    </Container>
  </SectionWrapper>
);

export default PrivacyPortal;
