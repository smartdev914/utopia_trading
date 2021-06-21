import React from 'react';
import Fade from 'react-reveal/Fade';
import Text from 'common/components/Text';
import Heading from 'common/components/Heading';
import Container from 'common/components/UI/Container';
import SectionWrapper, { ContentWrapper, ProductIcon, ProductSectionWrapper } from './products.style';

const PrivacyPortal = () => (
  <SectionWrapper>
    <Container fullWidth>
      <ContentWrapper>
        <div className="content">
          <Heading content="PRODUCTS" className="sectionHeaderStyle" />
          <Heading content="IN DEVELOPMENT" className="sectionHeaderStyle" />
        </div>
      </ContentWrapper>
      <ContentWrapper>
        <div className="productColumn">
          <Fade left>
            <ProductSectionWrapper>
              <ProductIcon />
              <Text content="UTOPIA DECENTRALIZED EXCHANGE" />
              <Text as="span" content="The Decentralized Exchange will allow seamless trading with minimal fees. " />
              <Text className="highlightText" as="span" content="The exchange will include various tools including next gen charting, limit orders and more. " />
              <Text as="span" content="Eventually we intend to have our own liquidity pools that will be directly linked to our launchpad, allowing easy token launches." />
            </ProductSectionWrapper>
          </Fade>
          <Fade left delay={50}>
            <ProductSectionWrapper>
              <ProductIcon />
              <Text content="DEFI CROWDFUNDING TOOL" />
              <Text as="span" content="Using our decentralised crowdfunding platform, " />
              <Text className="highlightText" as="span" content="people will be able to use trustless smart contracts to fund charitable acts. " />
              <Text as="span" content="In addition, the platform will hold users accountable for following through on their projects once successfully funded." />
            </ProductSectionWrapper>
          </Fade>
        </div>
        <div className="productColumn">
          <Fade right delay={50}>
            <ProductSectionWrapper>
              <ProductIcon />
              <Text content="UTOPIA LAUNCHPAD" />
              <Text as="span" content="This decentralised platform will provide new tokens the essential tools for conducting presales. " />
              <Text className="highlightText" as="span" content="There will be multiple anti-bot features that will be implemented so that fair presales can be conducted. " />
              <Text as="span" content="We will also have a whitelist presale feature that will be fully automated and will have anti-bot features to avoid bots submitting multiple times. The launchpad will eventually be directly linked to the exchange liquidity pool, allowing easy token launches." />
            </ProductSectionWrapper>
          </Fade>
          <Fade right>
            <ProductSectionWrapper>
              <ProductIcon />
              <Text content="BTC UTOPIA BRIDGE" />
              <Text as="span" content="In order to further lower the barrier of entry to buy our token and to bring further utility to the platform, we will build a decentralized bridge in between BTC and UTOPIA. This bridge will " />
              <Text className="highlightText" as="span" content="allow users to go fluidly in between the 2 different blockchains." />
            </ProductSectionWrapper>
          </Fade>
        </div>
      </ContentWrapper>
    </Container>
  </SectionWrapper>
);

export default PrivacyPortal;
