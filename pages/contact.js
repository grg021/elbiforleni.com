import React from 'react'
import Layout from '../components/layout'
import Head from 'next/head'
import Container from '../components/container'
import Header from '../components/header'
import { HashTag } from '../components/styled'
import Image from 'next/image';

const Contact = () => {
  return (
    <>
      <Layout>
        <Head>
          <title>Contact | elbi for Leni Robredo</title>
        </Head>
        <Container>
          <Header />
            <div className="text-center my-20">
                <h1 className="text-6xl font-bold text-leni-pink mb-5">Contact Us.</h1>
                <h2 className="text-5xl font-bold text-leni-blue">or Donate.</h2>
                <div className="mx-auto max-w-2xl text-gray-500 my-8 text-2xl font-normal">
                    Salamat sa iyong suporta <HashTag>#kakampink</HashTag>. Tayo ay magka-isa sa pag suporta kina Vice PRESIDENT Leni Robredo at Sen. Kiko Pangilinan.
                </div>
            </div>
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
            <div className="bg-leni-pink text-white p-6 text-lg">
              <div className="text-center uppercase opacity-80 text-3xl font-bold mb-4 mt-2">Contact Us</div>
              <div className="overflow-auto h-72 text-center pt-10">
                <div>For inquiries, concerns or requests, <br/>please contact:</div>
                <div className="text-2xl">Ms. Noreen</div>
                <div className="text-2xl underline">0916 412 0439</div>
              </div>
            </div>
            <div className="bg-leni-blue p-6 text-white text-lg">
              <div className="text-center uppercase opacity-80 text-3xl font-bold mb-4 mt-2">Donate</div>
              <div className="text-center">
              <div>For donations, you may send via GCASH:</div>
              <div className="text-2xl">PinkTownLB (Angelique M.)</div>
              <div className="text-2xl">(09** ***0439)</div>
              <div className="mt-2"><Image 
                alt="gcash qr code"
              src="/assets/contact/gcash-angelique.jpg" width="300" height="300" />
              </div>
              </div>
            </div>
          </section>
        </Container>
      </Layout>
    </>
  )
}

export default Contact