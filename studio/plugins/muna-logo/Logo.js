// React is installed in the studio and should be treated as a peer dependency
import React from 'react'
import nansenLogo from './logo.png'
import styles from './Logo.css'

// We recommend using SVGs as they have both a small footprint and scale well
// const Logo = () => 'ᛗᚢᚾᚨ'
const Logo = () => (
  <div>
    <img src={nansenLogo} className={styles.logo} /> 
    <strong>
      Nansen
    </strong>
  </div>
)

export default Logo
