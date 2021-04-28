import React from 'react'
import {ReactiveList} from '@appbaseio/reactivesearch'
import Card from './Card'
import {
  Container,
  Grid,
} from '@sanity/ui'

const Results = () => {
  return (
    <Container>
      <ReactiveList
        componentId="results"
        pagination
        paginationAt="both"
        react={{
          and: ['search', 'digitized', 'zoom', 'types', 'makers'],
        }}
        dataField="identifier"
      >
        {({loading, data, error}) => {
          if (loading) {
            return <p>Loading...</p>
          }
          if (error) {
            return <p>Something Went Wrong!</p>
          }
          if (data.length) {
            return (
              <Grid columns={[1, 1, 2, 3]} gap={[1, 1, 2, 3]}>
                {data.map((item) => (
                  <Card item={item} />
                ))}
              </Grid>
            )
          } else {
            return <p>No Results Found</p>
          }
        }}
      </ReactiveList>
    </Container>
  )
}

export default Results
