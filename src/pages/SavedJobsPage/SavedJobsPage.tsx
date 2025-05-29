import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, X } from 'lucide-react';
import { Job } from '../../data/jobs';
import JobCard from '../../components/JobCard/JobCard';

const SavedJobsPage: React.FC = () => {
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);
  
  useEffect(() => {
    const jobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    setSavedJobs(jobs);
  }, []);

  const removeFromSaved = (id: string) => {
    const updatedJobs = savedJobs.filter(job => job.id !== id);
    localStorage.setItem('savedJobs', JSON.stringify(updatedJobs));
    setSavedJobs(updatedJobs);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <h1 className="text-2xl font-bold">Сохраненные вакансии</h1>
          <p className="opacity-90">Управляйте списком интересующих вас вакансий</p>
        </div>

        <div className="p-6">
          {savedJobs.length > 0 ? (
            <div className="space-y-4">
              {savedJobs.map(job => (
                <div key={job.id} className="relative">
                  <button
                    onClick={() => removeFromSaved(job.id)}
                    className="absolute top-4 right-4 z-10 bg-white rounded-full p-1 shadow-md text-gray-500 hover:text-red-500 transition-colors"
                    title="Удалить из сохраненных"
                  >
                    <X className="h-5 w-5" />
                  </button>
                  <JobCard job={job} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">У вас пока нет сохраненных вакансий</h2>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Сохраняйте интересные вакансии, чтобы вернуться к ним позже или сравнить предложения работодателей
              </p>
              <Link
                to="/jobs"
                className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors inline-block"
              >
                Найти вакансии
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedJobsPage;