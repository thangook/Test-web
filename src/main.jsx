import React from 'react'
import ReactDOM from 'react-dom/client'
// Sửa từ './App.jsx' thành '../App.jsx' vì App.jsx của bạn đang nằm ở thư mục gốc
import App from '../App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
