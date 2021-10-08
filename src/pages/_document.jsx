/* eslint-disable react/no-danger */
/* eslint-disable no-param-reassign */
/* eslint-disable no-multi-assign */
import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class CustomDocument extends Document {
    static async getInitialProps(ctx) {
        const sheet = new ServerStyleSheet()
        const originalRenderPage = ctx.renderPage
        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
                })
            const initialProps = await Document.getInitialProps(ctx)
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
            }
        } finally {
            sheet.seal()
        }
    }

    render() {
        return (
            <Html lang="en">
                <Head>
                    <script async src="https://www.googletagmanager.com/gtag/js?id=GTM-WJ9MS9B" />
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', 'GTM-WJ9MS9B', {
                              page_path: window.location.pathname,
                            });
                          `,
                        }}
                    />
                    <link rel="shortcut icon" type="image/x-icon" href="/assets/image/favicon-32x32.png" />
                    <link href="https://fonts.googleapis.com/css2?family=Syncopate:wght@400;700&display=swap" rel="stylesheet" />
                    <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500;600;700&family=Syncopate:wght@400;700&display=swap" rel="stylesheet" />
                    <link href="https://fonts.googleapis.com/css2?family=Dosis:wght@200;300;500;700&family=Noto+Sans:wght@400;700&display=swap" rel="stylesheet" />
                    <link href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i" rel="stylesheet" />
                    <script type="text/javascript" src="/libs/charting_library_cloned_data/charting_library/charting_library.js" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
                <noscript>
                    <iframe title="googletagmanager" src="https://www.googletagmanager.com/ns.html?id=GTM-WJ9MS9B" height="0" width="0" style={{ display: 'none', visibility: 'hidden' }} />
                </noscript>
            </Html>
        )
    }
}
