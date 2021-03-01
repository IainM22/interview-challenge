import { useState } from 'react'
import { Field, Flex, Text, Image } from 'theme-ui'

const Search = ({ searchVal, setSearchVal }) => {
  const [isHovered, setIsHovered] = useState(false)
  const HOVERED_OPACITY = 0.64
  const UNHOVERED_OPACITY = 0.48

  /**
   * Handle user input
   */
  const onInputChange = (e) => {
    setSearchVal(e.target.value)
  }

  /**
   * Clear search field
   */
  const onClear = () => {
    setSearchVal('')
  }

  const Icon = () => {
    if (!searchVal || searchVal.length == 0) {
      return (
        <Image
          width="12px"
          height="12px"
          src="/images/Search.svg"
          sx={{
            opacity: isHovered ? HOVERED_OPACITY : UNHOVERED_OPACITY,
          }}
        />
      )
    } else {
      return (
        <Flex
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '24px',
            height: '24px',
            borderRadius: '12px',
            ':hover': {
              background: 'rgba(255,255,255,0.08)',
            },
          }}
        >
          <Image width="12px" height="12px" src="/images/close.svg" onClick={onClear} />
        </Flex>
      )
    }
  }

  return (
    <Flex>
      <Text
        sx={{
          fontSize: '32px',
          lineHeight: '40px',
          color: '#fff',
          fontWeight: 600,
          textShadow:
            '0 0 64px 0 rgba(192,219,255,0.48), 0 0 16px 0 rgba(65,120,255,0.24)',
        }}
      >
        Epochs
      </Text>
      <Flex
        sx={{
          height: '30px',
          background: '#d8d8d8',
          width: '1px',
          opacity: '0.3',
          margin: '0px 14px',
          alignSelf: 'flex-end',
        }}
      />
      <Flex
        sx={{
          alignItems: 'center',
          marginTop: '7px',
          position: 'relative',
        }}
      >
        <Icon />
        <Field
          placeholder="Search"
          onMouseEnter={() => {
            setIsHovered(true)
          }}
          onMouseLeave={() => {
            setIsHovered(false)
          }}
          value={searchVal}
          onChange={onInputChange}
          sx={{
            border: 'none',
            cursor: 'default',
            '::placeholder': {
              color: `rgba(255,255,255,${
                isHovered ? HOVERED_OPACITY : UNHOVERED_OPACITY
              })`,
            },
            ':focus': {
              outline: 'none',
            },
          }}
        />
      </Flex>
    </Flex>
  )
}

export default Search
