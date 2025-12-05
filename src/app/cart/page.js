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
import NextLink from 'next/link'
import Link from '@mui/material/Link'

export default function CartPage() {
  const [items, setItems] = useState([])

  async function loadCart() {
    const res = await fetch('/api/cart')
    const json = await res.json()
    setItems(json.items || [])
  }

  useEffect(() => {
    loadCart()
  }, [])

  async function removeItem(id) {
    await fetch(`/api/cart?id=${encodeURIComponent(id)}`, {
      method: 'DELETE',
    })
    loadCart()
  }

  const total = items.reduce((sum, i) => sum + (i.price || 0), 0)

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Price (€)</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map(i => (
            <TableRow key={i._id}>
              <TableCell>{i.pname}</TableCell>
              <TableCell>{i.description}</TableCell>
              <TableCell>{i.price}</TableCell>
              <TableCell align="right">
                <Button
                  size="small"
                  variant="text"
                  onClick={() => removeItem(i._id)}
                >
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {items.length === 0 && (
            <TableRow>
              <TableCell colSpan={4}>Your cart is empty.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">Total: €{total.toFixed(2)}</Typography>
        <Box>
          <Link component={NextLink} href="/customer" sx={{ mr: 2 }}>
            <Button variant="outlined">Back to menu</Button>
          </Link>
          <Link component={NextLink} href="/checkout">
            <Button variant="contained">Checkout</Button>
          </Link>
        </Box>
      </Box>
    </Container>
  )
}
