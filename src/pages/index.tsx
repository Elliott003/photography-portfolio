import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import { Tab } from '@headlessui/react'

const inter = Inter({ subsets: ['latin'] })
const tabs = [
  {
    key: 'all',
    display: 'All'
  },
  {
    key:'oceans',
    display:'Oceans'
  },
  {
    key: 'cities',
    display:'Cities'
  }
];
export default function Home() {
  return (
    <div className="flex flex-col h-full bg-top bg-cover"
    style={{backgroundImage: "url('/photography-bg.png')"}}>
      {/* <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}
      <header className="flex justify-between items-center h-[90px] px-6">
      <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        {/* <div className="text-transparent">hm</div> */}
        <div className='text-center'>Photography Protfolio</div>
        <Link href="#" className="rounded-3xl bg-white text-stone-900 px-3 py-2 hover:bg-opacity-90">Get in touch</Link>
      </header>
      <main className='grow'>
        <div className='flex flex-col items-center'>
          <Tab.Group>
          <Tab.List className="flex items-center gap-8">
            {tabs.map(tab => (
                          <Tab key={tab.key} className="p-2">
                          {({selected}) => (
                             <span className={selected ? "text-white" : "text-stone-600"}>
                              {tab.display}
                              </span>
                          )
                          }
                        </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="h-full bg-stone-900 bg-opacity-20 max-w-[900px] w-full p-2 sm:p-4 my-6">
            <Tab.Panel >Content 1</Tab.Panel>
            <Tab.Panel>Content 2</Tab.Panel>
            <Tab.Panel>Content 3</Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
      </main>
      <footer className='h-[60px] flex justify-center'>
        Photography Protfolio
      </footer>
    </div>
  )
}
