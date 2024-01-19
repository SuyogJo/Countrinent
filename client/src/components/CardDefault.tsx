import { useState } from 'react'

const CardDefault = (props: { name: string, continent: string}) => {
  const [contiReveal, setContiReveal] = useState(false)
  return (
    <div className="flex flex-col justify-between p-3 bg-[#1E7C82] rounded overflow-clip shadow-lg h-60 max-h-60 w-50 max-width-50">
      {/* Card Body */}
          {/* Card Title */}
          <div className="font-bold text-xl min-w-22 flex items-center justify-center text-center p-3">{props.name}</div>

        {/* Card Footer */}
        <div className="p-3 flex items-center justify-center text-center p-3">
          <button onClick={() => setContiReveal(pre => !pre)} className="transition duration-200 ease-in inline-block bg-gray-200 hover:bg-gray-400 hover:scale-105 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
            {contiReveal? props.continent : <div>Reveal Continent</div>}
          </button>
        </div>
    </div>
  );
};

export default CardDefault;