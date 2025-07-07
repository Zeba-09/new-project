import React from 'react';
import { ExternalLink, Phone, MessageCircle, Book, Video, Headphones } from 'lucide-react';

const Resources: React.FC = () => {
  const crisisResources = [
    {
      name: 'National Suicide Prevention Lifeline',
      phone: '988',
      description: '24/7 free and confidential support for people in distress',
      website: 'https://suicidepreventionlifeline.org'
    },
    {
      name: 'Crisis Text Line',
      phone: 'Text HOME to 741741',
      description: '24/7 crisis support via text message',
      website: 'https://crisistextline.org'
    },
    {
      name: 'SAMHSA National Helpline',
      phone: '1-800-662-4357',
      description: 'Treatment referral and information service',
      website: 'https://samhsa.gov'
    }
  ];

  const mentalHealthResources = [
    {
      title: 'Understanding Anxiety',
      type: 'Article',
      icon: Book,
      description: 'Learn about anxiety symptoms, causes, and coping strategies',
      url: '#'
    },
    {
      title: 'Mindfulness Meditation',
      type: 'Audio',
      icon: Headphones,
      description: 'Guided meditation sessions for stress relief and relaxation',
      url: '#'
    },
    {
      title: 'Breathing Exercises',
      type: 'Video',
      icon: Video,
      description: 'Visual guide to breathing techniques for anxiety management',
      url: '#'
    },
    {
      title: 'Depression Support',
      type: 'Article',
      icon: Book,
      description: 'Understanding depression and finding help',
      url: '#'
    },
    {
      title: 'Sleep Hygiene',
      type: 'Video',
      icon: Video,
      description: 'Tips for better sleep and mental health',
      url: '#'
    },
    {
      title: 'Stress Management',
      type: 'Audio',
      icon: Headphones,
      description: 'Techniques for managing academic and social stress',
      url: '#'
    }
  ];

  const supportGroups = [
    {
      name: 'Anxiety Support Group',
      schedule: 'Tuesdays, 6:00 PM',
      location: 'Student Center Room 201',
      contact: 'counseling@university.edu'
    },
    {
      name: 'Depression Support Circle',
      schedule: 'Thursdays, 5:30 PM',
      location: 'Wellness Center',
      contact: 'wellness@university.edu'
    },
    {
      name: 'Mindfulness Group',
      schedule: 'Mondays, 7:00 PM',
      location: 'Library Quiet Room',
      contact: 'mindfulness@university.edu'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Wellness Resources</h1>
        <p className="text-gray-600">Access helpful resources for your mental health and wellbeing</p>
      </div>

      {/* Crisis Resources */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-red-800 mb-4 flex items-center">
          <Phone className="h-5 w-5 mr-2" />
          Crisis Resources - Available 24/7
        </h2>
        <div className="grid md:grid-cols-1 gap-4">
          {crisisResources.map((resource, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border border-red-200">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900">{resource.name}</h3>
                <a
                  href={resource.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-600 hover:text-red-800"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
              <p className="text-lg font-bold text-red-600 mb-2">{resource.phone}</p>
              <p className="text-gray-600 text-sm">{resource.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 p-4 bg-red-100 rounded-lg">
          <p className="text-red-800 font-medium text-sm">
            🚨 If you're in immediate danger, please call 911 or go to your nearest emergency room.
          </p>
        </div>
      </div>

      {/* Mental Health Resources */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Educational Resources</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentalHealthResources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-3">
                  <div className="p-2 bg-emerald-100 rounded-lg mr-3">
                    <Icon className="h-5 w-5 text-emerald-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                    {resource.type}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{resource.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
                <button className="text-emerald-600 hover:text-emerald-700 font-medium text-sm flex items-center">
                  Access Resource
                  <ExternalLink className="h-4 w-4 ml-1" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Support Groups */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Support Groups</h2>
        <div className="space-y-4">
          {supportGroups.map((group, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{group.name}</h3>
                  <p className="text-gray-600 text-sm mb-1">{group.schedule}</p>
                  <p className="text-gray-600 text-sm">{group.location}</p>
                </div>
                <div className="text-right">
                  <a
                    href={`mailto:${group.contact}`}
                    className="inline-flex items-center text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                  >
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Contact
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Campus Resources */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Campus Resources</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="border-l-4 border-emerald-500 pl-4">
              <h3 className="font-semibold text-gray-900">Counseling Center</h3>
              <p className="text-gray-600 text-sm">Professional counseling services</p>
              <p className="text-gray-600 text-sm">Phone: (555) 123-4567</p>
              <p className="text-gray-600 text-sm">Email: counseling@university.edu</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-gray-900">Health Services</h3>
              <p className="text-gray-600 text-sm">Medical and psychiatric care</p>
              <p className="text-gray-600 text-sm">Phone: (555) 123-4568</p>
              <p className="text-gray-600 text-sm">Email: health@university.edu</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-semibold text-gray-900">Wellness Center</h3>
              <p className="text-gray-600 text-sm">Holistic wellness programs</p>
              <p className="text-gray-600 text-sm">Phone: (555) 123-4569</p>
              <p className="text-gray-600 text-sm">Email: wellness@university.edu</p>
            </div>
            <div className="border-l-4 border-orange-500 pl-4">
              <h3 className="font-semibold text-gray-900">Academic Support</h3>
              <p className="text-gray-600 text-sm">Study skills and stress management</p>
              <p className="text-gray-600 text-sm">Phone: (555) 123-4570</p>
              <p className="text-gray-600 text-sm">Email: academic@university.edu</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;