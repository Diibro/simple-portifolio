
import { IListing } from "@/common/Interfaces"
import { ListingCardVertical } from "./ListingCard"

interface IListingContainer {
     listings: Array<IListing>
     id:string
}
const ListingsContainer:React.FC<IListingContainer> = ({listings, id}) => {
     return (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[10px]">
               {listings.map((listing,index)=> <ListingCardVertical key={`listings-container-${id}-${index}`} listing={listing} />)}
          </div>
     )
}



export default ListingsContainer