import { useRouter } from "next/navigation";
import ImageSlider from "../Images/ImageSlider";
import { useLocale, useTranslations } from "next-intl";
import { TLocale } from "@/common/CommonTypes";
import { IListing } from "@/common/Interfaces";
import { getDate } from "@/util/DateFunctions";

interface IListingCard {
     listing: IListing
}

export const ListingCardVertical:React.FC<IListingCard> = ({listing}) => {
     const locale = useLocale() as TLocale;
     const t = useTranslations('common');
     const messages = t.raw('listing');
     const router = useRouter();
     const viewListing = () => {
          return router.push(`/listing/${listing.id}`)
     }
     const rentListing = () => {
          return router.push(`/listing/rent/${listing.id}`)
     }
     return (
          <div className="aspect-[100/100] border-[1.3px] rounded-[5px] gap-[5px] p-[5px] flex flex-col items-center justify-start overflow-hidden " >
               <div className="w-full h-full flex cursor-pointer" onClick={viewListing}>
                    <ImageSlider rounded="5px" images={[listing.features.mainImage, ...(listing.features.otherImages)]} />
               </div>
               <div className="w-full flex flex-col gap-[2px]">
                    <h3 className="text-[0.9rem] text-main-primary font-bold my-0 leading-5 ">{listing.name[locale]}</h3>
                    <p className="text-[0.75rem] font-medium text-gray-500  ">{messages.addedDate} {getDate(listing.createdAt)}</p>
               </div>
               <div className="w-full flex items-center justify-start gap-[5px] flex-wrap">
                    {listing.features.categoryValues.map((feature, index) => <span className="text-[0.75rem] text-gray-500" key={`card-listing-feature-${listing.id}-${index}`} >{feature.name[locale]}: {feature.value}</span>) }
               </div>
               <div className="w-full px-[5px] grid grid-cols-2 gap-[10px]">
                    <button className="border-[1.3px] border-main-bright-blue rounded-[5px] text-[0.8rem] py-[5px] text-main-bright-blue hover:bg-blue-50" onClick={viewListing}>{messages.viewBtn}</button>
                    <button className="border-[1.3px] bg-main-bright-blue rounded-[5px] text-[0.8rem] py-[5px] text-white hover:bg-main-bright-blue " onClick={rentListing}>{messages.rentBtn}</button>
               </div>
          </div>
     )
}