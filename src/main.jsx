import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'

// Create the router with future flags
const router = createBrowserRouter(
  [
    {
      path: "/*",
      element: <App />
    }
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true   // opt-in to the splat path change too
    }
  }
)

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
