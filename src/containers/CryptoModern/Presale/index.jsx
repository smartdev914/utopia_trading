import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Fade from 'react-reveal/Fade'
import Text from 'common/components/Text'
import Image from 'next/image'
import Button from 'common/components/Button'
import Container from 'common/components/UI/Container'

import Input from 'common/components/Input'
import Web3 from 'web3'
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

    useEffect(() => {
        if (typeof window.web3 !== 'undefined') {
            window.web3 = new Web3(window.web3.currentProvider)
        } else {
            window.web3 = new Web3(new Web3.providers.HttpProvider('https://localhost:8545'))
        }
    }, [])

    useEffect(() => {
        if (typeof window.ethereum === 'undefined') {
            setHasDappEnabled(false)
        } else {
            setHasDappEnabled(true)
        }
    }, [])

    const loadBSCContract = async (account) => {
        const UtopiaBSCAddress = '0x4470744dF1d210cF99f9Ac9533aD2F7f4C259818'
        const UtopiaContract = new window.web3.eth.Contract(BSC_ABI, UtopiaBSCAddress)
        UtopiaContract.defaultAccount = account
        const charityAddress = await UtopiaContract.methods.showCharityaddress().call()
        console.log(charityAddress)
    }

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
                        console.log(reason)
                        alert('There was an issue signing you in.')
                    }
                })
                .then((accounts) => {
                    setAccessGranted(true)
                    const account = accounts[0]
                    loadBSCContract(account)
                })
        }
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
                                <div className="presale-module">
                                    {accessGranted ? (
                                        <>
                                            <Input
                                                inputType="number"
                                                isMaterial
                                                label="BNB amount"
                                                externalValue={intendedBNBPurchaseAmount}
                                                onChange={setIntendedBNBPurchaseAmount}
                                                onBlur={(e) => {
                                                    setIntendedUTPPurchaseAmount((presaleTokens / presaleBNB) * e.target.value)
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
                                                    setIntendedBNBPurchaseAmount((presaleBNB / presaleTokens) * e.target.value)
                                                }}
                                            />
                                            <Button title="Purchase" />
                                        </>
                                    ) : (
                                        <Button title="Connect MetaMask Wallet" onClick={loadPubKey} />
                                    )}
                                </div>
                            ) : (
                                <div className="presale-module dapp-disabled">
                                    <Text content="Looks like you need a Dapp browser to get started." />
                                    <Text content="Consider installing MetaMask!" />
                                </div>
                            )}
                            <div className="presaleBar">
                                <div className="presaleProgressBar">
                                    <div className="filledBar" />
                                    <Text className="progressText" as="div" content="~200 BNB / 600 BNB" />
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
