import Hero from '../components/Hero';
import MarketInsights from '../components/MarketInsights';
import LiveMarketDemo from '../components/livemarketdata';
import OurServices from '../components/OurServices';
import EconomicCalendar from '../components/EconomicCalendar';
import FAQ from '../components/FAQ';
import ComplaintData from '../components/ComplaintData';
import ContactForm from '../components/ContactForm';
import CertificationsSection from '../components/CertificationsSection';

// Home renders componentized Hero, LiveMarketDemo and MarketInsights components.
export default function Home() {
	return (
		<>
			<Hero />
			<LiveMarketDemo />
			{/* Services section moved slightly lower than the live market demo */}
			<OurServices />
			<MarketInsights />
			<EconomicCalendar />
			<FAQ />
			<ComplaintData />
			<ContactForm />
			<CertificationsSection />
		</>
	);
}
