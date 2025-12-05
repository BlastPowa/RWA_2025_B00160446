'use client'

import React, { useState } from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import Alert from '@mui/material/Alert'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setMessage('')
    setError('')

    if (!email || !phoneNumber || !password || !confirmPassword) {
      setError('Please fill in all fields.')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    const res = await fetch(
      `/api/register?email=${encodeURIComponent(
        email
      )}&password=${encodeURIComponent(
        password
      )}&confirmPassword=${encodeURIComponent(
        confirmPassword
      )}&phoneNumber=${encodeURIComponent(phoneNumber)}`
    )

    const json = await res.json()

    if (json.data === 'valid') {
      setMessage('Account created. Redirecting to login...')
      setTimeout(() => {
        window.location.href = '/login'
      }, 1000)
    } else {
      setError(json.error || 'Registration failed.')
    }
  }

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: '100%',
          p: 4,
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: 'background.paper',
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          McDonald&apos;s Account Register
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {message && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {message}
          </Alert>
        )}

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          <TextField
            label="Email Address *"
            type="email"
            fullWidth
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            label="Phone Number *"
            fullWidth
            value={phoneNumber}
            onChange={e => setPhoneNumber(e.target.value)}
          />
          <TextField
            label="Password *"
            type="password"
            fullWidth
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <TextField
            label="Confirm Password *"
            type="password"
            fullWidth
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 1, py: 1.2 }}
          >
            REGISTER
          </Button>
        </Box>

        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 2 }}
        >
          Already have an account?{' '}
          <Link href="/login">Login</Link>
        </Typography>
      </Box>
    </Container>
  )
}
