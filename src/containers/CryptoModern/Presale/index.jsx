import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Fade from 'react-reveal/Fade'
import Text from 'common/components/Text'
import Image from 'next/image'
import Button from 'common/components/Button'
import Container from 'common/components/UI/Container'

import Input from 'common/components/Input'
import { Spinner } from 'react-bootstrap'
import BSCContext from 'context/BSCContext'
import BannerWrapper, { BannerContent } from './presale.style'

const Presale = () => {
    const router = useRouter()
    const { query } = router
    const presaleGUID = Object.keys(query)?.includes('716e5a7d-b5da-4cbf-9eb9-be908007fef7')

    const presaleTokens = 350000000000
    const presaleBNB = 600
    const [intendedBNBPurchaseAmount, setIntendedBNBPurchaseAmount] = useState(0)
    const [intendedUTPPurchaseAmount, setIntendedUTPPurchaseAmount] = useState(0)
    const [hasDappEnabled, setHasDappEnabled] = useState(false)
    const [accessGranted, setAccessGranted] = useState(false)
    const [purchasedPresale, setPurchasedPresale] = useState(false)
    const [loadingPurchase, setLoadingPurchase] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)
    const [totalPurchasedBnb, setTotalPurchasedBnb] = useState(0)
    const [presaleFinalized, setPresaleFinalized] = useState(false)
    const [presalePurchased, setPresalePurchased] = useState(false)
    const [loadingWithdraw, setLoadingWithdraw] = useState(false)
    const [maxPurchaseableTokens, setMaxPurchaseableTokens] = useState(1)

    const bscContext = useContext(BSCContext)

    useEffect(() => {
        if (typeof window.ethereum === 'undefined') {
            setHasDappEnabled(false)
        } else {
            setHasDappEnabled(true)
        }
    }, [])

    useEffect(async () => {
        if (bscContext.presaleContract) {
            const tokensPurchasedInWei = await bscContext.presaleContract.methods.tokensAlreadyPurchased().call()
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
            const purchasedTokensInWei = await bscContext.presaleContract.methods.purchasedBnb(bscContext.currentAccountAddress).call()
            const allowedBnb = window.web3.utils.fromWei(bnbAllowance)
            const bnbPurchased = window.web3.utils.fromWei(purchasedTokensInWei)
            setMaxPurchaseableTokens(allowedBnb - bnbPurchased)
        }
    }, [bscContext.currentAccountAddress, bscContext.presaleContract])

    const round = (value, decimals) => Number(`${Math.round(`${value}e${decimals}`)}e-${decimals}`)

    const loadPubKey = () => {
        if (window.ethereum) {
            setHasDappEnabled(true)
            window.ethereum
                .enable()
                .catch((reason) => {
                    if (reason === 'User rejected provider access') {
                        setAccessGranted(false)
                    } else {
                        setAccessGranted(false)
                    }
                })
                .then((accounts) => {
                    setAccessGranted(true)
                    const account = accounts[0]
                    bscContext.setCurrentAccountAddress(account)
                })
        }
    }

    const handleBuyPresale = () => {
        const bnbAmount = window.web3.utils.toWei(intendedBNBPurchaseAmount.toString())
        if (bscContext.presaleContract) {
            setLoadingPurchase(true)
            bscContext.presaleContract.methods
                .buyTokens(bscContext.currentAccountAddress)
                .send({ from: bscContext.currentAccountAddress, value: bnbAmount })
                .then((result) => {
                    if (Object.keys(result).length !== 0) {
                        setPurchasedPresale(true)
                        setMaxPurchaseableTokens(maxPurchaseableTokens - intendedBNBPurchaseAmount)
                    } else {
                        setErrorMessage(`You aren't white listed!`)
                    }
                    setLoadingPurchase(false)
                })
                .catch(() => {
                    setErrorMessage('Something went wrong with your purchase')
                    setLoadingPurchase(false)
                })
        }
    }

    let presaleModuleContent = (
        <>
            <Input
                inputType="number"
                isMaterial
                label="BNB amount"
                externalValue={intendedBNBPurchaseAmount}
                onChange={(e) => {
                    setIntendedBNBPurchaseAmount(e)
                }}
                onBlur={(e) => {
                    let newValue = e.target.value
                    if (newValue >= maxPurchaseableTokens) {
                        newValue = maxPurchaseableTokens
                        setIntendedBNBPurchaseAmount(maxPurchaseableTokens.toFixed(6))
                    }
                    setIntendedUTPPurchaseAmount((presaleTokens / presaleBNB) * newValue)
                }}
            />
            <Image src="/assets/image/icons/UpAndDownArrows.svg" width={50} height={50} />
            <Input
                inputType="number"
                isMaterial
                label="UTP amount"
                externalValue={intendedUTPPurchaseAmount}
                onChange={setIntendedUTPPurchaseAmount}
                onBlur={(e) => {
                    let newValue = e.target.value
                    if (newValue > (presaleTokens / presaleBNB) * maxPurchaseableTokens) {
                        newValue = (presaleTokens / presaleBNB) * maxPurchaseableTokens
                        setIntendedUTPPurchaseAmount(newValue)
                        setIntendedBNBPurchaseAmount(maxPurchaseableTokens)
                    } else {
                        setIntendedBNBPurchaseAmount(((presaleBNB / presaleTokens) * newValue).toFixed(6))
                    }
                }}
            />
            <Button title="Purchase" onClick={handleBuyPresale} />
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

    if (purchasedPresale) {
        presaleModuleContent = (
            <>
                <Text content="Presale Purchased!" />{' '}
                <Button
                    title="Make another purchase"
                    onClick={() => {
                        setPurchasedPresale(false)
                    }}
                />
            </>
        )
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
                                {hasDappEnabled ? (
                                    <div className="presale-module">{accessGranted ? presaleModuleContent : <Button title="Connect MetaMask Wallet" onClick={loadPubKey} />}</div>
                                ) : (
                                    <div className="presale-module dapp-disabled">
                                        <Text content="Looks like you need a Dapp browser to get started." />
                                        <Text content="Consider installing MetaMask!" />
                                    </div>
                                )}
                                <div className="presaleBar">
                                    <div className="presaleProgressBar">
                                        <div className="filledBar" style={{ width: `${(totalPurchasedBnb / presaleBNB) * 100}%` }} />
                                        <Text className="progressText" as="div" content={`${round(totalPurchasedBnb, 3)} BNB / 600 BNB`} />
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
