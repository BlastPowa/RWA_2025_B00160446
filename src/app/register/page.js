'use client'

import * as React from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import NextLink from 'next/link'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'

export default function RegisterPage() {
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setLoading(true)

    const data = new FormData(event.currentTarget)
    const email = data.get('email')
    const password = data.get('password')
    const confirmPassword = data.get('confirmPassword')
    const phoneNumber = data.get('phoneNumber')

    if (!email || !password || !confirmPassword || !phoneNumber) {
      setError('All fields are required.')
      setLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      setLoading(false)
      return
    }

    const url = `/api/register?email=${encodeURIComponent(
      email
    )}&password=${encodeURIComponent(
      password
    )}&confirmPassword=${encodeURIComponent(
      confirmPassword
    )}&phoneNumber=${encodeURIComponent(phoneNumber)}`

    try {
      const res = await fetch(url)
      const json = await res.json()
      if (json.data === 'valid') {
        window.location.href = '/login'
      } else {
        setError(json.error || 'Registration failed.')
      }
    } catch (e) {
      setError('Network error.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          McDonald&apos;s Account Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="phoneNumber"
                label="Phone Number"
                id="phoneNumber"
                autoComplete="tel"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{ mt: 3, mb: 2 }}
          >
            {loading ? 'Registering...' : 'Register'}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={NextLink} href="/login" variant="body2">
                Already have an account? Login
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}
