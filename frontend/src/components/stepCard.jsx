import Icon from './icon';

const StepCard = ({ stepNumber, iconName, title, description, imageUrl }) => {
  return (
    <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12">
      <div className="flex-shrink-0">
        <div className="w-20 h-20 bg-black flex items-center justify-center">
          <span 
            className="text-3xl font-bold text-white"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            {stepNumber}
          </span>
        </div>
      </div>
      
      <div className="flex-1">
        <div className="flex items-center gap-4 mb-4">
          <Icon name={iconName} className="w-6 h-6 text-black" />
          <h3 
            className="text-2xl md:text-3xl font-bold text-black"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            {title}
          </h3>
        </div>
        <p className="text-black text-lg leading-relaxed mb-6">
          {description}
        </p>
        <div className="border-2 border-black overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-48 md:h-64 object-cover grayscale hover:grayscale-0 transition-all duration-500"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://placehold.co/800x400/000000/FFFFFF?text=Step+' + stepNumber;
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default StepCard;
