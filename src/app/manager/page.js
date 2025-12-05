'use client'

import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import NextLink from 'next/link'
import Link from '@mui/material/Link'

export default function ManagerPage() {
  const [orders, setOrders] = useState([])

  async function loadOrders() {
    const res = await fetch('/api/manager')
    const json = await res.json()
    setOrders(json.orders || [])
  }

  useEffect(() => {
    loadOrders()
  }, [])

  const totalOrders = orders.length
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0)

  return (
    <Container sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Manager Dashboard</Typography>
        <Link component={NextLink} href="/customer">
          <Button variant="outlined">Back to customer view</Button>
        </Link>
      </Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Total orders: {totalOrders} | Total revenue: €{totalRevenue.toFixed(2)}
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Items</TableCell>
            <TableCell>Total (€)</TableCell>
            <TableCell>Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map(o => (
            <TableRow key={o._id}>
              <TableCell>{o._id}</TableCell>
              <TableCell>{o.username}</TableCell>
              <TableCell>
                {(o.items || []).map(i => i.pname).join(', ')}
              </TableCell>
              <TableCell>{o.total}</TableCell>
              <TableCell>
                {o.order_time
                  ? new Date(o.order_time).toLocaleString()
                  : ''}
              </TableCell>
            </TableRow>
          ))}
          {orders.length === 0 && (
            <TableRow>
              <TableCell colSpan={5}>No orders yet.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Container>
  )
}
