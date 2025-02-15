import { IoIosStar } from "react-icons/io";

function Achievement() {
  return (
    <div className="py-10 flex flex-col md:flex-row gap-4 h-full select-none">
      <div className="md:w-1/2">
        <h1 className="font-inter font-serif text-xl md:text-2xl text-[#8F2B51]">
          We have many impressive accomplishments to share.
        </h1>
        <div className="flex items-center space-x-2 ">
          <p className="text-base md:text-lg text-[#8F2B51]">Review On</p>
          <IoIosStar className="h-4 w-4 text-green-700" />
        </div>
        <div className="flex items-center space-x-2">
          <IoIosStar className="h-4 w-4 text-green-700" />
          <h1 className="font-inter text-lg font-serif md:text-xl text-[#8F2B51]">
            Trustpilot
          </h1>
          <p className="font-inter text-sm font-light text-[#8F2B51]">
            21 Reviews
          </p>
        </div>
      </div>

      <div className="flex sm:flex gap-2">
        <div className="border-l-4 border-[#F1B43E] h-[70px] md:h-[100px]"></div>

        <div className="flex flex-col md:w-1/4 text-[#8F2B51]">
          <div className="flex items-baseline space-x-1">
            <h1 className="text-3xl font-bold ">21</h1>
            <p className="font-inter text-sm font-semibold">Years</p>
          </div>
          <p className="font-inter">Proven track record</p>
        </div>
      </div>

      {/* ?horizontal lines */}
      <div className="flex sm:flex gap-2 text-[#8F2B51]">
        <div className="border-l-4 border-[#F1B43E] h-[70px] md:h-[100px]"></div>

        <div className="flex flex-col  text-[#8F2B51]">
          <div className="flex items-baseline space-x-1">
            <h1 className="text-3xl font-bold">24+</h1>
          </div>
          <p className="font-inter ">Professional Tech Team</p>
        </div>
      </div>

      <div className="flex sm:flex gap-2 text-[#8F2B51]">
        <div className="border-l-4 border-[#F1B43E] h-[70px] md:h-[100px]"></div>

        <div className="flex flex-col ">
          <div className="flex items-baseline space-x-1">
            <h1 className="text-3xl font-bold">100%</h1>
          </div>
          <p className="font-inter">Client Satisfaction</p>
        </div>
      </div>

      <div className="flex sm:flex gap-2 text-[#8F2B51]">
        <div className="border-l-4 border-[#F1B43E] h-[70px] md:h-[100px]"></div>

        <div className="flex flex-col ">
          <div className="flex items-baseline space-x-1">
            <h1 className="text-3xl font-bold">1500</h1>
            <p className="font-inter text-sm font-semibold">Projects</p>
          </div>
          <p className="font-inter">We have completed</p>
        </div>
      </div>
    </div>
  );
}

export default Achievement;
