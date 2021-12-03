import Container from './container'
import {InternalLink, HashTag} from '../components/styled'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-accent-1 border-t border-accent-2">
      <Container>
        <div className="py-16 w-full max-w-3xl mx-auto grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex flex-col space-y-4">
            <div className="mr-8 relative w-40 h-40">
              <Image width={300} height={300} layout="fill" src="/assets/homepage/lb-for-leni-logo.jpeg" alt="lb leni logo" />
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <div className="font-medium tracking-wide text-pink-500">About</div>
            <div className="mr-8 leading-loose text-gray-600">
              Nagkakaisang mga taga-suporta ni Vice PRESIDENT Leni Robredo sa Los Banos, Laguna. {' '}
              <HashTag>#LabanLeni2022</HashTag>{' '}
              <HashTag>#MatinoAtMahusay</HashTag>{' '}
              <HashTag>#LBForLeni</HashTag>
            </div>
          </div>
          
          <div className="flex flex-col space-y-4">
          <div className="font-medium tracking-wide text-pink-500">Links</div>
            <InternalLink target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/LBForLeni/">LB Facebook</InternalLink>
            <InternalLink target="_blank" rel="noopener noreferrer" href="https://www.teamlenirobredo.com/">Team Leni Robredo</InternalLink>
            <InternalLink target="_blank" rel="noopener noreferrer" href="https://lenirobredo.com/">Leni Robredo</InternalLink>
          </div>
          
        </div>
      </Container>
    </footer>
  )
}
