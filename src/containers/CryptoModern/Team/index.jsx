import React from 'react'
import Fade from 'react-reveal/Fade'
import Text from 'common/components/Text'
import Heading from 'common/components/Heading'
import Container from 'common/components/UI/Container'
import Image from 'next/image'
import SectionWrapper, { ContentWrapper, TeamMember } from './team.style'

const PrivacyPortal = () => (
    <SectionWrapper>
        <Container width="1300px">
            <ContentWrapper>
                <div className="content">
                    <Heading content="TEAM" className="sectionHeaderStyle" />
                </div>
            </ContentWrapper>
            <ContentWrapper>
                <TeamMember>
                    <Fade up delay={100}>
                        <div>
                            <Image src="/assets/image/TeamMembers/ProfilePic-Timmy.png" alt="Timmy Kuriakose" width={275} height={275} />
                            <div className="nameHeader">
                                <Heading as="h4" content="TIMMY KURIAKOSE" />
                                <a href="https://www.linkedin.com/in/timmy-kuriakose-5a6537145/">
                                    <Image src="/assets/image/icons/linkedin.svg" alt="Timmy Kuriakose's LinkedIn Profile" width={32} height={32} />
                                </a>
                            </div>
                            <Text content="CO-FOUNDER / PROJECT COORDINATION" />
                        </div>
                    </Fade>
                </TeamMember>
                <TeamMember>
                    <Fade up delay={175}>
                        <div>
                            <Image src="/assets/image/TeamMembers/ProfilePic-Igor.png" alt="Igor Ainbinder" width={275} height={275} />
                            <div className="nameHeader">
                                <Heading as="h4" content="IGOR AINBINDER" />
                                <a href="https://www.linkedin.com/in/igor-ainbinder/">
                                    <Image src="/assets/image/icons/linkedin.svg" alt="Igor Ainbinder's LinkedIn Profile" width={32} height={32} />
                                </a>
                            </div>
                            <Text content="CO-FOUNDER / BUSINESS DEVELOPMENT" />
                        </div>
                    </Fade>
                </TeamMember>
                {/* <TeamMember>
          <Fade up delay={225}>
            <div>
              <Image src="/assets/image/TeamMembers/ProfilePic-Christian.png" alt="Christian Clayton" width={275} height={275} />
              <div className="nameHeader">
                <Heading as="h4" content="CHRISTIAN CLAYTON" />
                <a href="https://www.instagram.com/onlineboss__/">
                  <Image src="/assets/image/icons/Instagram.svg" alt="Christian Clayton's Instagram Profile" width={32} height={32} />
                </a>
              </div>
              <Text content="CO-FOUNDER / MARKETING" />
            </div>
          </Fade>
        </TeamMember> */}
                <TeamMember>
                    <Fade up delay={100}>
                        <div>
                            <Image src="/assets/image/TeamMembers/ProfilePic-Derek.png" alt="Derek Chin Zhi Xian" width={275} height={275} />
                            <div className="nameHeader">
                                <Heading as="h4" content="DEREK CHIN ZHI XIAN" />
                                <a href="https://www.linkedin.com/in/derekzx/">
                                    <Image src="/assets/image/icons/linkedin.svg" alt="Derek Chin Zhi Xian's LinkedIn Profile" width={32} height={32} />
                                </a>
                            </div>
                            <Text content="HEAD OF TECHNOLOGY DEVELOPMENT" />
                        </div>
                    </Fade>
                </TeamMember>
                <TeamMember>
                    <Fade up delay={175}>
                        <div>
                            <Image src="/assets/image/TeamMembers/ProfilePic-Jerry.png" alt="Jerry Ku" width={275} height={275} />
                            <div className="nameHeader">
                                <Heading as="h4" content="JERRY KU" />
                                <a href="https://www.linkedin.com/in/jerry-ku/">
                                    <Image src="/assets/image/icons/linkedin.svg" alt="Jerry Ku's LinkedIn Profile" width={32} height={32} />
                                </a>
                            </div>
                            <Text content="LEAD FRONT END DEVELOPER" />
                        </div>
                    </Fade>
                </TeamMember>
                <TeamMember>
                    <Fade up delay={225}>
                        <div>
                            <Image src="/assets/image/TeamMembers/ProfilePic-Lane.png" alt="Lane Ainbinder" width={275} height={275} />
                            <div className="nameHeader">
                                <Heading as="h4" content="LANE AINBINDER" />
                                <a href="https://www.linkedin.com/in/julia-ainbinder/">
                                    <Image src="/assets/image/icons/linkedin.svg" alt="Lane Ainbinder's LinkedIn Profile" width={32} height={32} />
                                </a>
                            </div>
                            <Text content="LEAD DESIGNER" />
                        </div>
                    </Fade>
                </TeamMember>
            </ContentWrapper>
        </Container>
    </SectionWrapper>
)

export default PrivacyPortal
