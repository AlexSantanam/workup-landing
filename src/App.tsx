import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FleetCatalog } from './components/FleetCatalog';
import { VehicleModal } from './components/VehicleModal';
import { OpexCalculator } from './components/OpexCalculator';
import { SernageominStandards } from './components/SernageominStandards';
import { CoverageMap } from './components/CoverageMap';
import { QuoteBuilder } from './components/QuoteBuilder';
import { TestimonialsAndClients } from './components/TestimonialsAndClients';
import { Footer } from './components/Footer';
import { CommercialBot } from './components/CommercialBot';
import { FLEET_VEHICLES } from './data/fleetData';
import { Vehicle, QuoteItem } from './types';
import { fetchLiveUF } from './utils/currency';

export default function App() {
  // Global Currency: UF or CLP
  const [currency, setCurrency] = useState<'UF' | 'CLP'>('UF');

  // Live UF value (fetched from mindicador.cl). Drives a re-render so every
  // formatCLP/ufToClp call across the app picks up the fresh reference value.
  const [ufUpdatedAt, setUfUpdatedAt] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const refreshUF = () => {
      fetchLiveUF().then((result) => {
        if (!cancelled && result) {
          setUfUpdatedAt(result.date);
        }
      });
    };

    refreshUF();
    // La UF se publica una vez al día (SII/Banco Central); reintentamos cada
    // 30 min por si la pestaña queda abierta hasta la próxima publicación.
    const interval = window.setInterval(refreshUF, 30 * 60 * 1000);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, []);

  // Selected vehicle for detailed technical modal
  const [selectedVehicleForModal, setSelectedVehicleForModal] = useState<Vehicle | null>(null);

  // Quote cart items (Initial default with 2 Toyota Hilux 4x4 Mineras to show instant dynamic calculation)
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([
    {
      vehicleId: FLEET_VEHICLES[0].id,
      quantity: 3,
      vehicle: FLEET_VEHICLES[0],
    },
  ]);

  // Handler to add or increment vehicle in quote
  const handleAddVehicleToQuote = (vehicle: Vehicle) => {
    setQuoteItems((prev) => {
      const existing = prev.find((item) => item.vehicleId === vehicle.id);
      if (existing) {
        return prev.map((item) =>
          item.vehicleId === vehicle.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { vehicleId: vehicle.id, quantity: 1, vehicle }];
    });
  };

  // Handler to update quantity
  const handleUpdateQuantity = (vehicleId: string, delta: number) => {
    setQuoteItems((prev) => {
      return prev
        .map((item) => {
          if (item.vehicleId === vehicleId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is QuoteItem => item !== null);
    });
  };

  // Handler to remove item
  const handleRemoveItem = (vehicleId: string) => {
    setQuoteItems((prev) => prev.filter((item) => item.vehicleId !== vehicleId));
  };

  // Scroll to quotation builder
  const scrollToQuote = () => {
    const el = document.getElementById('cotizar');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Quick quote from Hero Section
  const handleQuickQuote = (config: {
    category: string;
    regionId: string;
    termMonths: number;
    quantity: number;
  }) => {
    // Find representative vehicle for this category
    const matchingVehicle =
      FLEET_VEHICLES.find((v) => v.category === config.category) || FLEET_VEHICLES[0];

    setQuoteItems([
      {
        vehicleId: matchingVehicle.id,
        quantity: config.quantity,
        vehicle: matchingVehicle,
      },
    ]);

    scrollToQuote();
  };

  const totalSelectedUnits = quoteItems.reduce((acc, it) => acc + it.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* 1. Header / Navbar */}
      <Navbar
        currency={currency}
        onToggleCurrency={setCurrency}
        selectedVehicleCount={totalSelectedUnits}
        onOpenQuoteBuilder={scrollToQuote}
        ufUpdatedAt={ufUpdatedAt}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        
        {/* 2. Hero Section */}
        <HeroSection
          currency={currency}
          onQuickQuote={handleQuickQuote}
          onExploreFleet={() => {
            const el = document.getElementById('flota');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 3. Fleet Catalog with Tabs and Filters */}
        <FleetCatalog
          currency={currency}
          onSelectVehicleForModal={setSelectedVehicleForModal}
          onAddToQuote={handleAddVehicleToQuote}
          selectedVehicleIds={quoteItems.map((i) => i.vehicleId)}
        />

        {/* 4. SERNAGEOMIN DS 132 Mining Standards & Telemetry Hub */}
        <SernageominStandards />

        {/* 5. OpEx Financial Calculator (Tax Shield Art. 31 SII) */}
        <OpexCalculator
          currency={currency}
          onGoToQuote={scrollToQuote}
        />

        {/* 6. Chilean Mining Coverage Map & Operational Bases */}
        <CoverageMap />

        {/* 7. Interactive B2B Quote Builder & Fleet Configurator */}
        <QuoteBuilder
          currency={currency}
          quoteItems={quoteItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onAddVehicleToQuote={handleAddVehicleToQuote}
        />

        {/* 8. Testimonials & Mining Mandantes Trust */}
        <TestimonialsAndClients />

      </main>

      {/* 9. Corporate Footer */}
      <Footer />

      {/* Interactive Modal: Detailed Vehicle Specs & SERNAGEOMIN Checklist */}
      <VehicleModal
        vehicle={selectedVehicleForModal}
        currency={currency}
        onClose={() => setSelectedVehicleForModal(null)}
        onAddToQuote={handleAddVehicleToQuote}
      />

      {/* Floating Commercial Chat Bot */}
      <CommercialBot />

    </div>
  );
}
