'use client'

import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import Link from 'next/link'

export default function CheckoutPage() {
  const [items, setItems] = useState([])
  const [message, setMessage] = useState('')

  async function loadCart() {
    const res = await fetch('/api/cart')
    const json = await res.json()
    setItems(json.items || [])
  }

  useEffect(() => {
    loadCart()
  }, [])

  const total = items.reduce((sum, i) => sum + (i.price || 0), 0)

  async function handleConfirm() {
    setMessage('')
    const res = await fetch('/api/checkout')
    const json = await res.json()
    if (json.data === 'ok') {
      setMessage('Order placed successfully.')
      setItems([])
      setTimeout(() => {
        window.location.href = '/customer'
      }, 1000)
    } else if (json.data === 'empty') {
      setMessage('Your cart is empty.')
    } else {
      setMessage('There was a problem placing your order.')
    }
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>
      {message && (
        <Alert severity="info" sx={{ mb: 2 }}>
          {message}
        </Alert>
      )}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Price (€)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map(i => (
            <TableRow key={i._id}>
              <TableCell>{i.pname}</TableCell>
              <TableCell>{i.description}</TableCell>
              <TableCell>{i.price}</TableCell>
            </TableRow>
          ))}
          {items.length === 0 && (
            <TableRow>
              <TableCell colSpan={3}>Your cart is empty.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">Total: €{total.toFixed(2)}</Typography>
        <Box>
          <Link href="/cart">
            <Button variant="outlined" sx={{ mr: 2 }}>
              Back to cart
            </Button>
          </Link>
          <Button
            variant="contained"
            onClick={handleConfirm}
            disabled={items.length === 0}
          >
            Confirm order
          </Button>
        </Box>
      </Box>
    </Container>
  )
}
