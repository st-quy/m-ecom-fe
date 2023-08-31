/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import { Input } from 'antd'

const { Search } = Input

interface InputComponentProps {
  onSearch?: (value: string) => void
}

const InputComponent: React.FC<InputComponentProps> = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('')

  const handleSearch = (value: string) => {
    setSearchValue(value)
    if (onSearch) {
      onSearch(value)
    }
  }

  return (
    <Search
      placeholder='searching by name......'
      allowClear
      enterButton={<span className='custom-enter-button'>Search</span>}
      size='large'
      onSearch={handleSearch}
      className='custom-search'
    />
  )
}

export default InputComponent
