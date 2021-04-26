import React, {useState} from 'react'
import {Container, TextInput, Button, Inline} from '@sanity/ui'
import {MdSearch} from 'react-icons/md'

const Search = (props) => {
  const [searchValue, setSearchValue] = useState('')

  const handleSearchInputChanges = (e) => {
    setSearchValue(e.target.value)
  }

  const handleClear = () => {
    setSearchValue('')
  }

  const callSearchFunction = (e) => {
    e.preventDefault()
    props.search(searchValue)
  }

  return (
    <Container width={5}>
      <Inline width={5}>
        <TextInput
          fontSize={[2, 2, 3, 4]}
          padding={[3, 3, 4]}
          type="text"
          icon={MdSearch}
          onChange={handleSearchInputChanges}
          value={searchValue}
          isClearable
          onClear={() => handleClear('')}
        />
        <Button fontSize={[2, 2, 3, 4]} padding={[3, 3, 4]} onClick={callSearchFunction} mode="default" type="submit" text="Søk" />
      </Inline>
    </Container>
  )
}

export default Search
