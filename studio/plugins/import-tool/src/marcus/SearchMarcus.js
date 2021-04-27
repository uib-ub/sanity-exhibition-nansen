import React from 'react'
import {ReactiveBase} from '@appbaseio/reactivesearch'
import Filters from './components/Filters'
import Results from './components/Results'
import Search from './components/Search'
import {Box, Grid} from '@sanity/ui'

function SearchMarcus() {
  const marcus = 'https://jambo.uib.no/elasticsearch'

  return (
    <ReactiveBase app="marcus-prod" url={marcus}>
      <Box marginTop={5}>
        <Search />
        <Grid marginY="5" style={{gridTemplateColumns: "1fr 3fr"}} gap={[5]}>
          <Filters />
          <Results />
        </Grid>
      </Box>
    </ReactiveBase>
  )
}

export default SearchMarcus
