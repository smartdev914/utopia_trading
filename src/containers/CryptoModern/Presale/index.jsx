import React, { useContext, useEffect, useState } from 'react'
import Fade from 'react-reveal/Fade'
import Text from 'common/components/Text'
import Image from 'next/image'
import Button from 'common/components/Button'
import Container from 'common/components/UI/Container'

import { Spinner } from 'react-bootstrap'
import BSCContext from 'context/BSCContext'
import { getBalanceAmount, getDecimalAmount, round } from 'common/utils/numbers'
import { getContract } from 'common/utils/getContract'
import { useRouter } from 'next/dist/client/router'
import bscPresaleABI from '../../../ABI/bscPresaleABI'
import BannerWrapper, { BannerContent } from './presale.style'

const Presale = () => {
    const router = useRouter()
    const { query } = router
    const presaleGUID = Object.keys(query)?.includes('fb3ca69d-0bab-4110-8b2b-4fcf11a60298')
    const withdrawGUID = Object.keys(query)?.includes('8405945e-c2e4-4777-81be-e31a11106754')

    const UtopiaPresaleBSCAddress = '0x609692D1A4c45FB8f535269f4339b7880296baa0'

    const presaleTokens = 300000000000
    const presaleBNB = presaleGUID ? 425 : 400
    const [presaleContract, setPresaleContract] = useState()
    const [loadingPurchase, setLoadingPurchase] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)
    const [totalPurchasedBnb, setTotalPurchasedBnb] = useState(0)
    const [presaleFinalized, setPresaleFinalized] = useState(false)
    const [presalePurchased, setPresalePurchased] = useState(false)
    const [loadingWithdraw, setLoadingWithdraw] = useState(false)
    const [maxPurchaseableTokens, setMaxPurchaseableTokens] = useState(0)

    const bscContext = useContext(BSCContext)

    useEffect(() => {
        bscContext.setLoadPresaleContract(true)
        localStorage.removeItem('walletconnect')
    }, [])

    useEffect(() => {
        const UtopiaContract = getContract(bscPresaleABI, UtopiaPresaleBSCAddress, bscContext.signer)
        setPresaleContract(UtopiaContract)
    }, [bscContext.signer])

    useEffect(async () => {
        if (presaleContract) {
            const tokensPurchasedInWei = await presaleContract.weiRaised()
            const totalPurchasedTokens = getBalanceAmount(tokensPurchasedInWei, 18)
            setTotalPurchasedBnb(round(totalPurchasedTokens, 0))
            const finalized = await presaleContract.finalized()
            setPresaleFinalized(finalized)
        }
    }, [presaleContract])

    useEffect(async () => {
        if (bscContext.currentAccountAddress && presaleContract) {
            const presalePurchasedValue = await presaleContract.purchasedBnb(bscContext.currentAccountAddress)
            setPresalePurchased(parseFloat(presalePurchasedValue) > 0)
        }
    }, [bscContext.currentAccountAddress, presaleContract])

    useEffect(async () => {
        if (bscContext.currentAccountAddress && presaleContract) {
            const bnbAllowance = await presaleContract.viewBnbAllowanceForUser(bscContext.currentAccountAddress)
            const allowedBnb = getBalanceAmount(bnbAllowance, 18)
            setMaxPurchaseableTokens(allowedBnb)
        }
    }, [bscContext.currentAccountAddress, presaleContract])

    const handleBuyPresale = () => {
        const bnbAmount = getDecimalAmount(`${maxPurchaseableTokens}`, 18)
        if (presaleContract) {
            setLoadingPurchase(true)
            presaleContract
                .buyTokens(bscContext.currentAccountAddress)
                .send({ from: bscContext.currentAccountAddress, value: bnbAmount })
                .then((result) => {
                    if (Object.keys(result).length === 0) {
                        setErrorMessage(`This wallet is not white listed!`)
                    }
                    setLoadingPurchase(false)
                    setPresalePurchased(true)
                })
                .catch(() => {
                    setErrorMessage('Something went wrong with your purchase')
                    setLoadingPurchase(false)
                })
        }
    }

    let presaleModuleContent = bscContext.currentAccountAddress && (
        <>
            {maxPurchaseableTokens < 1 ? (
                <>
                    <Text content="Unable to contribute to presale!" />
                    <Text content="This address is not white listed or you have already contributed!" />
                </>
            ) : (
                <>
                    <Text className="max-contribution" as="div" content="Max Contribution:" />
                    <Text className="highlight" as="p" content={`${maxPurchaseableTokens} BNB = ${(maxPurchaseableTokens * (presaleTokens / 500)).toLocaleString()} UTOPIA`} />
                    <Text className="wallet-address" content={`Wallet Address: ${bscContext.currentAccountAddress}`} />
                    <Text className="current-balance" as="div" content={`Current Balance: ${round(getBalanceAmount(bscContext.currentBnbBalance, 18), 4)} BNB`} />
                    {parseFloat(bscContext.currentBnbBalance) > parseInt(maxPurchaseableTokens, 10) ? (
                        <Button title="Contribute to the Presale!" onClick={handleBuyPresale} />
                    ) : (
                        <Text content="Insufficient Funds..." />
                    )}
                </>
            )}
        </>
    )

    const handleWithdraw = async () => {
        if (presaleContract && bscContext.currentAccountAddress) {
            setLoadingWithdraw(true)
            await presaleContract
                .withdrawTokens()
                .then((result) => {
                    setLoadingWithdraw(false)
                    setErrorMessage('Tokens Successfully Withdrawn!')
                })
                .catch((err) => {
                    console.log(err)
                    setLoadingWithdraw(false)
                    setErrorMessage('Error withdrawing tokens. (No Tokens left to withdraw)')
                })
        }
    }

    if (presaleFinalized || withdrawGUID) {
        presaleModuleContent = (
            <>
                <Text content="Thank you for Participating!" />
                <Button title="Withdraw Purchased UTOPIA" onClick={() => handleWithdraw()} />
            </>
        )
    }

    if (loadingPurchase) {
        presaleModuleContent = (
            <>
                <Text content="Purchasing Presale..." />
                <p>
                    <Spinner size="" animation="border" variant="primary" />
                </p>
            </>
        )
    }

    if (loadingWithdraw) {
        presaleModuleContent = (
            <>
                <Text content="Loading Withdraw..." />
                <p>
                    <Spinner size="" animation="border" variant="primary" />
                </p>
            </>
        )
    }

    if (errorMessage) {
        presaleModuleContent = <Text content={errorMessage} />
    }

    if (totalPurchasedBnb >= presaleBNB && !presaleFinalized && !withdrawGUID) {
        presaleModuleContent = (
            <>
                <Text content="Presale Sold out!" />
                <Text content="Thank you for your consideration." />
                <Text content="Join us for our launch on Oct. 2nd" />
            </>
        )
    }
    return (
        <BannerWrapper id="home">
            <Container>
                <BannerContent>
                    <Fade up delay={50}>
                        <Image src="/assets/image/utopia/Utopia_dark_full.png" alt="Utopia Banner" width={1258} height={316} priority unoptimized />
                    </Fade>
                    <Fade up delay={100}>
                        {presaleGUID ? <Text className="tagline" content="Take part in our Special Presale!" /> : <Text className="tagline" content="Take part in our Presale!" />}
                    </Fade>
                    <Fade up delay={100}>
                        <>
                            {bscContext.hasDappBrowser ? (
                                <div className="presale-module">{bscContext.currentAccountAddress ? presaleModuleContent : <Text content="No Wallet Address Provided" />}</div>
                            ) : (
                                <>
                                    <div className="presale-module dapp-disabled">
                                        {presaleFinalized && <Text content="Presale Concluded!" />}
                                        <Text content={presaleFinalized ? 'Please connect your wallet to Withdraw' : 'Please connect your wallet to continue'} />
                                        <Button
                                            title="Connect Wallet"
                                            onClick={async () => {
                                                await bscContext.triggerDappModal()
                                            }}
                                        />
                                    </div>
                                </>
                            )}
                            <div className="presaleBar">
                                <div className="presaleProgressBar">
                                    <div className="filledBar" style={{ width: `100%` }} />
                                    <Text className="progressText" as="div" content="FULLY FUNDED!" />
                                </div>
                            </div>

                            <Text content="REGISTER THE UTOPIA TOKEN ADDRESS TO YOUR WALLET" />
                            <Text content="For Metamask users:" />
                            <Button
                                title="Click here to register token"
                                onClick={async () => {
                                    await bscContext.registerUTPToken()
                                }}
                            />
                            <Text content="For all other users, manually add the following address:" />
                            <Text className="highlight" content="0x1a1d7c7A92e8d7f0de10Ae532ECD9f63B7EAf67c" />
                        </>
                    </Fade>
                </BannerContent>
            </Container>
        </BannerWrapper>
    )
}

export default Presale
