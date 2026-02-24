import { useEffect, useState } from 'react';
import Header from '../components/header';
import AboutFooter from '../components/aboutFooter';
import FeatureCard from '../components/featureCard';
import StepCard from '../components/stepCard';
import Icon from '../components/icon';

const About = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const features = [
    {
      iconName: 'Zap',
      title: 'Quick Add',
      description: 'Add tasks instantly with a simple input. No complex forms, no distractions—just type and press enter to capture your thoughts immediately.'
    },
    {
      iconName: 'CheckCircle',
      title: 'One-Click Complete',
      description: 'Mark tasks as done with a single click. Watch your progress grow as you check off completed items throughout your day.'
    },
    {
      iconName: 'Filter',
      title: 'Smart Filters',
      description: 'Quickly switch between all tasks, active items, or completed ones. Stay focused on what matters most to you right now.'
    },
    {
      iconName: 'Sparkles',
      title: 'Clean Design',
      description: 'A minimalist interface that puts your tasks front and center. No clutter, no noise—just pure productivity.'
    }
  ];

  const steps = [
    {
      stepNumber: '01',
      iconName: 'PenLine',
      title: 'Add Your Task',
      description: 'Simply type what you need to do in the input field and click the add button. Your task will appear instantly in your list.',
      imageUrl: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=400&fit=crop&auto=format'
    },
    {
      stepNumber: '02',
      iconName: 'ListTodo',
      title: 'Organize & Filter',
      description: 'Use the filter buttons to view all tasks, only active ones, or your completed achievements. Stay organized effortlessly.',
      imageUrl: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&h=400&fit=crop&auto=format'
    },
    {
      stepNumber: '03',
      iconName: 'CheckCheck',
      title: 'Complete & Clear',
      description: 'Check off tasks as you finish them. Use the clear completed button to remove finished items and keep your list fresh.',
      imageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=400&fit=crop&auto=format'
    }
  ];

  const techStack = [
    { name: 'React', iconName: 'Code2' },
    { name: 'Vite', iconName: 'Zap' },
    { name: 'Tailwind CSS', iconName: 'Palette' },
    { name: 'React Router', iconName: 'Route' },
    { name: 'Lucide Icons', iconName: 'Shapes' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&display=swap');
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
      
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 lg:py-32 bg-white border-b-2 border-black relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop&auto=format"
              alt="Background"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://placehold.co/1920x1080/f5f5f5/e0e0e0?text=';
              }}
            />
          </div>
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div 
                className={`inline-block mb-8 ${isLoaded ? 'animate-scaleIn' : 'opacity-0'}`}
                style={{ animationDelay: '0.1s' }}
              >
                <div className="w-24 h-24 bg-black mx-auto flex items-center justify-center">
                  <Icon name="Info" className="w-12 h-12 text-white" />
                </div>
              </div>
              
              <h1 
                className={`text-5xl md:text-7xl lg:text-8xl font-bold text-black mb-8 tracking-tight ${isLoaded ? 'animate-fadeInUp' : 'opacity-0'}`}
                style={{ fontFamily: 'Playfair Display, serif', animationDelay: '0.2s' }}
              >
                About TaskFlow
              </h1>
              
              <p 
                className={`text-xl md:text-2xl lg:text-3xl text-black leading-relaxed max-w-3xl mx-auto ${isLoaded ? 'animate-fadeInUp' : 'opacity-0'}`}
                style={{ fontFamily: 'Playfair Display, serif', animationDelay: '0.4s' }}
              >
                Simple task management for focused productivity
              </p>
              
              <div 
                className={`mt-12 flex justify-center ${isLoaded ? 'animate-fadeInUp' : 'opacity-0'}`}
                style={{ animationDelay: '0.6s' }}
              >
                <div className="w-32 h-0.5 bg-black" />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 lg:py-32 bg-white border-b-2 border-black">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16 md:mb-20">
              <p className="text-sm uppercase tracking-[0.3em] text-black mb-4">
                What We Offer
              </p>
              <h2 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-black"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Key Features
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
              {features.map((feature, index) => (
                <FeatureCard
                  key={feature.title}
                  iconName={feature.iconName}
                  title={feature.title}
                  description={feature.description}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* How To Use Section */}
        <section className="py-16 md:py-24 lg:py-32 bg-white border-b-2 border-black">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16 md:mb-20">
              <p className="text-sm uppercase tracking-[0.3em] text-black mb-4">
                Getting Started
              </p>
              <h2 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-black"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                How To Use
              </h2>
            </div>
            
            <div className="max-w-4xl mx-auto space-y-16 md:space-y-24">
              {steps.map((step, index) => (
                <StepCard
                  key={step.stepNumber}
                  stepNumber={step.stepNumber}
                  iconName={step.iconName}
                  title={step.title}
                  description={step.description}
                  imageUrl={step.imageUrl}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Credits Section */}
        <section className="py-16 md:py-24 lg:py-32 bg-black">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16 md:mb-20">
              <p className="text-sm uppercase tracking-[0.3em] text-white/60 mb-4">
                Built With
              </p>
              <h2 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Technology Stack
              </h2>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 md:gap-8 max-w-4xl mx-auto">
              {techStack.map((tech, index) => (
                <div 
                  key={tech.name}
                  className="flex items-center gap-3 px-6 py-4 bg-white border-2 border-white text-black hover:bg-black hover:text-white hover:border-white transition-all duration-300 group"
                >
                  <Icon name={tech.iconName} className="w-5 h-5" />
                  <span className="font-medium text-sm uppercase tracking-widest">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="mt-16 md:mt-20 text-center">
              <p className="text-white/80 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
                TaskFlow is crafted with modern web technologies to deliver a fast, responsive, and delightful task management experience.
              </p>
              
              <div className="inline-block">
                <img
                  src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop&auto=format"
                  alt="Code and technology"
                  className="w-full max-w-2xl h-64 md:h-80 object-cover border-2 border-white grayscale hover:grayscale-0 transition-all duration-500"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://placehold.co/800x400/1a1a1a/ffffff?text=Technology';
                  }}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <AboutFooter />
    </div>
  );
};

export default About;
