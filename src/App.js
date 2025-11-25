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
import FloatingButtons from './components/FloatingButtons';
import SideActionButtons from './components/SideActionButtons';
import RefundPolicy from './pages/refundPolicy';
import PrivacyPolicy from './pages/privacyPolicy';
import Disclaimer from './pages/disclaimer';
import TermsAndConditions from './pages/termsAndConditions';
import Disclosure from './pages/disclosure';
import Jobs from './pages/jobs';
import KycDocument from './pages/kycDocument';
import InvestorHandbook from './pages/investorHandbook';
import ComplaintBox from './pages/complaintBox';
import FAQs from './pages/faqs';
import AdminLogin from './pages/adminLogin';

export default function App() {
  const Layout = () => (
    <div className="app min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container">
          <Outlet />
        </div>
      </main>
      <FloatingButtons />
      <SideActionButtons />
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
        <Route path="aboutUs" element={<AboutUs />} />
        <Route path="vision" element={<Vision />} />

        {/* Services overview page */}
        <Route path="services" element={<OurServices />} />

        {/* Services - Flattened to match Header */}
        <Route path="cash-positional" element={<CashPositional />} />
        <Route path="elite-combo" element={<EliteCombo />} />
        <Route path="equity-platinum" element={<EquityPlatniam />} />
        <Route path="option-btst" element={<OptionBtst />} />
        <Route path="rapid-index" element={<RapidIndex />} />
        <Route path="rapid-option" element={<RapidOption />} />
        <Route path="stock-future" element={<StockFuture />} />
        <Route path="stock-option" element={<StockOption />} />

        {/* Company Pages */}
        <Route path="refund-policy" element={<RefundPolicy />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="disclaimer" element={<Disclaimer />} />
        <Route path="terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="disclosure" element={<Disclosure />} />

        {/* Insights */}
        <Route path="blogs" element={<Blogs />} />
        <Route path="market-news" element={<MarketNews />} />
        <Route path="complaint-board" element={<ComplaintData />} />
        <Route path="grievance-redressal" element={<GrievanceRedressal />} />

        {/* Accessibility */}
        <Route path="accessibility-statement" element={<AccessibilityStatement />} />
        <Route path="accessibility-feedback" element={<AccessibilityFeedback />} />
        <Route path="accessibility-media" element={<AccessibilityMedia />} />

        {/* Dashboard */}
        <Route path="kyc-document" element={<KycDocument />} />
        <Route path="investor-handbook" element={<InvestorHandbook />} />
        <Route path="anti-money-laundering" element={<AntiMoneyLaundering />} />

        {/* Other Links */}
        <Route path="jobs" element={<Jobs />} />
        <Route path="payment" element={<Payment />} />
        <Route path="complaint-box" element={<ComplaintBox />} />
        <Route path="research-reports" element={<MarketReports />} />
        <Route path="e-sign-consent" element={<ClientServiceConsentForm />} />
        <Route path="contact-us" element={<ContactUs />} />
        <Route path="faqs" element={<FAQs />} />
        
        {/* Admin */}
        <Route path="admin/login" element={<AdminLogin />} />

        {/* Legacy/Unused but kept just in case */}
        <Route path="investor-chart" element={<InvestorChart />} />
        <Route path="complaint" element={<ComplaintPage />} />

        {/* Fallback to Home for unknown routes */}
        <Route path="*" element={<Home />} />
      </Route>
    ),
    {
      future: {
        v7_relativeSplatPath: true,
        v7_startTransition: true
      }
    }
  ), []);

  return <RouterProvider router={router} />;
}
