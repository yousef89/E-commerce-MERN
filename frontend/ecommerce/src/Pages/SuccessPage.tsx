import { useNavigate } from "react-router-dom";
import SuccessLogo from "../SVGs/Success";

export default function SuccessPage() {
    const navigate = useNavigate();
    setTimeout(() => {
        navigate("/");
    }, 3000);
  return (
    <div>
      <div className="flex flex-col items-center justify-center mt-[17%] gap-5">
        <SuccessLogo width={100} height={100}></SuccessLogo>
        <h1 className="text-[30px]">Your order has been successfully submitted</h1>
      </div>
    </div>
  );
}
