import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useState, useEffect } from 'react'
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';




const Home: any = () => {
  const [timer, setTimer] = useState(null)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      const resp = await fetch('/api/status/');
      const json = await resp.json();
      setTimer(json.data);
    }
  
    // call the function
    const id = setInterval(() => {
      fetchData()
        // make sure to catch any error
        .catch(console.error);
    }, 1000);
    return () => clearInterval(id);
  }, [])

  return (
    
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <h1>{timer}</h1>
      </Grid>
      <Grid item xs={4}>
      </Grid>
      <Grid item xs={4}>
      </Grid>
      <Grid item xs={8}>
      </Grid>
    </Grid>
  )
}

export default Home
