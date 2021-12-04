import tw from "tailwind-styled-components"

export const InternalLink = tw.a`
  text-gray-500 hover:text-gray-600 transition underline
`

export const HashTag = tw.span`
  text-white bg-pink-400 p-1 rounded-sm hover:text-pink-100 transition
`

export const FilterButton = tw.div`
    ${
        (p) => (p.active 
        ? 'bg-pink-50 text-pink-600 border-pink-700'
        : 'hover:bg-pink-400 hover:text-white' 
        )
    }
    py-1 px-3 rounded-sm cursor-pointer font-medium text-gray-500
    
`