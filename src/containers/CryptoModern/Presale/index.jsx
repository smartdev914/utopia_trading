import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Fade from 'react-reveal/Fade'
import Text from 'common/components/Text'
import Image from 'next/image'
import Button from 'common/components/Button'
import Container from 'common/components/UI/Container'

import { Spinner } from 'react-bootstrap'
import BSCContext from 'context/BSCContext'
import BannerWrapper, { BannerContent } from './presale.style'

const Presale = () => {
    const router = useRouter()
    const { query } = router
    const presaleGUID = Object.keys(query)?.includes('716e5a7d-b5da-4cbf-9eb9-be908007fef7')

    const presaleTokens = 300000000000
    const presaleBNB = 500
    const [loadingPurchase, setLoadingPurchase] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)
    const [totalPurchasedBnb, setTotalPurchasedBnb] = useState(0)
    const [presaleFinalized, setPresaleFinalized] = useState(false)
    const [presalePurchased, setPresalePurchased] = useState(false)
    const [loadingWithdraw, setLoadingWithdraw] = useState(false)
    const [maxPurchaseableTokens, setMaxPurchaseableTokens] = useState(0)

    const bscContext = useContext(BSCContext)

    useEffect(() => {
        if (presaleGUID) {
            bscContext.setLoadPresaleContract(true)
        }
    })

    useEffect(async () => {
        if (bscContext.presaleContract) {
            const tokensPurchasedInWei = await bscContext.presaleContract.methods.weiRaised().call()
            const totalPurchasedTokens = window.web3.utils.fromWei(tokensPurchasedInWei)
            setTotalPurchasedBnb(totalPurchasedTokens)
            const finalized = await bscContext.presaleContract.methods.finalized().call()
            setPresaleFinalized(finalized)
        }
    }, [bscContext.presaleContract])

    useEffect(async () => {
        if (bscContext.currentAccountAddress && bscContext.presaleContract) {
            const presalePurchasedValue = await bscContext.presaleContract.methods.purchasedBnb(bscContext.currentAccountAddress).call()
            setPresalePurchased(Boolean(presalePurchasedValue))
        }
    }, [bscContext.currentAccountAddress, bscContext.presaleContract])

    useEffect(async () => {
        if (bscContext.currentAccountAddress && bscContext.presaleContract) {
            const bnbAllowance = await bscContext.presaleContract.methods.viewBnbAllowanceForUser(bscContext.currentAccountAddress).call()
            const allowedBnb = window.web3.utils.fromWei(bnbAllowance)
            setMaxPurchaseableTokens(allowedBnb)
        }
    }, [bscContext.currentAccountAddress, bscContext.presaleContract])

    const round = (value, decimals) => Number(`${Math.round(`${value}e${decimals}`)}e-${decimals}`)

    const handleBuyPresale = () => {
        const bnbAmount = window.web3.utils.toWei(`${maxPurchaseableTokens}`)
        if (bscContext.presaleContract) {
            setLoadingPurchase(true)
            bscContext.presaleContract.methods
                .buyTokens(bscContext.currentAccountAddress)
                .send({ from: bscContext.currentAccountAddress, value: bnbAmount })
                .then((result) => {
                    if (Object.keys(result).length === 0) {
                        setErrorMessage(`This wallet is not white listed!`)
                    }
                    setLoadingPurchase(false)
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
                    <p>
                        <Text as="div" content="Max Contribution:" />
                        <Text as="span" content={`${maxPurchaseableTokens} BNB = ${maxPurchaseableTokens * (presaleTokens / presaleBNB)} UTP`} />
                    </p>
                    <Text className="wallet-address" content={`Wallet Address: ${bscContext.currentAccountAddress}`} />
                    <Text as="div" content={`Current Balance: ${window.web3.utils.fromWei(bscContext.currentBnbBalance)} BNB`} />
                    {bscContext.currentBnbBalance > maxPurchaseableTokens ? <Button title="Contribute to the Presale!" onClick={handleBuyPresale} /> : <Text content="Insufficient Funds..." />}
                </>
            )}
        </>
    )

    const handleWithdraw = () => {
        if (bscContext.presaleContract && bscContext.currentAccountAddress) {
            setLoadingWithdraw(true)
            bscContext.presaleContract.methods
                .withdrawTokens()
                .send({ from: bscContext.currentAccountAddress })
                .then((result) => {
                    setLoadingWithdraw(false)
                    setErrorMessage('Tokens Successfully Withdrawn!')
                })
                .catch((err) => {
                    setLoadingWithdraw(false)
                    setErrorMessage('Error withdrawing tokens. (No Tokens left to withdraw)')
                })
        }
    }

    if (presaleFinalized) {
        if (presalePurchased) {
            presaleModuleContent = (
                <>
                    <Text content="Thank you. Presale has ended." />
                    <Button title="Withdraw Purchased UTP" onClick={() => handleWithdraw()} />
                </>
            )
        } else {
            presaleModuleContent = (
                <>
                    <Text content="Thank you. Presale has ended." />
                </>
            )
        }
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
    return (
        <BannerWrapper id="home">
            <Container>
                <BannerContent>
                    <Fade up delay={50}>
                        <Image src="/assets/image/utopia/Utopia_dark_full.png" alt="Utopia Banner" width={1258} height={316} priority unoptimized />
                    </Fade>
                    <Fade up delay={100}>
                        <Text className="tagline" content="Take part in our presale!" />
                    </Fade>
                    <Fade up delay={100}>
                        {!presaleGUID ? (
                            <div>
                                <Text className="notBegunPresale" content="Pre-sale has not begun yet!" />
                                <Text className="notBegunPresale" content="Coming soon, Sept. 29th" />
                            </div>
                        ) : (
                            <>
                                {bscContext.hasDappBrowser ? (
                                    <div className="presale-module">{bscContext.currentAccountAddress ? presaleModuleContent : <Text content="No Wallet Address Provided" />}</div>
                                ) : (
                                    <div className="presale-module dapp-disabled">
                                        <Text content="Please connect your wallet to continue" />
                                        <Button
                                            title="Connect Wallet"
                                            onClick={async () => {
                                                await bscContext.triggerDappModal()
                                            }}
                                        />
                                    </div>
                                )}
                                <div className="presaleBar">
                                    <div className="presaleProgressBar">
                                        <div className="filledBar" style={{ width: `${(totalPurchasedBnb / presaleBNB) * 100}%` }} />
                                        <Text className="progressText" as="div" content={`${round(totalPurchasedBnb, 3)} BNB / ${presaleBNB} BNB`} />
                                    </div>
                                </div>
                            </>
                        )}
                    </Fade>
                </BannerContent>
            </Container>
        </BannerWrapper>
    )
}

export default Presale
