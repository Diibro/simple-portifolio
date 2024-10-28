

interface IProviderCard {
     action: () => unknown
     name: string
     icon: React.ReactNode
}

const ProviderCard: React.FC<IProviderCard> = ({action, name, icon}) => {
     return (
          <div className="rounded-[5px] w-[24%] aspect-square flex flex-col items-center justify-center gap-[5px] cursor-pointer shadow-slate-300 p-[10px] hover:shadow-md transition-all duration-300 " onClick={action}>
               {icon}
               <span className="text-[0.7rem] text-gray-500 " >{name}</span>
          </div>
     )
}

export default ProviderCard;