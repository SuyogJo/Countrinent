const CardShop = (props: { name: string, continent: string, onTitleClick: any}) => {

  return (
    <div className="flex flex-col justify-between p-3 bg-[#1E7C82] rounded overflow-clip shadow-lg h-60 max-h-60 w-50 min-w-50 flex-shrink-0">
      {/* Card Body */}
          {/* Card Title */}
          <button onClick={props.onTitleClick} className="transition duration-200 ease-in bg-[#196b70] hover:bg-[#238287] hover:scale-105 rounded font-bold text-xl p-3 h-40">
            <div className="h-50">{props.name}</div>
          </button>

        {/* Card Footer */}
        <div className="p-3">
          <button onClick={() => {}}
              className="transition duration-200 ease-in inline-block bg-gray-200 hover:bg-gray-400 hover:scale-105 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
              {props.continent}
          </button>
        </div>
    </div>
  );
};

export default CardShop;