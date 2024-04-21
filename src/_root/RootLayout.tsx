import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <section className="flex flex-1 justify-center items-center flex-col py-10">
    <Outlet />
  </section>
  )
}

export default RootLayout