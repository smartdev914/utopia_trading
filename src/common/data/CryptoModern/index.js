/* ------------------------------------ */
// Navbar data section
/* ------------------------------------ */
import logo from '../../../../public/assets/image/cryptoModern/logo.png'

/* ------------------------------------ */
// Wallet  data section
/* ------------------------------------ */
import charityIcon from '../../../../public/assets/image/icons/CharityIcon.svg'
import equalityIcon from '../../../../public/assets/image/icons/EqualityIcon.svg'
import communityIcon from '../../../../public/assets/image/icons/CommunityIcon.svg'

export const navbar = {
    logo,
    navMenu: [
        {
            id: 1,
            label: 'WHITE PAPER',
            path: '#white-paper',
            offset: '81',
        },
    ],
}

export const MissionData = [
    {
        id: 1,
        icon: equalityIcon,
        title: 'EQUALITY',
        description:
            'The whole philosophy of Utopia is equality and fairness. We represent this through our anti-bot and anti-whale features. We intend to take a stand against unfairness in the the DeFi space.',
    },
    {
        id: 2,
        icon: charityIcon,
        title: 'CHARITY',
        description: 'We seek to solve real-world problems through our charity donations/crowdfunding. We want to ensure everything we donate has the most impact per dollar.',
    },
    {
        id: 3,
        icon: communityIcon,
        title: 'COMMUNITY',
        description: 'Built by and for the community, we strive to get close to achieving a perfect world with the empowerment and support of our community.',
    },
]

export const TokenomicsData = [
    {
        id: 1,
        title: 'Total Supply',
        value: '1,000,000,000',
    },
    {
        id: 2,
        title: 'Presale',
        value: '290,000,000',
    },
    {
        id: 3,
        title: 'Private Sale',
        value: '50,000,000',
    },
    {
        id: 4,
        title: 'Pancakeswap Liquidity',
        value: '203,000,000',
    },
    {
        id: 5,
        title: 'Team',
        value: '50,000,000',
        description: 'Locked and will be slowly released',
    },
    {
        id: 6,
        title: 'V1 Holders',
        value: '177,700,000',
        description: 'Locked and will be slowly released',
    },
    {
        id: 7,
        title: 'Locked Tokens',
        value: '229,000,000',
        description: 'These tokens will primarily be used to provide liquidity to centralised exchanges for new listings, and a store of value for the business as an asset',
    },
]

export const TokenomicsTaxHightlights = [
    {
        id: 1,
        title: '10%',
        description: 'Total',
    },
    {
        id: 2,
        title: '5%',
        description: 'Utopia Labs Development',
    },

    {
        id: 3,
        title: '4%',
        description: 'Auto liquidity',
    },
    {
        id: 4,
        title: '1%',
        description: 'Autostaking for holders',
    },
]

export const TokenomicsWhaleHightlights = [
    {
        id: 1,
        title: 'Higher tax',
        description: 'for larger transactions',
    },
    {
        id: 2,
        title: 'Max amount of transactions',
        description: 'set to 0.2%',
    },
    {
        id: 3,
        title: 'Max cap per wallet',
        description: 'set to 0.7%',
    },
]

export const Q2RoadMap = [
    {
        id: 'Q2-1',
        checked: true,
        label: 'Presale',
    },
    {
        id: 'Q2-2',
        checked: false,
        label: 'Twitch AMAs',
    },
    {
        id: 'Q2-3',
        checked: true,
        label: 'Pancakeswap Launch',
    },
    {
        id: 'Q2-4',
        checked: true,
        label: 'Launch with Utopia Exchange',
    },
    {
        id: 'Q2-5',
        checked: true,
        label: 'Tech-rate and Certik audit before launch',
    },
    {
        id: 'Q2-6',
        checked: false,
        label: 'Launch marketing',
    },
    {
        id: 'Q2-7',
        checked: true,
        label: 'Website/Whitepaper',
    },
    {
        id: 'Q2-8',
        checked: true,
        label: 'CMC and Coingecko Submissions',
    },
    {
        id: 'Q2-9',
        checked: true,
        label: 'Launch merchandise',
    },
    {
        id: 'Q2-10',
        checked: false,
        label: '1st Charity Donation',
    },
    {
        id: 'Q2-11',
        checked: true,
        label: 'CMC / Coingecko',
    },
    {
        id: 'Q2-12',
        checked: false,
        label: 'Blockfolio',
    },
]

export const Q3RoadMap = [
    {
        id: 'Q3-2',
        checked: false,
        label: 'Establish LLC',
    },
    {
        id: 'Q3-3',
        checked: false,
        label: 'Marketing Campaign',
    },
    {
        id: 'Q3-4',
        checked: false,
        label: '1st Exchange Listing',
    },
    {
        id: 'Q3-5',
        checked: false,
        label: 'Charity Partnerships',
    },
    {
        id: 'Q3-6',
        checked: false,
        label: 'V2 Exchange - Charting, limit orders, stop losses',
    },
    {
        id: 'Q3-7',
        checked: false,
        label: 'Beta LaunchPad',
    },
]

export const Q4RoadMap = [
    {
        id: 'Q4-1',
        checked: false,
        label: 'Utopia charity foundation',
    },
    {
        id: 'Q4-2',
        checked: false,
        label: 'V3 Exchange',
    },
    {
        id: 'Q4-3',
        checked: false,
        label: 'DeFi Crowdfunding tool',
    },
    {
        id: 'Q4-4',
        checked: false,
        label: 'BTC Bridge',
    },
    {
        id: 'Q4-5',
        checked: false,
        label: 'Finalized Launchpad',
    },
]

export const FutureRoadMap = [
    {
        id: 'F-1',
        checked: false,
        label: 'DeFi lending',
    },
    {
        id: 'F-2',
        checked: false,
        label: 'Utopia world',
    },
    {
        id: 'F-3',
        checked: false,
        label: 'Utopia Poker',
    },
    {
        id: 'F-4',
        checked: false,
        label: 'Utopia wallet app with integrated DEX',
    },
    {
        id: 'F-5',
        checked: false,
        label: 'Utopia Debit card',
    },
    {
        id: 'F-6',
        checked: false,
        label: 'Sister token on Ethereum Network',
    },
]

/* ------------------------------------ */
// Faq  data section
/* ------------------------------------ */

export const Faq = [
    {
        id: 1,
        expend: true,
        title: 'How to contact with Customer Service?',
        description:
            'Our Customer Experience Team is available 7 days a week and we offer 2 ways to get in contact.Email and Chat . We try to reply quickly, so you need not to wait too long for a response!. ',
    },
    {
        id: 2,
        title: 'App installation failed, how to update system information?',
        description: 'Please read the documentation carefully . We also have some online  video tutorials regarding this issue . If the problem remains, Please Open a ticket in the support forum . ',
    },
    {
        id: 3,
        title: 'Website reponse taking time, how to improve?',
        description:
            'At first, Please check your internet connection . We also have some online  video tutorials regarding this issue . If the problem remains, Please Open a ticket in the support forum .',
    },
    {
        id: 4,
        title: 'New update fixed all bug and issues?',
        description: 'We are giving the update of this theme continuously . You will receive an email Notification when we push an update. Always try to be updated with us .',
    },
]

/* ------------------------------------ */
// Footer data section
/* ------------------------------------ */
export const FooterData = [
    {
        title: 'About Us',
        menuItems: [
            {
                id: 1,
                url: '#',
                text: 'Support Center',
            },
            {
                id: 2,
                url: '#',
                text: 'Customer Support',
            },
            {
                id: 3,
                url: '#',
                text: 'About Us',
            },
            {
                id: 4,
                url: '#',
                text: 'Copyright',
            },
            {
                id: 5,
                url: '#',
                text: 'Popular Campaign',
            },
        ],
    },
    {
        title: 'Our Information',
        menuItems: [
            {
                id: 1,
                url: '#',
                text: 'Return Policy',
            },
            {
                id: 2,
                url: '#',
                text: 'Privacy Policy',
            },
            {
                id: 3,
                url: '#',
                text: 'Terms & Conditions',
            },
            {
                id: 4,
                url: '#',
                text: 'Site Map',
            },
            {
                id: 5,
                url: '#',
                text: 'Store Hours',
            },
        ],
    },
    {
        title: 'My Account',
        menuItems: [
            {
                id: 1,
                url: '#',
                text: 'Press inquiries',
            },
            {
                id: 2,
                url: '#',
                text: 'Social media directories',
            },
            {
                id: 3,
                url: '#',
                text: 'Images & B-roll',
            },
            {
                id: 4,
                url: '#',
                text: 'Permissions',
            },
            {
                id: 5,
                url: '#',
                text: 'Speaker requests',
            },
        ],
    },
    {
        title: 'Policy',
        menuItems: [
            {
                id: 1,
                url: '#',
                text: 'Application security',
            },
            {
                id: 2,
                url: '#',
                text: 'Software principles',
            },
            {
                id: 3,
                url: '#',
                text: 'Unwanted software policy',
            },
            {
                id: 4,
                url: '#',
                text: 'Responsible supply chain',
            },
        ],
    },
]
