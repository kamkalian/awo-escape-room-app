import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useState, useEffect } from 'react'
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';




const Home: any = () => {
  const [countdown, setCountdown] = useState(null);
  const [msg, setMsg] = useState("");
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      const resp = await fetch('/api/status/');
      const json = await resp.json();
      setCountdown(json.data['countdown']);
      setMsg(json.data['msg']);
      setLoading(false);
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
    {isLoading ? (
      <Grid item>
        <h1>Bitte warten</h1>
      </Grid>
    ) : (
      <React.Fragment>
      <Grid item xs={12}>
        {msg ? <Alert severity="warning">{msg}</Alert> : ""}
      </Grid>
      <Grid item xs={6}>
        <h1>{countdown}</h1>
      </Grid>
      <Grid item xs={6}>
        <CircularProgress variant="determinate" value={countdown*100/900} />
      </Grid>
      </React.Fragment>
    )}
    </Grid>
  )
}

export default Home
