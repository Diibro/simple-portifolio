'use client';
import ImageSlider from "../Images/ImageSlider";
import { getDate } from "@/util/DateFunctions";
import { IListing } from "@/common/Interfaces";
import { useRouter } from "next/navigation";
import { useMessages } from "@/context/MessagesContext";

interface IListingCard {
     listing: IListing
}

export const ListingCardRow:React.FC<IListingCard> = ({listing}) => {
     const {locale} = useMessages();
     const {common} = useMessages().messages; 
     const messages = common.listing;
     return (
          <div className="w-full border-[1.2px] border-slate-300 rounded-[5px] p-[5px] aspect-[100/40] ">
               <div className="w-[40%] h-full ">
                    <ImageSlider rounded="5px" images={[listing.features.mainImage, ...(listing.features.otherImages)]} />
               </div>
               <div>
                    <h3>{listing.name[locale]}</h3>
                    <p>{messages.addedDate}: {getDate(listing.createdAt)}</p>
               </div>
               <div>
                    {listing.features.categoryValues.map((feature, index) => <span key={`card-listing-feature-${listing.id}-${index}`} >{feature.name[locale]}: {feature.value}</span>) }
               </div>
          </div>
     )
}

export const ListingCardVertical:React.FC<IListingCard> = ({listing}) => {
     const {locale} = useMessages();
     const {common} = useMessages().messages; 
     const messages = common.listing;
     const router = useRouter();
     const viewListing = () => {
          return router.push(`/listing/${listing.id}`)
     }
     return (
          <div className="w-full md:w-[45%] lg:w-[30%]  aspect-[100/80] border-[1.3px] rounded-[5px] p-[5px] flex flex-col items-center justify-start mx-auto overflow-hidden " >
               <div className="w-full h-full flex cursor-pointer" onClick={viewListing}>
                    <ImageSlider rounded="5px" images={[listing.features.mainImage, ...(listing.features.otherImages)]} />
               </div>
               <div className="w-full flex flex-col gap-[2px] p-[5px] ">
                    <h3 className="text-[0.9rem] text-main-primary font-bold my-0 leading-5 ">{listing.name[locale]}</h3>
                    <p className="text-[0.75rem] font-medium text-gray-500  ">{messages.addedDate} {getDate(listing.createdAt)}</p>
               </div>
               <div className="w-full px-[5px] flex items-center justify-start gap-[5px] flex-wrap">
                    {listing.features.categoryValues.map((feature, index) => <span className="text-[0.75rem] text-gray-500 " key={`card-listing-feature-${listing.id}-${index}`} >{feature.name[locale]}: {feature.value}</span>) }
               </div>
          </div>
     )
}