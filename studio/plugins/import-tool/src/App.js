import React from 'react'
import {HashRouter as Router, NavLink, Route} from 'react-router-dom'
import styles from './ImportTool.css'
import Header from './shared/components/Header'
import SearchNB from './nb'
import SearchMarcus from './marcus'
import SearchKN from './kulturnav'
import {Box} from '@sanity/ui'

const App = () => {
  return (
    <Router hashType="noslash">
      <Box paddingX={4}>
        <Header />

        <Box>
          <NavLink activeClassName={styles.active} className={styles.navlink} to="/marcus">
            Marcus
          </NavLink>
          <NavLink activeClassName={styles.active} className={styles.navlink} to="/nb">
            NB Digitalt
          </NavLink>
          <NavLink activeClassName={styles.active} className={styles.navlink} to="/kulturnav">
            Kulturnav
          </NavLink>
        </Box>

        {/* Route components are rendered if the path prop matches the current URL */}
        <Route path="/marcus">
          <SearchMarcus />
        </Route>

        <Route path="/nb">
          <SearchNB />
        </Route>

        <Route path="/kulturnav">
          <SearchKN />
        </Route>
      </Box>
    </Router>
  )
}

export default App
