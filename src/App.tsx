import { useState } from 'react'
import {Routes,Route} from 'react-router-dom'
import SigninForm from './_auth/forms/SigninForm'
import SignupForm from './_auth/forms/SignupForm'
import AuthLayout from './_auth/AuthLayout'
import RootLayout from './_root/RootLayout'
import { Home } from './_root/pages'
import './global.css'
import { Toaster } from "@/components/ui/toaster"

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className='flex h-screen'>
      <Routes>
        {/* public Routes */}
        <Route element={<AuthLayout />}>
          <Route path='/sign-in' element={<SigninForm />} />
          <Route path='/sign-up' element={<SignupForm />} />
        </Route>


        
        {/* private Routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />

        </Route>
      
      </Routes>

      <Toaster />
        
    </main>
  )
}

export default App
