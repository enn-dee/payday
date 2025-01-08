import React from "react";
import PageAuthStore from "../zustand/LoadAuthStore";

interface ButtonName {
  title: string;
}

const LoadAuthButton: React.FC<ButtonName> = ({ title }) => {
  const { page, setPage } = PageAuthStore();

  const handlePage = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    setPage(!page);
  };

  return (
    <a
      href="#"
      className="bg-gray-800 text-slate-100 p-3 rounded-md focus:bg-green-500 hover:bg-gray-900"
      onClick={handlePage}
    >
      {title}
    </a>
  );
};

export default LoadAuthButton;
