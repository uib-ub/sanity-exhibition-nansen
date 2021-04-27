/* eslint-disable no-undef */
import React, {useReducer, useEffect} from 'react'
//import ReactPaginate from 'react-paginate'
// import fetch from 'unfetch'
import Card from './components/Card'
import Search from './components/Search'
// import styles from '../ImportTool.css'
import {searchReducer} from './reducers/searchReducer'
import {chooseItem} from './apis'
import {Box, Container, Grid, Flex, Text} from '@sanity/ui'

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

const SearchNB = () => {
  const [state, dispatch] = useReducer(searchReducer, initialState)

  useEffect(() => {
    fetch(
      `${state.apiURL}actualEntityType:${GET_TYPES},compoundName:${state.searchParameter}/${state.page}/${state.max}`
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
      state.apiURL + 'actualEntityType:${GET_TYPES},compoundName:' + state.searchParameter
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
    // setSearchParameter(searchValue)

    dispatch({
      type: 'SEARCH_REQUEST',
      searchParameter: searchValue,
    })

    fetch(
      `${state.apiURL}actualEntityType:${GET_TYPES},compoundName:${searchValue}/0/${state.max}`
    )
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (jsonResponse && jsonResponse.length) {
          dispatch({
            type: 'SEARCH_SUCCESS',
            payload: jsonResponse,
            totalElements: jsonResponse.length,
            page: 0,
          })
        } else {
          dispatch({
            type: 'SEARCH_FAILURE',
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
        <Text flex={1} size={1}>{totalElements} result found</Text>
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
      <Grid columns={[2, 3, 3, 4]} gap={[2, 3, 3, 3]}>
        {loading && !errorMessage ? (
          <span>loading... </span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          items.map((item) => (
            <Card key={item.uuid} item={item} searchValue={searchParameter} onClick={chooseItem} />
          ))
        )}
      </Grid>
    </Container>
  )
}

export default SearchNB
