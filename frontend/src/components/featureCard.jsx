import Icon from './icon';

const FeatureCard = ({ iconName, title, description, index }) => {
  return (
    <div 
      className="bg-white border-2 border-black p-8 md:p-10 transition-all duration-300 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] group"
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      <div className="w-16 h-16 bg-black flex items-center justify-center mb-6 group-hover:bg-white group-hover:border-2 group-hover:border-black transition-all duration-300">
        <Icon name={iconName} className="w-8 h-8 text-white group-hover:text-black transition-all duration-300" />
      </div>
      <h3 
        className="text-2xl md:text-3xl font-bold text-black mb-4"
        style={{ fontFamily: 'Playfair Display, serif' }}
      >
        {title}
      </h3>
      <p className="text-black text-base leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
