import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { HashLoader } from "react-spinners";

export default function LoadingWrapper({ children }: any) {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [location]);
  
  console.log("changed pages");
  return loading ? (
    <div className="flex justify-center items-center pt-[330px]">
      <HashLoader size={80} color={"#3B82F6"} loading={loading} />
    </div>
  ) : (
    children
  );
}