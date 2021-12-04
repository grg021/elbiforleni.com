import Image from 'next/image'
import tw from 'tailwind-styled-components'

const LegendContainer = tw.div`
    p-2 bg-gray-50 flex items-center rounded-md border border-gray-100
`

const MapLegend = () => {
    return <div className={'flex flex-col my-8 gap-x-5 max-w-3xl mx-auto sm:flex-row gap-y-5'}>
      <LegendContainer>
        <span className="w-10 text-center"><Image src="/assets/icons/marker-lugaw.png" alt="lugaw icon" width="32" height="35" /></span>
        <span className="ml-2">PalugawNiLeni</span>
      </LegendContainer>
      <LegendContainer>
        <span className="w-10 text-center"><Image src="/assets/icons/cafe-icon.png" alt="lugaw icon" width="35" height="35" /></span>
        <span className="ml-2">FreeTahoNiLeni / FreeKapeNiLeni</span>
      </LegendContainer>
      <LegendContainer>
        <span className="w-10 text-center"><Image src="/assets/icons/car-icon.png" alt="lugaw icon" width="23" height="35" /></span>
        <span className="ml-2">Leni-Kiko Caravan</span>
      </LegendContainer>
    </div>
  }

export default MapLegend