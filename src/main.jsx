import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import ComponentsPage from './ComponentsPage'
import ComponentCategoryPage from './ComponentCategoryPage'
import PremiumPage from './PremiumPage'
import AnimationsPage from './AnimationsPage'
import DocsPage from './DocsPage'
import ProfilePage from './ProfilePage'
import PlanCheckoutPage from './PlanCheckoutPage'
import './styles.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/components" element={<ComponentsPage />} />
        <Route path="/components/:category" element={<ComponentCategoryPage />} />
        <Route path="/premium" element={<PremiumPage />} />
        <Route path="/animations" element={<AnimationsPage />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/checkout" element={<PlanCheckoutPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
