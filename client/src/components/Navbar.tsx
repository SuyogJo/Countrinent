import { useState } from 'react'
import { RxQuestionMarkCircled } from "react-icons/rx";
import { FiMenu } from "react-icons/fi";
import Modal from "./Modal";

const Navbar = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <nav className="bg-gray-800 p-2">
        <div className="flex justify-between">
          <div onClick={openModal} className="my-1 mx-3"><RxQuestionMarkCircled size={30} /></div>
          <Modal isOpen={isModalOpen} onClose={closeModal} />
          <div className="font-mono text-white font-bold text-xl m-auto col-span-1">COUNTRINENT</div>
          <div className="my-1 mx-3"><FiMenu size={30}/></div>
        </div>
    </nav>
  );
};

export default Navbar;
