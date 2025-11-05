
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import HomePage from './pages/HomePage'
import SportPage from './pages/SportPage'
import BusinessPage from './pages/BusinessPage'
import EntertainmentPage from './pages/EntertainmentPage'
import TechnologyPage from './pages/TechnologyNews'
import CryptoPage from './pages/CryptoPage'
import ArtPage from './pages/ArtPage'
import HealthPage from './pages/HealthPage'
import GeneralNews from './pages/GeneralNewsPage'
import RegisterPage from './pages/RegisterPgae'
import OAuthSuccess from './pages/GoogleAuthSuccess'
import { Toaster } from "react-hot-toast";
import LoginPage from './pages/LoginPage'
import SearchResult from './pages/SearchResultsPage'
import BookmarkPage from './pages/BookmarkPage'
import { useAuthStore } from './store/useAuthStore'
import { useEffect } from 'react'
import { Loader } from 'lucide-react'


function App() {

  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div>
      
      <NavBar/>

      <Routes>

        <Route  path="/"  element={authUser ? <HomePage /> : <HomePage />} />
        <Route  path="/register" element={  <RegisterPage />} />
        <Route  path="/login" element={ <LoginPage />} />
        <Route  path="/oauth-success" element={ <OAuthSuccess />} />
        <Route  path="/news" element={ authUser ? <GeneralNews /> : <GeneralNews />} />
        <Route  path="/search" element={ authUser ? <SearchResult /> : <SearchResult />} />
        <Route  path="/sports" element={authUser ?  <SportPage /> :  <SportPage />} />
        <Route  path="/business" element={authUser ? <BusinessPage /> : <BusinessPage />} />
        <Route  path="/entertainment" element={authUser ? <EntertainmentPage /> : <EntertainmentPage />} />
        <Route  path="/technology" element={authUser ? <TechnologyPage /> : <TechnologyPage />} />
        <Route  path="/health" element={authUser ? <HealthPage /> : <HealthPage />} />
        <Route  path="/crypto" element={authUser ? <CryptoPage /> : <CryptoPage />} />
        <Route  path="/arts" element={authUser ? <ArtPage /> : <ArtPage />} />
        <Route  path="/bookmarks" element={authUser ? <BookmarkPage /> : <HomePage />} />
      </Routes>

      <Toaster/>

    </div>
  )
}

export default App
