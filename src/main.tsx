import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import MapSearchInput from './index.js'
import React from 'react'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div style={{
        width: '100dvw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }}>
        <MapSearchInput
            ApiKey='AIzaSyBGyQ7dFh1trIFie56vqCvJaFyTbpTzvvA'
            style={{
                width: 300
            }}
        />
    </div>
  </StrictMode>,
)
