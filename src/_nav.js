import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilMoney,
  cilHome,
  cilBadge,
  cilUser,
  cilBuilding,
  cibMarketo,
  cilAlbum,
  cilAlarm
} from '@coreui/icons'
import { CNavTitle, CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavTitle,
    name: 'home',
  },
  {
    component: CNavItem,
    name: 'ROI Dapp & Miner',
    to: '/dapps',
    icon: <CIcon icon={ cilHome } customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Token',
    to: '/tokens',
    icon: <CIcon icon={ cilMoney } customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'ADS manage',
    to: '/ads_manage',
    role: 1,
    icon: <CIcon icon={ cilAlarm } customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Services',
  },
  {
    component: CNavItem,
    name: 'Advertisement',
    href: 'https://t.me/DefiDetectiveapp',
    target: '_blank',
    icon: <CIcon icon={cilAlbum} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Project development',
    href: 'https://t.me/DefiDetectiveapp',
    target: '_blank',
    icon: <CIcon icon={ cilBuilding } customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Marketing',
    href: 'https://t.me/DefiDetectiveapp',
    target: '_blank',
    icon: <CIcon icon={cibMarketo} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'DeFi Badge',
    href: 'https://t.me/DefiBadge',
    target: '_blank',
    icon: <CIcon icon={cilBadge} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Influencers',
    to: '/influencers',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Partnership',
    to: '/partners',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  }
]

export default _nav
