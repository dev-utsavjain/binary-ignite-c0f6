const FilterBar = ({ filter, onFilterChange, itemsLeft }) => {
  const filters = [
    { key: 'all', label: 'All' },
    { key: 'active', label: 'Active' },
    { key: 'completed', label: 'Completed' },
  ];

  return (
    <section className="py-6 bg-white border-b-2 border-black">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {filters.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => onFilterChange(key)}
                className={`px-4 py-2 font-medium text-sm uppercase tracking-widest transition-all duration-300 border-2 ${
                  filter === key
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-black border-black hover:bg-black hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          
          <p className="text-black text-sm uppercase tracking-widest font-medium">
            {itemsLeft} {itemsLeft === 1 ? 'item' : 'items'} left
          </p>
        </div>
      </div>
    </section>
  );
};

export default FilterBar;
