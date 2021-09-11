import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Fade from 'react-reveal/Fade'
import Text from 'common/components/Text'
import Image from 'next/image'
import Button from 'common/components/Button'
import Container from 'common/components/UI/Container'

import Input from 'common/components/Input'
import Web3 from 'web3'
import { Spinner } from 'react-bootstrap'
import BannerWrapper, { BannerContent } from './presale.style'
import BSC_ABI from './BSC_ABI'

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
    const [contract, setContract] = useState(null)
    const [purchasedPresale, setPurchasedPresale] = useState(false)
    const [loadingPurchase, setLoadingPurchase] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)
    const [totalPurchasedBnb, setTotalPurchasedBnb] = useState(0)
    const [currentAccount, setCurrentAccount] = useState(null)
    const [presaleFinalized, setPresaleFinalized] = useState(false)
    const [presalePurchased, setPresalePurchased] = useState(false)
    const [loadingWithdraw, setLoadingWithdraw] = useState(false)
    const [maxPurchaseableTokens, setMaxPurchaseableTokens] = useState(1)

    const loadBSCContract = async () => {
        const UtopiaPresaleBSC = '0x97fB38850D535a8DC81c3773e2566134A2E3C100'
        const UtopiaContract = new window.web3.eth.Contract(BSC_ABI, UtopiaPresaleBSC)
        setContract(UtopiaContract)
    }

    useEffect(() => {
        if (typeof window.web3 !== 'undefined') {
            window.web3 = new Web3(window.web3.currentProvider)
        } else {
            window.web3 = new Web3(new Web3.providers.HttpProvider('https://localhost:8545'))
        }
        loadBSCContract()
    }, [])

    useEffect(() => {
        if (typeof window.ethereum === 'undefined') {
            setHasDappEnabled(false)
        } else {
            setHasDappEnabled(true)
        }
    }, [])

    useEffect(async () => {
        if (contract) {
            const tokensPurchasedInWei = await contract.methods.tokensAlreadyPurchased().call()
            const totalPurchasedTokens = window.web3.utils.fromWei(tokensPurchasedInWei)
            setTotalPurchasedBnb(totalPurchasedTokens)
            const finalized = await contract.methods.finalized().call()
            setPresaleFinalized(finalized)
        }
    }, [contract])

    useEffect(async () => {
        if (currentAccount && contract) {
            const presalePurchasedValue = await contract.methods.purchasedBnb(currentAccount).call()
            setPresalePurchased(Boolean(presalePurchasedValue))
        }
    }, [currentAccount, contract])

    useEffect(async () => {
        if (currentAccount && contract) {
            // console.log(contract.methods)
            // const bnbAllowance = await contract.methods.viewBnbAllowanceForUser(currentAccount).call()
            const purchasedTokensInWei = await contract.methods.purchasedBnb(currentAccount).call()
            // const allowedBnb = window.web3.utils.fromWei(bnbAllowance)
            const bnbPurchased = window.web3.utils.fromWei(purchasedTokensInWei)
            setMaxPurchaseableTokens(1 - bnbPurchased)
        }
    }, [currentAccount, contract])

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
                    setCurrentAccount(account)
                    loadBSCContract(account)
                })
        }
    }

    const handleBuyPresale = () => {
        const bnbAmount = window.web3.utils.toWei(intendedBNBPurchaseAmount.toString())
        if (contract) {
            setLoadingPurchase(true)
            contract.methods
                .buyTokens(currentAccount)
                .send({ from: currentAccount, value: bnbAmount })
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
        if (contract && currentAccount) {
            setLoadingWithdraw(true)
            contract.methods
                .withdrawTokens()
                .send({ from: currentAccount })
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
                        loadBSCContract()
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
                        <Image src="/assets/image/utoptia/Utopia_dark_full.png" alt="Utopia Banner" width={1258} height={316} priority unoptimized />
                    </Fade>
                    <Fade up delay={100}>
                        <Text className="tagline" content="Take part in our presale!" />
                    </Fade>
                    <Fade up delay={100}>
                        {!presaleGUID ? (
                            <div>
                                <Text className="notBegunPresale" content="Pre-sale has not begun yet!" />
                                <Text className="notBegunPresale" content="Coming soon, Sept. 15th" />
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
