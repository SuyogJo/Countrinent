import { useRef, useEffect } from 'react';
import { Transition } from '@headlessui/react';

const ModalSubmit = ({ isOpen, onClose, pop, conti, tok, finalScore}: {isOpen: boolean, onClose:any, pop:any, conti:any, tok:number, finalScore:number}) => {
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

  const contRes = conti.map((x: any) =>
    <ul>
        <li style={{ marginLeft: '30px', marginTop: '10px', marginBottom: '20px' }}>&#8226; {x[0]} : {x[1]}</li>
    </ul>
  )

    const popRes = pop.length > 0
    ? pop.map((y: any) => (
        <ul>
            <li style={{ marginLeft: '30px', marginTop: '10px', marginBottom: '20px' }}>&#8226; {y[0]} : {y[1]}</li>
        </ul>
        ))
    :   <ul>
            <li style={{ marginLeft: '30px', marginTop: '10px', marginBottom: '20px' }}>&#8226; None</li>
        </ul>;

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
                Result
            </h1>
            <ul className='text-base font-thin'>
                <li className='pt-3'>Number of Unique Continents: {contRes.length}</li>
                <li className='pb-3 pt-4'>{contRes}</li>
                <li>Number of Countries with population over 100 million or under 40 thousand: {popRes.length}</li>
                <li className='pb-3 pt-4'>{popRes}</li>
                <li style={{ marginBottom: '20px' }}>Leftover Tokens: {tok}</li>
                <li className='flex items-center justify-center text-center text-3xl font-black text-[#086066]'>Total Score: {finalScore}</li>
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

export default ModalSubmit;