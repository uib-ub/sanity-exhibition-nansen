import React, {useState} from 'react'
import {Box, TextInput, Button, Select, Stack} from '@sanity/ui'

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

  const callSetSearchTypeFunction = (e) => {
    props.searchType(e.target.value)
  }

  return (
    <>
       <Stack>
        <Select
          fontSize={3}
          padding={[3,3,3]}
          space={[3, 3, 4]}
          onChange={e => callSetSearchTypeFunction(e)}
        >
          <option value="Concept">Concepts</option>
          <option value="Agent">Agents</option>
        </Select>
       </Stack>
      <Box flex={3}>
        <TextInput
          style={{backgroundColor: "white", border: "solid 1px #ccc"}}
          fontSize={[2, 2, 2, 3]}
          padding={[2, 2, 3]}
          type="text"
          onChange={handleSearchInputChanges}
          value={searchValue}
          isClearable
          onClear={() => handleClear('')}
        />
      </Box>
      <Box marginLeft={2}>
        <Button 
          fontSize={[2, 2, 2, 3]}
          padding={[2, 2, 3]}
          onClick={callSearchFunction} 
          mode="default" 
          type="submit" 
          text="Søk" 
        />
      </Box>
    </>
  )
}

export default Search
