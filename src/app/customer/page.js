'use client'

import React, { useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Link from 'next/link'
import Alert from '@mui/material/Alert'

export default function CustomerPage() {
  const [products, setProducts] = useState([])
  const [weather, setWeather] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch('/api/products')
        const json = await res.json()
        setProducts(json.products || [])
      } catch (e) {
        setMessage('Could not load products.')
      }
    }

    async function loadWeather() {
      try {
        const res = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=53.35&longitude=-6.26&current_weather=true'
        )
        const data = await res.json()
        if (data.current_weather) {
          setWeather(
            `Temp: ${data.current_weather.temperature}°C, Wind: ${data.current_weather.windspeed} km/h`
          )
        }
      } catch {}
    }

    loadProducts()
    loadWeather()
  }, [])

  function putInCart(pname, price) {
    setMessage('')
    fetch(
      `/api/putInCart?pname=${encodeURIComponent(
        pname
      )}&price=${encodeURIComponent(price)}`
    ).then(() => setMessage('Item added to cart.'))
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            McDonald&apos;s Orders
          </Typography>
          <Link href="/cart" style={{ color: 'white', marginRight: 16 }}>
            Cart
          </Link>
          <Link href="/checkout" style={{ color: 'white' }}>
            Checkout
          </Link>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4, mb: 4 }}>
        {weather && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">
              Current weather: {weather}
            </Typography>
          </Box>
        )}
        {message && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {message}
          </Alert>
        )}
        <Grid container spacing={3}>
          {products.map(p => (
            <Grid item xs={12} sm={6} md={3} key={p._id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {p.imageUrl && (
                  <Box
                    sx={{
                      height: 180,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      p: 2,
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        maxHeight: '100%',
                        width: 'auto',
                        objectFit: 'contain',
                      }}
                      image={p.imageUrl}
                      alt={p.pname}
                    />
                  </Box>
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6">
                    {p.pname}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {p.description}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ mt: 1 }}>
                    €{p.price}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    fullWidth
                    onClick={() => putInCart(p.pname, p.price)}
                  >
                    ADD TO CART
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  )
}
