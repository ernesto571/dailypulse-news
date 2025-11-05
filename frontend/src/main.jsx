import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { BookmarkProvider } from './contexts/BookmarkContext'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <BookmarkProvider>
      <StrictMode>
        <App />
      </StrictMode>,
    </BookmarkProvider> 
  </BrowserRouter>
  
)
