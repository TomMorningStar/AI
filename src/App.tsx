import { Route, Routes } from 'react-router-dom'
import { Detail } from './pages/detail/Detail'
import { Home } from './pages/home/Home'
import { NotFound } from './pages/not-found/NotFound'

function App() {
	return (
		<main className='main'>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/chat/:genre' element={<Detail />} />
        <Route path='*' element={<NotFound />} />
			</Routes>
		</main>
	)
}

export default App
