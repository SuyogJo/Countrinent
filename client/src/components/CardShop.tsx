const CardDefault = (props: { name: string, continent: string}) => {
    return (
      <div className=" rounded overflow-hidden shadow-lg bg-grey border-4 border-cyan-500">
        {/* Card Body */}
        <div className="px-6 py-4">
          {/* Card Title */}
          <div className="font-bold text-xl mb-2">{props.name}</div>
        </div>
  
        {/* Card Footer */}
        <div className="px-6 py-4">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{props.continent}</span>
        </div>
      </div>
    );
  };
  
  export default CardDefault;