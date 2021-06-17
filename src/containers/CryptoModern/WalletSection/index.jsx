import React from 'react';
import Text from 'common/components/Text';
import Heading from 'common/components/Heading';
import Container from 'common/components/UI/Container';

import SectionWrapper, { ContentWrapper } from './walletSection.style';
import utopiaTree from '../../../common/assets/image/utoptia/utopiaTree.svg';

const WalletPortal = () => (
  <SectionWrapper id="wallet">
    <Heading content="HOW TO BUY" className="sectionHeaderStyle" />

    <Container>

      <ContentWrapper>
        <div className="content">
          <div className="stepOne stepWrapper">
            <Text as="p" className="step" content="Setup MetaMask (Computer/Laptop users) or TrustWallet (Phone users)" />
            <div className="stepDesc">
              <a className="link" href="https://metamask.io/">MetaMask</a>
              <Text as="span" content="&nbsp;can be added as a chrome browser extension and&nbsp;" />
              <a className="link" href="https://trustwallet.com/">TrustWallet</a>
              <Text as="span" content="&nbsp;can be downloaded from the app store or play store. After that, for MetaMask, you will have to add the Binance Smart Chain to your network-list. " />
              <a className="link" href="https://academy.binance.com/en/articles/connecting-metamask-to-binance-smart-chain/">(Click here for a step-by-step tutorial)</a>
            </div>
            <div className="stepNumber">1</div>
            <div className="stepLine" />
          </div>
          <div className="stepTwo stepWrapper">
            <Text as="p" className="step" content="Buy and send BNB to your wallet" />
            <div className="stepDesc">
              <Text as="span" content="Buy BNB on a centralised exchange (i.e. Binance, Coinbase, KuCoin etc.). Then using your wallet address, transfer the tokens to your wallet from the exchange. On TrustWallet, you can buy BNB directly to your wallet with fiat using Simplex. " />
            </div>
            <div className="stepNumber">2</div>
            <div className="stepLine" />
          </div>
          <div className="stepThree stepWrapper">
            <Text as="p" className="step" content="Swap BnB Smart Chain for Utopia on Pancakeswap" />
            <div className="stepDesc">
              <p>
                <Text as="span" content="For computer/laptop users, navigate to&nbsp;" />
                <a className="link" href="https://pancakeswap.finance/">pancakeswap.finance</a>
                <Text as="span" content="&nbsp;and connect your MetaMask wallet. For phone users, access the Dapp browser within the trust wallet app and navigate to pancakeswap.finance and connect your wallet." />
              </p>
              <p>
                <Text as="span" content="Once that is done, obtain the Utopia token address and paste into pancakeswap. Ensure to set slippage to 11% and if any error occurs try a higher slippage. Next swap BnB Smart Chain for Utopia token, which you should be able to view now in your wallet. To view Utopia token on MetaMask, you will have to manually add Utopia to your network list." />
              </p>
            </div>
            <div className="stepNumber">3</div>
          </div>
        </div>
        <img src={utopiaTree} alt="utopia tree" className="utopiaTree" />
      </ContentWrapper>
    </Container>
  </SectionWrapper>
);

export default WalletPortal;
