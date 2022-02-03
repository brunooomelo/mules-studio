import type { NextPage } from 'next'
import { Header } from '@components/Header'
import { Input } from '@components/Input'
import { MintButton } from '@components/MintButton'
import { NFT } from '@components/NFT'
import { PriceMint } from '@components/PriceMint'
import { StatusMint } from '@components/StatusMint'

const Home: NextPage = () => {
  return (
    <div className='bg-primary w-full'>
      <Header />
      <main className='flex flex-col items-center bg-secondary py-20'>
        <div>
          <div className="px-4 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-white">Welcome to Mule Studio</h1>
            <p className="w-3/4 mx-auto text-white my-5 text-center text-base sm:text-xl">Mules is a collection of 1337 uniquely and randomly NFTs stored on Fantom Network</p>
          </div>
          <div className="lg:flex w-full justify-center">
            <div className='flex flex-col items-center mt-20 justify-around h-64 lg:w-96'>
              <StatusMint />
              <Input />
              <MintButton />
              <PriceMint />
            </div>
          </div>
        </div>
        <img className="lg:w-[450px]" src="preview.png" alt="preview mule" />
      </main>

      <div className='flex flex-col items-center pt-20'>
        <h1 className='text-4xl font-bold text-white'>Your Mules</h1>
        <div className='w-64 grid grid-cols-1 gap-3 py-8'>
          <NFT />
          <NFT />
          <NFT />
        </div>
      </div>
      <footer className='flex justify-center text-s font-bold text-gray-800'>
        <p>Mule Studios since 2021</p>
      </footer>
    </div>
  )
}

export default Home
