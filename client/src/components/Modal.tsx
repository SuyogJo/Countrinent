import React, { useRef, useEffect } from 'react';
import { Transition } from '@headlessui/react';

const Modal = ({ isOpen, onClose}: {isOpen: boolean, onClose:any}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current!.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onClose]);

  return (
    <Transition
      show={isOpen}
      enter="transition-opacity duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div ref={modalRef} className="font-mono bg-[#7086b1] p-8 rounded-md z-10">
          <div>
            <h1 className="text-xl font-bold mb-4">
                How To Play
            </h1>
            <ul>
                <li>&#8226; Start out with 3 countries in your hand</li>
                <li>&#8226; You have 5 tokens for the journey to refresh and land on new countries</li>
                <li>&#8226; Pick countries to try to maximize your score based on the conditions listed below</li>
                <li style={{ marginLeft: '30px', marginTop: '10px' }}>&#8226; Point per unique continent in your hand</li>
                <li style={{ marginLeft: '30px'}}>&#8226; Point for every country that has a population less than 40,000</li>
                <li style={{ marginLeft: '30px'}}>&#8226; Point for every country that has a population over 100,000,000</li>
                <li style={{ marginLeft: '30px'}}>&#8226; Point for the remaining unused tokens</li>
                <li style={{ marginTop: '10px' }}>&#8226; You can decide at any moment to submit your hand</li>
                <li >&#8226; You cannot drop any of the countries you decide to select</li>
                <li >&#8226; You can only have a maximum of 7 countries in your hand</li>
                <li >&#8226; You can click and reveal the continent of any country</li>
                <li style={{ marginBottom: '20px' }}>&#8226; Good luck!</li>

            </ul>
          </div>
          <button onClick={onClose} className="bg-[#1E7C82] text-white px-4 py-2 rounded-md">
            Close
          </button>
        </div>
      </div>
    </Transition>
  );
};

export default Modal;