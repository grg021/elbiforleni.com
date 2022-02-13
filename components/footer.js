import Container from './container'
import {InternalLink, HashTag} from '../components/styled'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-accent-1 border-t border-accent-2">
      <Container>
        <div className="py-16 w-full max-w-4xl mx-auto grid grid-cols-1 gap-4 sm:grid-cols-4">
          <div className="flex flex-col space-y-4">
            <div className="mr-8 relative w-40 h-40">
              <Image layout="fill" src="/assets/homepage/lb-for-leni-logo.jpeg" alt="lb leni logo" />
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <div className="font-medium tracking-wide text-pink-500">About</div>
            <div className="mr-8 leading-loose text-gray-600">
              Nagkakaisang mga taga-suporta ni VP Leni Robredo at Sen. Kiko Pangilinan sa Los Baños, Laguna. {' '}
              <HashTag>#LabanLeni2022</HashTag>{' '}
              <HashTag>#MatinoAtMahusay</HashTag>{' '}
            </div>
          </div>


          <div className="flex flex-col space-y-4">
          <div className="font-medium tracking-wide text-pink-500">Contact</div>
            <InternalLink target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/LBForLeni/">Facebook: LBForLeni</InternalLink>
              <div className="mr-8 leading-loose text-gray-600">pinktownlb@gmail.com</div>
              <div className="mr-8 leading-loose text-gray-600">0916 412 0439</div>
          </div>
          
          <div className="flex flex-col space-y-4">
          <div className="font-medium tracking-wide text-pink-500">Links</div>
            <InternalLink target="_blank" rel="noopener noreferrer" href="https://www.teamlenirobredo.com/">Team Leni Robredo</InternalLink>
            <InternalLink target="_blank" rel="noopener noreferrer" href="https://lenirobredo.com/">Leni Robredo</InternalLink>
          </div>
          
        </div>
      </Container>
    </footer>
  )
}
