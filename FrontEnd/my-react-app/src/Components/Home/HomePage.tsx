import React, { useEffect, useState } from 'react'
import { styled } from '@mui/system'
import NavBarComp from './NavBarComp'
import AppBarComp from '../AppBar/AppBarComp'
import FloatingBarComp from './FloatingBarComp'
import User from '../../Classes/User'
import Cart from '../../Classes/Cart'

const containerStyle: React.CSSProperties = {
  flexDirection: 'column',
  justifyContent: 'center',
  minHeight: '100vh', // Adjust the height as needed
  minWidth: '100vw',
}
interface HomePageProps {
  userData: User
  setUser: React.Dispatch<React.SetStateAction<any>>
  selectedItems: any
  setSelectedItems: React.Dispatch<React.SetStateAction<any>>
  filterOptions: any
  setFilterOptions: React.Dispatch<React.SetStateAction<any>>
  component: any
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  setPageLoading: React.Dispatch<React.SetStateAction<boolean>>
  cart: Cart
}

// ################ Functions ################
function HomePage({
  userData,
  setUser,
  selectedItems,
  setSelectedItems,
  filterOptions,
  setFilterOptions,
  component,
  setLoading,
  setPageLoading,
  cart,
}: HomePageProps) {
  return (
    <div style={containerStyle}>
      <AppBarComp
        userData={userData}
        setUser={setUser}
        setFilterOptions={setFilterOptions}
        filterOptions={filterOptions}
        setLoading={setLoading}
        setPageLoading={setPageLoading}
      />
      <NavBarComp cart={cart} />
      {component}
      {
        <FloatingBarComp
          setSelectedItems={setSelectedItems}
          selectedItems={selectedItems}
        />
      }
    </div>
  )
}

export default HomePage
