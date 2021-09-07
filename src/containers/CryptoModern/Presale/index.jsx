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
    const hasSecretLink = Object.keys(query)?.includes('716e5a7d-b5da-4cbf-9eb9-be908007fef7')

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

    const loadBSCContract = async (account) => {
        const UtopiaPresaleBSC = '0x505a4897709b27AfE836F7770433Fb9492BFACf8'
        const UtopiaContract = new window.web3.eth.Contract(BSC_ABI, UtopiaPresaleBSC)
        if (account) {
            UtopiaContract.defaultAccount = account
        }
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
        }
    }, [contract])

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
                    loadBSCContract(account)
                })
        }
    }

    const handleBuyPresale = () => {
        const bnbAmount = window.web3.utils.toWei(intendedBNBPurchaseAmount.toString())
        if (contract) {
            setLoadingPurchase(true)
            contract.methods
                .buyTokens(contract.defaultAccount)
                .send({ from: contract.defaultAccount, value: bnbAmount })
                .then((result) => {
                    if (Object.keys(result).length !== 0) {
                        setPurchasedPresale(true)
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
                    if (newValue >= 1) {
                        newValue = 1
                        setIntendedBNBPurchaseAmount(1)
                    }
                    setIntendedUTPPurchaseAmount((presaleTokens / presaleBNB) * newValue)
                }}
            />
            <Image src="/assets/image/icons/UpAndDownArrows.svg" width={50} height={50} />
            <Input
                inputType="number"
                isMaterial
                label="UTC amount"
                externalValue={intendedUTPPurchaseAmount}
                onChange={setIntendedUTPPurchaseAmount}
                onBlur={(e) => {
                    let newValue = e.target.value
                    if (newValue > presaleTokens / presaleBNB) {
                        newValue = presaleTokens / presaleBNB
                        setIntendedUTPPurchaseAmount(newValue)
                        setIntendedBNBPurchaseAmount(1)
                    } else {
                        setIntendedBNBPurchaseAmount((presaleBNB / presaleTokens) * newValue)
                    }
                }}
            />
            <Button title="Purchase" onClick={handleBuyPresale} />
        </>
    )

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
    if (purchasedPresale) {
        presaleModuleContent = (
            <>
                <Text content="Presale Purchased!" /> <Button title="Make another purchase" onClick={() => setPurchasedPresale(false)} />
            </>
        )
    }
    if (errorMessage) {
        presaleModuleContent = <Text content="Something went wrong with your purchase." />
    }
    return (
        <BannerWrapper id="home">
            <Container>
                <BannerContent>
                    <Fade up delay={50}>
                        <Image src="/assets/image/utoptia/Utopia_dark_full.png" alt="Utopia Banner" width={1258} height={316} priority unoptimized />
                    </Fade>
                    <Fade up delay={100}>
                        <Text className="tagline" content="Be a part of our presale" />
                    </Fade>
                    {!hasSecretLink ? (
                        <div>
                            <Text className="notBegunPresale" content="Pre-sale has not begun yet!" />
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
                </BannerContent>
            </Container>
        </BannerWrapper>
    )
}

export default Presale
