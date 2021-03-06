import Link from 'next/link'

export default function Header() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <Link href="/" passHref>
        <h1 className="cursor-pointer text-pink-500 text-5xl md:text-7xl font-bold tracking-tighter leading-tight md:pr-8">
        LB for Leni &amp; <span className="text-white bg-pink-500 px-3 rounded-md">Kiko</span>
      </h1>
      </Link>
      <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">
        A project to paint Los Baños <span className="text-pink-500 font-medium">pink</span>.
      </h4>
    </section>
  )
}
