const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-base-200 to-primary/10 p-12 relative overflow-hidden">
      {/* Glowing Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-20 animate-pulse"></div>

      <div className="max-w-md text-center z-10">
        {/* Grid of Boxes */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl bg-gradient-to-br from-primary/30 to-primary/50 shadow-lg ${
                i % 2 === 0 ? "animate-pulse" : ""
              }`}
            />
          ))}
        </div>

        {/* Glowing Title */}
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-4 animate-pulse text-shadow-md">
          {title}
        </h2>

        {/* Glowing Subtitle */}
        <p className="text-base-content/80 animate-pulse delay-200 text-shadow-md">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
