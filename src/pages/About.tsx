import React from 'react';
import { Users, Award, History } from 'lucide-react';

export default function About() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <div className="bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">About Our Firm</h1>
          <p className="text-xl text-center max-w-3xl mx-auto">
            With over 25 years of experience, we've built a reputation for excellence in legal services
            and unwavering commitment to our clients.
          </p>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Client-Focused</h3>
              <p className="text-gray-600">
                We put our clients first, ensuring personalized attention and dedicated service.
              </p>
            </div>
            <div className="text-center p-6">
              <Award className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Excellence</h3>
              <p className="text-gray-600">
                Our commitment to excellence drives everything we do.
              </p>
            </div>
            <div className="text-center p-6">
              <History className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Experience</h3>
              <p className="text-gray-600">
                Decades of experience handling complex legal matters.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* History Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our History</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&q=80&w=800"
                alt="Law firm building"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="space-y-6">
              <p className="text-gray-600">
                Founded in 1998, our firm has grown from a small practice to one of the most respected
                legal institutions in the region. We've maintained our commitment to personal service
                while expanding our expertise across multiple practice areas.
              </p>
              <p className="text-gray-600">
                Today, we continue to evolve and adapt to meet the changing needs of our clients,
                while maintaining the highest standards of legal excellence and professional integrity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}