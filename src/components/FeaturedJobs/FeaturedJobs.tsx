import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Briefcase, Heart } from 'lucide-react';
import { jobsData } from '../../data/jobs';

const FeaturedJobs: React.FC = () => {
  // Берем только первые 6 вакансий для отображения на главной
  const featuredJobs = jobsData.slice(0, 6);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {featuredJobs.map((job) => (
        <div key={job.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-lg">
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center mr-4">
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors">
                    <Link to={`/jobs/${job.id}`}>{job.title}</Link>
                  </h3>
                  <p className="text-gray-600">{job.company}</p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-red-500 transition-colors">
                <Heart className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex flex-wrap items-center text-sm text-gray-500 mb-4">
              <div className="flex items-center mr-4 mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center mr-4 mb-2">
                <Briefcase className="h-4 w-4 mr-1" />
                <span>{job.type}</span>
              </div>
              <div className="flex items-center mb-2">
                <Clock className="h-4 w-4 mr-1" />
                <span>{job.posted}</span>
              </div>
            </div>
            
            <div className="mb-4 text-sm line-clamp-2 text-gray-600">
              {job.description}
            </div>
            
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-800">{job.salary}</span>
              <Link 
                to={`/jobs/${job.id}`} 
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Подробнее
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedJobs;