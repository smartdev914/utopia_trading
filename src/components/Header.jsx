import React, { Component } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { Navbar, Nav, NavDropdown, Dropdown, Button } from 'react-bootstrap'
import { ThemeConsumer } from '../context/ThemeContext'

export default class Header extends Component {
    componentDidMount() {
        const el = document.querySelector('#darkTheme')
        if (el) {
            el.addEventListener('click', () => {
                document.body.classList.toggle('dark')
            })
        }
    }

    render() {
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
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="navbar-nav mr-auto">
                                {/* <Link href="/">
                                    <a href="/" className="nav-link">
                                        Exchange
                                    </a>
                                </Link> */}
                                <Link href="/markets">
                                    <a href="/" className="nav-link">
                                        Markets
                                    </a>
                                </Link>
                                <NavDropdown title="Dashboard">
                                    <Link href="/profile">
                                        <a href="/" className="dropdown-item">
                                            Profile
                                        </a>
                                    </Link>
                                    <Link href="/wallet">
                                        <a href="/" className="dropdown-item">
                                            Wallet
                                        </a>
                                    </Link>
                                    <Link href="/settings">
                                        <a href="/" className="dropdown-item">
                                            Settings
                                        </a>
                                    </Link>
                                </NavDropdown>
                                <NavDropdown title="Others">
                                    <Link href="/login">
                                        <a href="/" className="dropdown-item">
                                            Login
                                        </a>
                                    </Link>
                                    <Link href="/signup">
                                        <a href="/" className="dropdown-item">
                                            Sign up
                                        </a>
                                    </Link>
                                    <Link href="/lock">
                                        <a href="/" className="dropdown-item">
                                            Lock
                                        </a>
                                    </Link>
                                    <Link href="/otp-number">
                                        <a href="/" className="dropdown-item">
                                            OTP Number
                                        </a>
                                    </Link>
                                    <Link href="/otp-verify">
                                        <a href="/" className="dropdown-item">
                                            OTP Verify
                                        </a>
                                    </Link>
                                    <Link href="/reset">
                                        <a href="/" className="dropdown-item">
                                            Reset
                                        </a>
                                    </Link>
                                    <Link href="/notfound">
                                        <a href="/" className="dropdown-item">
                                            404
                                        </a>
                                    </Link>
                                </NavDropdown>
                            </Nav>
                            <Nav className="navbar-nav ml-auto">
                                <Dropdown className="header-custom-icon">
                                    <ThemeConsumer>
                                        {({ data, update }) => (
                                            <Button variant="default" onClick={update} id="darkTheme">
                                                {data.theme === 'light' ? <i className="icon ion-md-moon" /> : <i className="icon ion-md-sunny" />}
                                            </Button>
                                        )}
                                    </ThemeConsumer>
                                    <Dropdown.Toggle variant="default">
                                        <i className="icon ion-md-notifications" />
                                        <span className="circle-pulse" />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <div className="dropdown-header d-flex align-items-center justify-content-between">
                                            <p className="mb-0 font-weight-medium">6 New Notifications</p>
                                            <Link href="/">
                                                <a href="/" className="text-muted">
                                                    Clear all
                                                </a>
                                            </Link>
                                        </div>
                                        <div className="dropdown-body">
                                            <Link href="/">
                                                <a href="/" className="dropdown-item">
                                                    <div className="icon">
                                                        <i className="icon ion-md-lock" />
                                                    </div>
                                                    <div className="content">
                                                        <p>Account password change</p>
                                                        <p className="sub-text text-muted">5 sec ago</p>
                                                    </div>
                                                </a>
                                            </Link>
                                            <Link href="/">
                                                <a href="/" className="dropdown-item">
                                                    <div className="icon">
                                                        <i className="icon ion-md-alert" />
                                                    </div>
                                                    <div className="content">
                                                        <p>Solve the security issue</p>
                                                        <p className="sub-text text-muted">10 min ago</p>
                                                    </div>
                                                </a>
                                            </Link>
                                            <Link href="/">
                                                <a href="/" className="dropdown-item">
                                                    <div className="icon">
                                                        <i className="icon ion-logo-android" />
                                                    </div>
                                                    <div className="content">
                                                        <p>Download android app</p>
                                                        <p className="sub-text text-muted">1 hrs ago</p>
                                                    </div>
                                                </a>
                                            </Link>
                                            <Link href="/">
                                                <a href="/" className="dropdown-item">
                                                    <div className="icon">
                                                        <i className="icon ion-logo-bitcoin" />
                                                    </div>
                                                    <div className="content">
                                                        <p>Bitcoin price is high now</p>
                                                        <p className="sub-text text-muted">2 hrs ago</p>
                                                    </div>
                                                </a>
                                            </Link>
                                            <Link href="/">
                                                <a href="/" className="dropdown-item">
                                                    <div className="icon">
                                                        <i className="icon ion-logo-usd" />
                                                    </div>
                                                    <div className="content">
                                                        <p>Payment completed</p>
                                                        <p className="sub-text text-muted">4 hrs ago</p>
                                                    </div>
                                                </a>
                                            </Link>
                                        </div>
                                        <div className="dropdown-footer d-flex align-items-center justify-content-center">
                                            <Link href="/">
                                                <a href="/">View all</a>
                                            </Link>
                                        </div>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Dropdown className="header-img-icon">
                                    <Dropdown.Toggle variant="default">
                                        <img src="img/avatar.svg" alt="avatar" />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <div className="dropdown-header d-flex flex-column align-items-center">
                                            <div className="figure mb-3">
                                                <img src="img/avatar.svg" alt="" />
                                            </div>
                                            <div className="info text-center">
                                                <p className="name font-weight-bold mb-0">Tony Stark</p>
                                                <p className="email text-muted mb-3">tonystark@gmail.com</p>
                                            </div>
                                        </div>
                                        <div className="dropdown-body">
                                            <ul className="profile-nav">
                                                <li className="nav-item">
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
                                                </li>
                                                <li className="nav-item">
                                                    <Link href="/login">
                                                        <a href="/" className="nav-link red">
                                                            <i className="icon ion-md-power" />
                                                            <span>Log Out</span>
                                                        </a>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </header>
            </>
        )
    }
}
