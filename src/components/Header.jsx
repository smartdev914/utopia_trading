/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { Navbar, Nav, Dropdown } from 'react-bootstrap'
import BSCContext from 'context/BSCContext'
import Button from 'common/components/Button'

const Header = () => {
    useEffect(() => {
        const el = document.querySelector('#darkTheme')
        if (el) {
            el.addEventListener('click', () => {
                document.body.classList.toggle('dark')
            })
        }
    }, [])

    const bscContext = useContext(BSCContext)

    return (
        <>
            <Head>
                <title>Utopia Dex</title>
                <meta name="description" content="Utopia Decentralised Exchange Dashboard" />
                <link rel="icon" href="/favicon.png" />
            </Head>
            <header className="light-bb">
                <Navbar expand="lg">
                    <Link href="/">
                        <a href="/" className="navbar-brand">
                            <Image src="/assets/image/utopia/utopiaLogo.svg" alt="logo" width={190} height={24} />
                        </a>
                    </Link>
                    <Image src="/assets/image/icons/BetaV3.svg" height={24} width={64} />
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="navbar-nav ml-auto">
                            {bscContext.currentAccountAddress ? (
                                <Dropdown className="header-img-icon">
                                    <Dropdown.Toggle variant="default">
                                        <Image src="/assets/image/utopia/Utopia_simple_dark_circle.png" width={75} height={75} />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <div className="dropdown-header d-flex flex-column align-items-center">
                                            <div className="figure mb-3">
                                                <img src="img/avatar.svg" alt="" />
                                            </div>
                                            <div className="info text-center">
                                                <p className="name font-weight-bold mb-0">Wallet Address:</p>
                                                <p className="name font-weight-bold mb-0">{`${bscContext.currentAccountAddress.substr(0, 3)}...${bscContext.currentAccountAddress.substr(38)}`}</p>
                                            </div>
                                        </div>
                                        <div className="dropdown-body">
                                            <ul className="profile-nav">
                                                {/* <li className="nav-item">
                                                    <Link href="/profile">
                                                        <a href="/" className="nav-link">
                                                            <i className="icon ion-md-person" />
                                                            <span>Profile</span>
                                                        </a>
                                                    </Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link href="/wallet">
                                                        <a href="/" className="nav-link">
                                                            <i className="icon ion-md-wallet" />
                                                            <span>My Wallet</span>
                                                        </a>
                                                    </Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link href="/settings">
                                                        <a href="/" className="nav-link">
                                                            <i className="icon ion-md-settings" />
                                                            <span>Settings</span>
                                                        </a>
                                                    </Link>
                                                </li> */}
                                                <li className="nav-item" onClick={() => bscContext.logout()}>
                                                    <i className="icon ion-md-power" />
                                                    <span>Log Out</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </Dropdown.Menu>
                                </Dropdown>
                            ) : (
                                <Button
                                    title="CONNECT WALLET"
                                    onClick={async () => {
                                        await bscContext.triggerDappModal()
                                    }}
                                />
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </header>
        </>
    )
}

export default Header
