import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import antd styles aligned with react 19 
import '@ant-design/v5-patch-for-react-19';
// google cloud platform authentication 
import { GoogleOAuthProvider } from '@react-oauth/google'
import { google_client_id } from './utils/config.js'

import './styles/globals.css'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={google_client_id}>
      <App />
    </GoogleOAuthProvider>
  </StrictMode>,
)
