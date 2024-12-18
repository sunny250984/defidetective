import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler,CImage } from '@coreui/react'

import { AppSidebarNav } from './AppSidebarNav'
import { ctrlSidebar } from 'src/store/actions/app.actions'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navigation from '../_nav'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sapp.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sapp.sidebarShow)

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch( ctrlSidebar(visible) )
      }}
    >
      <CSidebarBrand className="d-none d-md-flex justify-content-start ps-3">
        <NavLink to="/">
          <CImage className="sidebar-brand-full header-logo" fluid src="/images/logo-icon.png" height={35} />
        </NavLink>
        <NavLink to="/">
          <CImage className="sidebar-brand-narrow" fluid src="/images/badge.png" height={35} />
        </NavLink>
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch( ctrlSidebar({sidebarUnfoldable: !unfoldable}, 1))}
      />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
