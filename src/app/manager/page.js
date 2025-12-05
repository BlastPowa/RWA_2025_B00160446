'use client'

import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Link from 'next/link'

export default function ManagerPage() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    async function loadOrders() {
      const res = await fetch('/api/manager')
      const json = await res.json()
      setOrders(json.orders || [])
    }
    loadOrders()
  }, [])

  const totalOrders = orders.length
  const totalRevenue = orders.reduce(
    (sum, o) => sum + Number(o.total || 0),
    0
  )

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mb: 3,
          alignItems: 'center',
        }}
      >
        <Box>
          <Typography variant="h3" gutterBottom>
            Manager Dashboard
          </Typography>
          <Typography variant="h6">
            Total orders: {totalOrders} | Total revenue: €
            {totalRevenue.toFixed(2)}
          </Typography>
        </Box>

        <Box>
          <Link href="/customer">
            <Button variant="outlined" sx={{ mr: 2 }}>
              Back to customer view
            </Button>
          </Link>
          <Link href="/lineChart">
            <Button variant="contained">
              Graph page
            </Button>
          </Link>
        </Box>
      </Box>

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
          {orders.map(order => (
            <TableRow key={order._id}>
              <TableCell>{order._id}</TableCell>
              <TableCell>{order.username}</TableCell>
              <TableCell>
                {order.items && order.items.length
                  ? order.items.map(i => i.pname).join(', ')
                  : ''}
              </TableCell>
              <TableCell>{Number(order.total || 0).toFixed(2)}</TableCell>
              <TableCell>
                {order.order_time
                  ? new Date(order.order_time).toLocaleString()
                  : ''}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  )
}
