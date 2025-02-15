function Carousel() {
  const images = [
    "https://plus.unsplash.com/premium_photo-1661915661139-5b6a4e4a6fcc?q=80&w=2534&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1678752717095-08cd0bd1d7e7?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  return (
    <section className="bg-zinc-50 overflow-hidden">
      <div className="max-w-screen-xl 2xl:max-w-screen-3xl px-8 md:px-12 mx-auto py-12 lg:py-24 space-y-24 h-svh flex flex-col justify-center">
        <div className="flex flex-col sm:flex-row mx-auto">
          {images.map((image, index) => (
            <a href="#_" key={index}>
              <img
                src={image}
                className={`rounded-xl ${
                  index % 2 === 0 ? "rotate-6" : "-rotate-12"
                } hover:rotate-0 duration-500 hover:-translate-y-12 h-full w-full object-cover hover:scale-150 transform origin-bottom`}
                alt={`carousel-image-${index}`}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Carousel;
