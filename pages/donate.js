import React from 'react'
import Layout from '../components/layout'
import Head from 'next/head'
import Container from '../components/container'
import Header from '../components/header'
import { HashTag } from '../components/styled'
import Image from 'next/image';
import {SITE_URL, SITE_TITLE} from '../lib/constants'

const Donate = () => {
  return (
    <>
      <Layout>
        <Head>
          <title>Contact | {SITE_TITLE}</title>
          <meta name="description" content="Contact us or donate." />
          <meta property="og:title" content={`Contact | ${SITE_TITLE}`} key="ogTitle" />
          <meta property="og:description" content="Contact us or donate." key="ogDescription" />
          <meta property="og:url" content={`${SITE_URL}contact`} key="ogurl" />
        </Head>
        <Container>
          <Header />
            <section className="my-4 shadow-inner py-10 px-5 lg:px-10 rounded-lg" style={{backgroundImage: "linear-gradient(0deg,rgba(206,15,105,.75),rgba(206,15,105,.75)),url('/assets/donate/donation-background.jpeg')", backgroundRepeat: "no-repeat", backgroundSize: "cover"}}>
              <div className="text-center opacity-90 text-4xl lg:text-5xl font-bold mb-4 mt-2 text-white">Your Generosity Matters</div>
              <div className="text-center text-xl lg:text-2xl text-white my-10 max-w-3xl mx-auto opacity-80">Ang iyong donasyon ay maaaring mag-sponsor sa ating mga proyekto:</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="p-4 lg:p-6 text-gray-700 text-l lg:text-lg shadow-inner rounded-lg bg-white">
                  <div className="uppercase focus:outline-none text-white py-2.5 px-5 rounded-md bg-leni-blue hover:bg-blue-800 hover:shadow-lg text-md xl:text-lg">POT OF LUGAW</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-l lg:text-lg">
                    <div><br/>Ang iyong <span className="text-leni-pink"><strong>PhP1,300</strong></span> ay maaaring magpakain ng <span className="text-leni-pink"><strong>~100 tao</strong></span>.<br/></div>
                    <div><br/><Image alt="gcash qr code" src="/assets/donate/lugaw.png" width="200" height="200" /></div>
                  </div>
                </div>
                <div className="p-6 text-gray-700 text-lg shadow-inner rounded-lg bg-white">
                  <div className="uppercase focus:outline-none text-white py-2.5 px-5 rounded-md bg-leni-blue hover:bg-blue-800 hover:shadow-lg text-md">GIFT BAG</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-l lg:text-lg">
                    <div><br/>Ang iyong <span className="text-leni-pink"><strong>PhP200</strong></span> ay makakapagbigay ng isang gift bag sa <span className="text-leni-pink"><strong>1 pamilya</strong></span>.<br/></div>
                    <div><br/><Image alt="gcash qr code" src="/assets/donate/gift.png" width="270" height="250" /></div>
                  </div>
                </div>
                <div className="p-6 text-gray-700 text-lg shadow-inner rounded-lg bg-white">
                  <div className="uppercase focus:outline-none text-white py-2.5 px-5 rounded-md bg-leni-blue hover:bg-blue-800 hover:shadow-lg text-md">SHIRTS AT APRONS</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-l lg:text-lg">
                    <div><br/>Ikaw ay makakapagbigay ng T-shirts para sa volunteers at aprons para sa mga nagtitinda sa palengke.<br/></div>
                    <div><br/><Image alt="gcash qr code" src="/assets/donate/apron.png" width="230" height="250" /></div>
                  </div>
                </div>
              </div>
              <br/>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
                <div className="p-6 text-gray-700 text-lg shadow-inner rounded-lg bg-white">
                  <div className="uppercase focus:outline-none text-white py-2.5 px-5 rounded-md bg-leni-pink sm:text-2xl">CASH DONATION</div>
                    <div className='text-l lg:text-lg'><br/>You may send your cash donations via Gcash QR code: <br/></div>
                    <div><Image alt="gcash qr code" src="/assets/donate/gcash-angelique.jpg" width="250" height="250"/></div>
                    <div className='text-l lg:text-lg'><strong><span className="text-leni-pink">PinkTownLB (Angelique M.)</span><br/>(09** ***0439)</strong></div>
                </div>
                <div className="p-6 text-gray-700 text-lg shadow-inner rounded-lg bg-white">
                  <div className="uppercase focus:outline-none text-white py-2.5 px-5 rounded-md bg-leni-pink sm:text-2xl">IN-KIND DONATION</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-l lg:text-lg">
                  <div c><br/>Tumatanggap din tayo ng pre-loved toys and books, food items atbp. na ipapamahagi sa mga komunidad.<br/><br/>
                    Contact <strong><span className="text-leni-pink">Ms. Noreen</span><br/>0916 412 0439<br/></strong>pinktownlb@gmail.com<br/></div>
                    <div><br/><Image alt="gcash qr code" src="/assets/donate/kinabukasan.png" width="250" height="330"/></div>
                  </div>
                </div>
              </div>
          </section>
        </Container>
      </Layout>
    </>
  )
}

export default Donate