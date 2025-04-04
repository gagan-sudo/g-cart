import React from 'react'
import Header from './TopBar'
import Footer from './Footer'
import { useThemeMode } from '../hooks/useThemeMode'
import { Toolbar } from '@mui/material'

function Layout({children}) {

  const {darkMode,setDarkMode} =  useThemeMode()

  return (
   <>
    <Header darkMode={darkMode} setDarkMode={setDarkMode} />
         <Toolbar />{
            children
         }
         <Footer/>
   </>
  )
}

export default Layout