import { useEffect, useState } from 'react';
import LandingPage from '@/components/LandingPage';
import RegistrationForm from '@/components/RegistrationForm';

export default function App() {
  const [view, setView] = useState<'landing' | 'form'>('landing');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  if (view === 'form') {
    return <RegistrationForm onBack={() => setView('landing')} />;
  }

  return <LandingPage onApply={() => setView('form')} />;
}
