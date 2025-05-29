import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jobsData } from '../../data/jobs';

const AddJobPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: 'Полная занятость',
    category: 'IT и разработка',
    salary: '',
    description: '',
    responsibilities: [''],
    requirements: [''],
    benefits: [''],
    isRemote: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: checkbox.checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleArrayChange = (index: number, value: string, field: 'responsibilities' | 'requirements' | 'benefits') => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field: 'responsibilities' | 'requirements' | 'benefits') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (index: number, field: 'responsibilities' | 'requirements' | 'benefits') => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newJob = {
      id: String(Date.now()),
      ...formData,
      companyLogo: `https://via.placeholder.com/100x100?text=${formData.company.substring(0, 2)}`,
      posted: 'Только что',
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('ru-RU'),
      isFeatured: false
    };

    // В реальном приложении здесь был бы API-запрос
    jobsData.unshift(newJob);
    
    navigate('/jobs');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <h1 className="text-2xl font-bold">Разместить вакансию</h1>
          <p className="opacity-90">Заполните информацию о вакансии</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Название должности
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Например: Frontend-разработчик"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Компания
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Название компании"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Местоположение
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Город"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Тип занятости
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Полная занятость">Полная занятость</option>
                <option value="Частичная занятость">Частичная занятость</option>
                <option value="Проектная работа">Проектная работа</option>
                <option value="Стажировка">Стажировка</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Категория
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="IT и разработка">IT и разработка</option>
                <option value="Маркетинг">Маркетинг</option>
                <option value="Продажи">Продажи</option>
                <option value="Дизайн">Дизайн</option>
                <option value="Финансы">Финансы</option>
                <option value="Образование">Образование</option>
                <option value="Медицина">Медицина</option>
                <option value="Административный персонал">Административный персонал</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Зарплата
              </label>
              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Например: 120 000 - 180 000 ₽"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Описание вакансии
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Подробное описание вакансии"
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Обязанности
            </label>
            {formData.responsibilities.map((responsibility, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={responsibility}
                  onChange={(e) => handleArrayChange(index, e.target.value, 'responsibilities')}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Обязанность"
                />
                {formData.responsibilities.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem(index, 'responsibilities')}
                    className="text-red-500 hover:text-red-700"
                  >
                    Удалить
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('responsibilities')}
              className="text-blue-600 hover:text-blue-800"
            >
              + Добавить обязанность
            </button>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Требования
            </label>
            {formData.requirements.map((requirement, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={requirement}
                  onChange={(e) => handleArrayChange(index, e.target.value, 'requirements')}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Требование"
                />
                {formData.requirements.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem(index, 'requirements')}
                    className="text-red-500 hover:text-red-700"
                  >
                    Удалить
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('requirements')}
              className="text-blue-600 hover:text-blue-800"
            >
              + Добавить требование
            </button>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Что мы предлагаем
            </label>
            {formData.benefits.map((benefit, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={benefit}
                  onChange={(e) => handleArrayChange(index, e.target.value, 'benefits')}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Преимущество"
                />
                {formData.benefits.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem(index, 'benefits')}
                    className="text-red-500 hover:text-red-700"
                  >
                    Удалить
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('benefits')}
              className="text-blue-600 hover:text-blue-800"
            >
              + Добавить преимущество
            </button>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isRemote"
              name="isRemote"
              checked={formData.isRemote}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="isRemote" className="ml-2 block text-gray-700">
              Возможна удаленная работа
            </label>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors"
            >
              Опубликовать вакансию
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddJobPage;