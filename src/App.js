import React, { useMemo, useRef } from 'react';
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/home';
import AboutUs from './pages/aboutUs';
import Vision from './pages/vision';
import CashPositional from './pages/cashPositional';
import EliteCombo from './pages/eliteCombo';
import EquityPlatniam from './pages/equityPlatniam';
import OptionBtst from './pages/optionBtst';
import RapidIndex from './pages/rapidIndex';
import RapidOption from './pages/rapidOption';
import StockFuture from './pages/stockFuture';
import StockOption from './pages/stockOption';
import Blogs from './pages/blogs';
import MarketNews from './pages/marketNews';
import ComplaintData from './pages/complaintData';
import GrievanceRedressal from './pages/grievanceRedressal';
import AccessibilityStatement from './pages/accessibilityStatement';
import AccessibilityFeedback from './pages/accessibilityFeedback';
import AccessibilityMedia from './pages/accessibilityMedia';
import InvestorChart from './pages/investorChart';
import AntiMoneyLaundering from './pages/antiMoneyLaundering';
import ClientServiceConsentForm from './pages/clientServiceConsentForm';
import Payment from './pages/payment';
import ContactUs from './pages/contactUs';
import MarketReports from './pages/reports';
import ComplaintPage from './pages/complaintData';
import OurServices from './components/OurServices';

export default function App() {
  const Layout = () => (
    <div className="app min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );

  const renderCount = useRef(0);
  renderCount.current += 1;
  // Temporary debug log to detect repeated renders causing stack overflow
  if (renderCount.current % 50 === 0) {
    // log every 50 renders to avoid spamming
    // eslint-disable-next-line no-console
    console.warn('App render count:', renderCount.current);
  }

  const router = useMemo(() => createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="vision" element={<Vision />} />

        {/* Services overview page */}
        <Route path="services" element={<OurServices />} />

        <Route path="services/cash-positional" element={<CashPositional />} />
        <Route path="services/elite-combo" element={<EliteCombo />} />
        <Route path="services/equity-platniam" element={<EquityPlatniam />} />
        <Route path="services/option-btst" element={<OptionBtst />} />
        <Route path="services/rapid-index" element={<RapidIndex />} />
        <Route path="services/rapid-option" element={<RapidOption />} />
        <Route path="services/stock-future" element={<StockFuture />} />
        <Route path="services/stock-option" element={<StockOption />} />

        <Route path="blogs" element={<Blogs />} />
        <Route path="market-news" element={<MarketNews />} />
        <Route path="complaint-data" element={<ComplaintData />} />
        <Route path="grievance-redressal" element={<GrievanceRedressal />} />

        <Route path="accessibility-statement" element={<AccessibilityStatement />} />
        <Route path="accessibility-feedback" element={<AccessibilityFeedback />} />
        <Route path="accessibility-media" element={<AccessibilityMedia />} />

        <Route path="investor-chart" element={<InvestorChart />} />
        <Route path="anti-money-laundering" element={<AntiMoneyLaundering />} />
        <Route path="consent-form" element={<ClientServiceConsentForm />} />

        <Route path="payment" element={<Payment />} />
        <Route path="contact" element={<ContactUs />} />
        <Route path="reports" element={<MarketReports />} />
        <Route path="complaint" element={<ComplaintPage />} />

        {/* Fallback to Home for unknown routes */}
        <Route path="*" element={<Home />} />
      </Route>
    ),
    {
      future: {
        v7_relativeSplatPath: true
      }
    }
  ), []);

  return <RouterProvider router={router} />;
}
