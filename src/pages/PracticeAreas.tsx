import React from 'react';
import { Building2, Users2, Scale, Home, Briefcase, Shield } from 'lucide-react';

const practiceAreas = [
  {
    icon: Building2,
    title: "Corporate Law",
    description: "Comprehensive legal solutions for businesses of all sizes, from startups to corporations."
  },
  {
    icon: Users2,
    title: "Family Law",
    description: "Sensitive and professional handling of divorce, custody, and family-related legal matters."
  },
  {
    icon: Scale,
    title: "Criminal Defense",
    description: "Strong defense strategies and experienced representation in criminal cases."
  },
  {
    icon: Home,
    title: "Real Estate Law",
    description: "Expert guidance in property transactions, disputes, and real estate regulations."
  },
  {
    icon: Briefcase,
    title: "Employment Law",
    description: "Protection of both employer and employee rights in workplace-related issues."
  },
  {
    icon: Shield,
    title: "Civil Litigation",
    description: "Skilled representation in civil disputes and litigation proceedings."
  }
];

export default function PracticeAreas() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <div className="bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Practice Areas</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Specialized legal expertise across multiple practice areas to serve your needs
          </p>
        </div>
      </div>

      {/* Practice Areas Grid */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {practiceAreas.map((area, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <area.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{area.title}</h3>
                <p className="text-gray-600">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Need Legal Assistance?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Our experienced team is ready to help you with your legal matters
          </p>
          <button className="bg-primary text-white px-8 py-3 rounded-md hover:bg-primary-light transition-colors duration-300">
            Schedule a Consultation
          </button>
        </div>
      </div>
    </div>
  );
}