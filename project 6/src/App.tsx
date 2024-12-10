import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/home/Hero';
import { Services } from './components/home/Services';
import { Stats } from './components/home/Stats';
import { SplashScreen } from './components/splash/SplashScreen';
import { AuthOptions } from './components/auth/AuthOptions';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminLogin } from './components/admin/AdminLogin';
import { EmployeeLogin } from './components/auth/EmployeeLogin';
import { RegistrationForm } from './components/auth/RegistrationForm';
import { LocationSelection } from './components/locations/LocationSelection';
import { LocationDashboard } from './components/locations/LocationDashboard';
import { BackButton } from './components/common/BackButton';
import { useAuth } from './lib/hooks/useAuth';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showAuth, setShowAuth] = useState(false);
  const [currentView, setCurrentView] = useState('auth');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isEmployeeAuthenticated, setIsEmployeeAuthenticated] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');
  const { isAuthenticated, login, logout } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
      setShowAuth(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleLocationSelect = (locationId: string) => {
    setSelectedLocation(locationId);
    setCurrentView('locationDashboard');
  };

  const handleBack = () => {
    if (currentView === 'locationDashboard') {
      setCurrentView('location');
      setSelectedLocation('');
    } else if (currentView === 'admin' && !isAdminAuthenticated) {
      setCurrentView('auth');
    } else if (currentView === 'register') {
      setCurrentView('auth');
    } else if (currentView === 'location') {
      setCurrentView('login');
      setIsEmployeeAuthenticated(false);
    } else if (currentView === 'login') {
      setCurrentView('auth');
    }
  };

  const handleLogin = () => {
    setCurrentView('login');
  };

  const handleEmployeeLogin = () => {
    setIsEmployeeAuthenticated(true);
    setCurrentView('location');
  };

  if (showSplash) {
    return <SplashScreen />;
  }

  if (currentView === 'locationDashboard') {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <BackButton onClick={handleBack} className="mb-8" />
            <LocationDashboard locationId={selectedLocation} onBack={handleBack} />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (currentView === 'admin') {
    if (!isAdminAuthenticated) {
      return (
        <div className="min-h-screen flex flex-col">
          <Header />
          <div className="flex-grow bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <BackButton onClick={handleBack} className="mb-8" />
              <AdminLogin onLogin={() => setIsAdminAuthenticated(true)} />
            </div>
          </div>
          <Footer />
        </div>
      );
    }
    return <AdminDashboard onBack={() => setIsAdminAuthenticated(false)} />;
  }

  if (currentView === 'login') {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <BackButton onClick={handleBack} className="mb-8" />
            <EmployeeLogin onLogin={handleEmployeeLogin} />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (currentView === 'register') {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <BackButton onClick={handleBack} className="mb-8" />
            <RegistrationForm />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (currentView === 'location') {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <BackButton onClick={handleBack} className="mb-8" />
            <LocationSelection onSelect={handleLocationSelect} />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (showAuth) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <AuthOptions 
          onAdminClick={() => setCurrentView('admin')}
          onRegisterClick={() => setCurrentView('register')}
          onLoginClick={handleLogin}
        />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Stats />
        <Services />
      </main>
      <Footer />
    </div>
  );
}