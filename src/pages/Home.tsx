import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, Shield, Users, Building2, ArrowRight } from 'lucide-react';
import Hero from '../components/Hero';

const features = [
  {
    icon: Scale,
    title: "Expert Legal Counsel",
    description: "Our experienced attorneys provide comprehensive legal solutions tailored to your needs."
  },
  {
    icon: Shield,
    title: "Strong Advocacy",
    description: "We vigorously defend your rights and interests in every legal matter."
  },
  {
    icon: Users,
    title: "Client-Focused Approach",
    description: "Your success is our priority. We work closely with you to achieve your legal goals."
  },
  {
    icon: Building2,
    title: "Industry Experience",
    description: "Decades of experience across various legal domains and industries."
  }
];

export default function Home() {
  return (
    <div className="pt-0">
      <Hero />
      {/* Rest of the component remains the same */}
    </div>
  );
}