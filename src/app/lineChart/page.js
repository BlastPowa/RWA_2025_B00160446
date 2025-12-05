'use client'

import * as React from 'react'
import { useState, useEffect } from 'react'
import { BarChart } from '@mui/x-charts/BarChart'

import AppBar from '@mui/material/AppBar'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'

import NextLink from 'next/link'

export default function LineChartPage() {
  const [stats, setStats] = useState({ total: 0, count: 0 })

  useEffect(() => {
    fetch('/api/getOrdersTotal')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(() => setStats({ total: 0, count: 0 }))
  }, [])

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', px: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            McDonald&apos;s Sales Graph
          </Typography>

          <Stack direction="row" spacing={2} alignItems="center">
            <NextLink href="/manager">
              <Button variant="outlined" size="small">
                Back to manager
              </Button>
            </NextLink>
            <Avatar alt="Profile" sx={{ width: 40, height: 40 }} />
          </Stack>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 4 }}>
        <Typography variant="h4" sx={{ mb: 1, fontWeight: 'bold' }}>
          Graph Data (Total Orders &amp; Revenue)
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 3 }}>
          Orders placed: {stats.count} | Total revenue: €
          {stats.total.toFixed ? stats.total.toFixed(2) : stats.total}
        </Typography>

        <BarChart
          xAxis={[{ data: ['Total Revenue (€)'] }]}
          series={[{ data: [stats.total], label: 'Revenue' }]}
          height={300}
        />
      </Box>
    </Box>
  )
}
