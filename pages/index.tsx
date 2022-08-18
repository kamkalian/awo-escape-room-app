import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'


const Home: any = () => {
  const res = fetch('/api/status')
  //const data = res.json()
  //console.log(data);
  fetch('/api/profile-data')
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
  return (
    <div>test</div>
  )
}

export default Home
