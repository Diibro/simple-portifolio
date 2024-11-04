'use client';

import { IListing } from "@/common/Interfaces";
import { SampleListings } from "@/data/SampleListings";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import ListingsContainer from "../listing/ListingContainer";
import { useMessages } from "@/context/MessagesContext";
const heroSectionImage = "/images/hero-image-1.jpg";



export const HomeHeroSection:React.FC = () => {
     const {pages} = useMessages().messages;
     const {homePage} = pages;
     const messages = homePage.heroSection;
     const inlineStyles = {
          backgroundImage: `url('${heroSectionImage}')`
     }

     return (
          <section 
               className="w-full bg-center bg-cover bg-no-repeat mx-auto my-[10px] rounded-[5px] overflow-hidden" 
               style={inlineStyles}>
               <div className="w-full aspect-[100/50] md:aspect-[100/30] lg:aspect-[100/25] 2xl:aspect-[100/20]  px-[5%] md:px-[10%] bg-[#00000095] flex flex-col gap-[10px] items-center justify-center ">
                    <h3 className="text-main-blue-50 font-extrabold text-center text-[1.4rem] md:text-[1.8rem] md:w-[60%] group ">{messages.heroMessage}</h3>
                    {/* <p className="text-orange-400  ">{messages.heroMessageSlogan}</p> */}
                    <div className="w-[80%] md:w-[60%] lg:w-[50%] overflow-hidden bg-gray-500 flex items-center justify-between rounded-[30px] p-[5px] ">
                         <label className="hidden" htmlFor="hero-section-search-input">Search:</label>
                         <input type="search" name="hero-search-input" id="hero-section-search-input" className="w-full bg-gray-500 outline-none border-none py-[5px] px-[15px] rounded-[30px] focus:bg-main-gray-400 focus:mr-[5px] " />
                         <i className="text-white bg-main-orange-600 hover:text-main-orange-600  border-main-orange-600 p-[10px] hover:bg-transparent border-[1.4px]  rounded-full text-[0.8rem] font-medium  cursor-pointer "><FaSearch/></i>
                    </div>
               </div>
          </section>
     )
}

export const HomeCurrentListingsSection = () => {
     const [listings, setListings] = useState<Array<IListing>>(SampleListings);
     const {pages} = useMessages().messages;
     const {homePage} = pages;
     const messages = homePage.currentListingsSection;
     useEffect(() => {
          setListings(SampleListings);
     }, [])
     return (
          <section className="w-full bg-center bg-cover bg-no-repeat mx-auto my-[10px] rounded-[10px] overflow-hidden ">
               <div className="w-full ">
                    <h3 className="text-[1.4rem] font-bold text-main-primary  ">{messages.title}</h3>
               </div>
               {/* <div className="w-full flex items-start flex-wrap gap-[10px]">
                    {listings ? 
                         listings.map((listing,index) => <ListingCardVertical key={`home-current-listing-${index}`} listing={listing} /> )
                    : <p>{messages.noData}</p>}
               </div> */}
               <ListingsContainer listings={listings} id="home-page-listings-section" />
          </section>
     )
}

export const HomeBreakSectionOne = () => {
     const {pages} = useMessages().messages;
     const {homePage} = pages;
     const messages = homePage.breakSectionOne;
     const inlineStyles = {
          backgroundImage: `url('${heroSectionImage}')`
     }
     return(
          <section className="w-full bg-center bg-cover bg-no-repeat mx-auto my-[10px] rounded-[5px] overflow-hidden " style={inlineStyles}>
               <div className="w-full aspect-[100/45] md:aspect-[100/30] lg:aspect-[100/25]  px-[5%] md:px-[10%] bg-[#00000090] flex flex-col gap-[10px] items-center justify-center ">
                    <h3 className="text-[1.1rem] text-white font-bold">{messages.title}</h3>
                    <p className="text-[0.9rem] text-white font-semibold " >{messages.message}</p>
               </div>
     </section>
     )
}