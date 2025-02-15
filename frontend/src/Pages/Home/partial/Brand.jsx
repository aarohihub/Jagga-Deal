import DepartImage from "./BrandImages/Department.png";
import FacebookImage from "./BrandImages/facebook.png";
import DuncanImg from "./BrandImages/Duncan.png";
import ZulekhaImg from "./BrandImages/Zulekha.png";
import TelepImg from "./BrandImages/teleperformance.png";

function Brand() {
  return (
    <div className="flex justify-between items-center gap-5 select-none ">
      <img src={DuncanImg} alt="Duncan" className="w-32 h-32 object-contain" />
      <img
        src={FacebookImage}
        alt="Facebook"
        className="w-32 h-32 object-contain"
      />
      <img
        src={ZulekhaImg}
        alt="Zulekha"
        className="w-32 h-32 object-contain"
      />
      <img
        src={TelepImg}
        alt="Teleperformance"
        className="w-32 h-32 object-contain"
      />
      <img
        src={DepartImage}
        alt="Department"
        className="w-32 h-32 object-contain"
      />
    </div>
  );
}

export default Brand;
