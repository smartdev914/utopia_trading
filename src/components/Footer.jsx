/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import { Navbar } from 'react-bootstrap'

const Header = () => (
    <>
        <footer className="">
            <Navbar expand="lg">
                <p className="utopia">@ 2022 Utopia</p>
                <a href="https://forms.gle/9WRD22TVkWWJgtZg7" target="_blank" rel="noreferrer">
                    <span>Bug Report</span>
                </a>
                <a href="https://forms.gle/bqkvrHPZJAXAAMVx5" target="_blank" rel="noreferrer">
                    <span>Feature Request</span>
                </a>
                <a href="https://t.me/UtopiaBSCOfficial" target="_blank" rel="noreferrer">
                    <span>Telegram</span>
                </a>
                <a href="https://twitter.com/utopia_bsc" target="_blank" rel="noreferrer">
                    <span>Twitter</span>
                </a>
                <a href="https://discord.gg/XWv5hCb8mG" target="_blank" rel="noreferrer">
                    <span>Discord</span>
                </a>
            </Navbar>
        </footer>
    </>
)

export default Header
