/* eslint-disable no-undef */
import React from 'react'
//import ReactPaginate from 'react-paginate'
// import fetch from 'unfetch'
import Search from './components/Search'
// import styles from '../ImportTool.css'
import {chooseItem} from './apis'
import {Box, Card as SanityCard, Container, Grid, Flex, Text, Spinner} from '@sanity/ui'
import { SearchProvider } from './components/SearchProvider'
import { Items } from './components/Item'

const IMPORT_API_URL = 'https://kulturnav.org/api/search/'

export const initialState = {
  sourceAPI: 'kn',
  apiURL: IMPORT_API_URL,
  loading: true,
  searchParameter: '*',
  items: [],
  page: 0,
  totalElements: 0,
  max: 100,
  errorMessage: null,
  searchType: 'Concept',
  filter: ',concept.isCollection:!true',
  importTo: 'Concept'
}

const SearchKN = () => {
  return (
    <SearchProvider>
      <Container width={5} paddingY={5}>
        <Search />
        
        {/* <Box marginBottom={3}>
          <ReactPaginate
            previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={'...'}
            forcePage={page}
            pageCount={totalElements / max}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            containerClassName={styles.pagination}
            pageClassName={styles.page}
            previousClassName={styles.previous}
            nextClassName={styles.next}
            breakClassName={styles.break}
            activeClassName={styles.active}
            onPageChange={handlePageClick}
          />
        </Box> */}
        
        <Items />
      </Container>
    </SearchProvider>
  )
}

export default SearchKN
