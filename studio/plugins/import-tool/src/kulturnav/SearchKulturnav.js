/* eslint-disable no-undef */
import React, {useReducer, useEffect} from 'react'
//import ReactPaginate from 'react-paginate'
// import fetch from 'unfetch'
import Card from './components/Card'
import Search from './components/Search'
// import styles from '../ImportTool.css'
import {searchReducer} from './reducers/searchReducer'
import {chooseItem} from './apis'
import {Box, Card as SanityCard, Container, Grid, Flex, Text, Spinner} from '@sanity/ui'

const IMPORT_API_URL = 'https://kulturnav.org/api/search/'
const GET_TYPES = 'Concept'

export const initialState = {
  sourceAPI: 'kn',
  apiURL: IMPORT_API_URL,
  loading: true,
  searchParameter: '*',
  items: [],
  page: 0,
  totalElements: 0,
  max: 64,
  errorMessage: null,
}

const SearchKN = () => {
  const [state, dispatch] = useReducer(searchReducer, initialState)

  useEffect(() => {
    fetch(
      `${state.apiURL}entityType:${GET_TYPES},concept.isCollection:!true,compoundName:${state.searchParameter}/${state.page}/${state.max}`
    )
      .then((response) => response.json())
      .then((jsonResponse) => {
        dispatch({
          type: 'SEARCH_SUCCESS',
          payload: jsonResponse,
          totalElements: jsonResponse.length,
        })
      })
  }, [])

  /* const handlePageClick = (data) => {
    let selected = data.selected
    let page = selected

    dispatch({
      type: 'SEARCH_REQUEST',
      searchParameter: state.searchParameter,
    })

    fetch(
      state.apiURL + 'entityType:${GET_TYPES},concept.isCollection:!true,compoundName:' + state.searchParameter
        ? state.searchParameter
        : '' + new URLSearchParams({}),
    )
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (jsonResponse && jsonResponse.length) {
          dispatch({
            type: 'SEARCH_SUCCESS',
            payload: jsonResponse,
            totalElements: jsonResponse.length,
            page: page,
          })
        } else {
          dispatch({
            type: 'SEARCH_FAILURE',
            error: jsonResponse.Error,
          })
        }
      })
  } */

  const search = (searchValue) => {
    dispatch({
      type: 'SEARCH_REQUEST',
      searchParameter: searchValue,
    })

    fetch(
      `${state.apiURL}entityType:${GET_TYPES},concept.isCollection:!true,compoundName:${searchValue}/0/${state.max}`
    )
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (jsonResponse && jsonResponse.length > 0) {
          dispatch({
            type: 'SEARCH_SUCCESS',
            payload: jsonResponse,
            totalElements: jsonResponse.length,
            page: 0,
          })
        } else {
          dispatch({
            type: 'SEARCH_FAILURE',
            payload: jsonResponse,
            totalElements: 0,
            error: jsonResponse.Error,
          })
        }
      })
  }

  const {searchParameter, items, totalElements, page, max, errorMessage, loading} = state
  
  return (
    <Container width={5} paddingY={5}>
      <form>
        <Flex>
          <Search search={search} />
        </Flex>
      </form>
      <Box marginY={3}>
        {!loading && <Text flex={1} size={1}>{totalElements} result found</Text>}
      </Box>

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
      
      {loading && !errorMessage ? (
        <Flex style={{width: "100%"}} align="center" justify="center">
          <Spinner size={2}/>
        </Flex>
      ) : errorMessage ? (
        <SanityCard
          padding={[3, 3, 4]}
          radius={2}
          shadow={1}
          tone="critical"
        >
          <Text size={[2, 2, 3]}>
            {errorMessage}
          </Text>
        </SanityCard>
      ) : (
        <Grid columns={[2, 3, 3, 4]} gap={[2, 3, 3, 3]}>
          {items.map((item) => (
            <Card key={item.uuid} item={item} searchValue={searchParameter} onClick={chooseItem} />
          ))}
        </Grid>
      )}
    </Container>
  )
}

export default SearchKN
