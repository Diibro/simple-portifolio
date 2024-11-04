'use client';
import { ENotificationType } from "@/common/CommonTypes";
import { CUser } from "@/common/Entities";
import { ICategory,IFileUploader, IListing, IListingFeature, ILocaleValues, IUser } from "@/common/Interfaces";
import FileUploader from "@/components/FileUploader";
import ListingsContainer from "@/components/listing/ListingContainer";
import { useAppData } from "@/context/AppContext";
import { useMessages } from "@/context/MessagesContext";
import { useUser } from "@/context/UserContext";
import Endpoints from "@/services/Endpoints";
import { ClientServer } from "@/services/Server";
import { showMainNotification } from "@/util/NotificationFuncs";
import Image from "next/image";
import { useEffect, useState } from "react";




const Page = () => {
     const {user} = useUser();
     const [vehicles,setVehicles] = useState<Array<IListing>>([]);
     const fetchListings = async () => {
          const res = await ClientServer.get(`${Endpoints.listing}?sellerId=${user?.id}`)
          if(res && res.length && Array.isArray(res)){
               setVehicles(res);
          }
     }
     useEffect(() => {
          console.log(user);
          (async () => await fetchListings())();
     },[])
     return (
          <>
               <HeroSection />
               <MyVehiclesSection vehicles={vehicles} />
          </>
     )
}

const HeroSection = () => {
     const {user} = useUser();
     const [showForm, setShowForm] = useState(false);
     const [userListings,setUserListings] = useState<Array<IListing>>([]);

     const showAddForm = () => {
          if(user?.status === 'verified'){
               setShowForm(!showForm);
          }else {
               showMainNotification("Must be verified to upload vehicles", ENotificationType.WARNING);
               setShowForm(!showForm);
          }
     }

     const updateUserListings = (vehicle: IListing  | null) => {
          if(vehicle) {
               setUserListings(prev => ([vehicle,...prev]));
               console.log(userListings)
          }
     }
     return (
          <div className="w-full lg:w-[90%]  flex justify-between items-center flex-wrap">
               <div className="w-auto max-w-[60%] ">
                    <h3 className="text-[1.4rem] font-bold text-main-text ">Welcome to seller Portal</h3>
                    <p className="text-[0.9rem] text-gray-600 " >
                         {
                         `${user?.status === 'pending' 
                         ? "Once your account is verified, you will be able to upload your vehicles. " 
                         : "Click the add button to upload your vehicle" }`
                         }
                    </p>
               </div>
               <div className="w-auto md:w-[30%] flex flex-col items-center gap-[5px] p-[20px] rounded-[10px] shadow-md ">
                    <p className="text-[0.9rem] text-gray-500 ">
                         Status: {
                         user?.status === "pending" 
                         ? <span className="text-orange-600 ">Pending</span>
                         : user?.status === "verified"
                         ? <span className="text-green-600">Verified</span>
                         : <span className="text-red-600">Rejected</span>

                    }
                    </p>
                    <button  onClick={showAddForm} className={`${user?.status === 'verified' ? 'bg-blue-600' : "bg-gray-500" }  text-white rounded-[5px] px-[10px] py-[7.5px] text-[0.8rem]`} >{!showForm ?"Add Vehicle" : "Cancel"}</button>
               </div>
               {showForm && <AddVehicleForm user={user} cb={(res) => {
                    updateUserListings(res);
                    showAddForm();
               } } />}
          </div>
     )
}

const MyVehiclesSection = ({vehicles} :{vehicles: Array<IListing>}) => {
     return (
          <div className="w-full lg:w-[90%]  flex flex-col gap-[10px] justify-between items-center">
               <h3 className=" w-full text-start text-[1.2rem] font-bold text-main-text">My vehicles</h3>
               {
                    vehicles.length ? 
                         <ListingsContainer id="seller-portal-listings-container" listings={vehicles} />
                    :<p className="text-[0.9rem] text-gray-600  ">No Vehicles found</p>
               }
               
          </div>
     )
}

const AddVehicleForm = ({user, cb}: {user: CUser | null, cb:(vehicle: IListing | null) => void}) => {
     const {user: userData} = useUser();
     const {data} = useAppData();
     const categories = data?.categories;

     const {locale} = useMessages();
     const sampleLocation = {country: "Rwanda", district: "Kigali", sector: "Nyarugenge", Cartien: ""}

     const [name, setName] = useState<ILocaleValues>({en:"", kn:"", fr:""})
     const [uploadOptions,setUploadOptions ] = useState<{content: IFileUploader | undefined, show:boolean}>({content: undefined, show: false});
     const [selectedCategory,setSelectedCategory] = useState<ICategory | undefined>(undefined);
     const [vehicle,setVehicle] = useState<IListing>({
          name: {en: "", kn:"", fr:""},
          image: "",
          features: {mainImage: "", otherImages: [], categoryValues: []},
          owner: userData as IUser,
          location: sampleLocation,
          createdAt: new Date(),
          inspectionDocument: null,
          inStock: true,
          category: selectedCategory || {id: "",name: {en:"", kn: "", fr: ""},features: [], type:{en:"", kn: "", fr: ""}, status: false}
     });
     const [vehicleFeatures,setVehicleFeatures] = useState<Array<IListingFeature>>([]);
     const [loading,setLoading] = useState<boolean>(false);


     const updateCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
          
          if(categories && categories.length){
               // to remove unused cb
               cb(null);
               const selectedId = e.target.value;
               const category: ICategory | undefined = categories.find(cat => cat.id == selectedId);
               if(category) {
                    setSelectedCategory(category);
                    setVehicle(prev => ({...prev, category: category}))
               }else {
                    showMainNotification("please select a category", ENotificationType.WARNING);
                    setSelectedCategory(undefined);
               }
          }else {
               setSelectedCategory(undefined);
          }
     }
     const submitForm = async(e: React.FormEvent) => {
          e.preventDefault();
          try {
               if(!vehicle.features.mainImage){
                    return showMainNotification("Please choose and image for the vehicle", ENotificationType.WARNING);
               }
               const newVehicle: IListing = {
                    ...vehicle,
                    name,
                    features: {
                         ...vehicle.features,
                         categoryValues: vehicleFeatures
                    },
                    user: user as CUser
               }

               const res = await ClientServer.post(newVehicle, Endpoints.listing);
               if(res){
                    showMainNotification("Listing Added successfully", ENotificationType.PASS);
               }else {
                    showMainNotification("Error adding listing", ENotificationType.FAIL);
               }
          } catch (error) {
               console.log(error);
          }finally{
               setLoading(false);
          }
     }

     const updateVehicleFeatures = (feature: IListingFeature) => {
          setVehicleFeatures(prevFeatures => {
               const updateFeatures = [...prevFeatures];
               const existingFeatureIndex = prevFeatures.findIndex(f => f.name["en"] === feature.name["en"])
               if(existingFeatureIndex !== -1){
                    updateFeatures[existingFeatureIndex].value = feature.value;
               }else {
                    updateFeatures.push(feature);
               }
               return updateFeatures;
          })
     }

     return (
          <div className="w-full border border-blue-300 rounded-[10px] p-[10px] my-[20px] relative ">
               {loading && <p className="absolute top-[10px] right-[10px] text-orange-500 text-[0.9rem] font-semibold">Adding Vehicle...</p>}
               <p className="text-[0.9rem] text-gray-600  ">Fill the vehicle information in the form below:</p>
               <form onSubmit={submitForm} className="w-full flex flex-col gap-[5px]">
                    <div className=" w-full p-[5px] flex flex-col items-start justify-start gap-[5px]">
                         <h4 className="text-[0.9rem] font-semibold text-main-primary">Vehicle Name:</h4>
                         <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[5px] ">
                              <div className=" w-full flex flex-col gap-[2px]">
                                   <label htmlFor="en-name-input" className="text-gray-600 text-[0.8rem] ">English Name:</label>
                                   <input required type="text" name="en-name-input" id="en-name-input" onChange={(e) => setName(prev => ({...prev, en: e.target.value}))} className="w-full border-gray-200 border-[1.3px] bg-gray-100 rounded-[5px] outline-none p-[5px]" />
                              </div>
                              <div className=" w-full flex flex-col gap-[2px]">
                                   <label htmlFor="kn-name-input" className="text-gray-600 text-[0.8rem] ">Kinyarwanda Name:</label>
                                   <input type="text" name="kn-name-input" id="kn-name-input" onChange={(e) => setName(prev => ({...prev, kn: e.target.value}))} className="w-full border-gray-200 border-[1.3px] bg-gray-100 rounded-[5px] outline-none p-[5px]" />
                              </div>
                              <div className=" w-full flex flex-col gap-[2px]">
                                   <label htmlFor="fr-name-input" className="text-gray-600 text-[0.8rem] ">French Name:</label>
                                   <input type="text" name="fr-name-input" id="fr-name-input" onChange={(e) => setName(prev => ({...prev, fr: e.target.value}))} className="w-full border-gray-200 border-[1.3px] bg-gray-100 rounded-[5px] outline-none p-[5px]" />
                              </div>
                         </div>
                    </div>
                    <div>
                         <h4 className="text-[0.9rem] font-semibold text-main-primary">Category:</h4>
                         <div className=" w-full flex flex-col gap-[2px]">
                              <label htmlFor="vehicle-category-select" className="text-gray-600 text-[0.8rem] ">Select Category:</label>
                              <select onChange={updateCategory} name="vehicle-category-select" id="vehicle-category-select" className="w-full border-gray-200 border-[1.3px] bg-gray-100 rounded-[5px] outline-none p-[5px] text-[0.8rem] cursor-pointer" >
                                   <option value="">Select...</option>
                                   {
                                        categories && categories.map((category:ICategory, index:number) =>
                                             category.status &&
                                             <option 
                                                  value={category.id}
                                                  key={`vehicle-category-select-option-${index}`} >{category.name[locale]} -- {category.type[locale]}</option>
                                   )
                                   }
                              </select>
                         </div>
                    </div>
                    {
                         selectedCategory && 
                         <div className="w-full p-[5px] flex flex-col items-start justify-start gap-[5px]">
                              <h4 className="text-[0.9rem] font-semibold text-main-primary">Vehicle Features:</h4>
                              <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-[5px]">
                                   {
                                        selectedCategory.features.map((feature, index) => 
                                             <div key={`${feature.name[locale]}-${index}`} className="w-full flex flex-col gap-[2px]" >
                                                  <label htmlFor={`${feature.name[locale]}-${index}`} className="text-gray-600 text-[0.8rem] ">{feature.name[locale]}</label>
                                                  {
                                                       feature.type === 'textarea' ?
                                                       <textarea className="w-full border-gray-200 border-[1.3px] bg-gray-100 rounded-[5px] outline-none p-[5px]" onChange={(e) => updateVehicleFeatures({...feature, value: e.target.value})} cols={8} rows={5} name={`${feature.name[locale]}-${index}`} id={`${feature.name[locale]}-${index}`}></textarea>
                                                       :feature.type === 'select' ?
                                                       <select className="w-full border-gray-200 border-[1.3px] bg-gray-100 rounded-[5px] outline-none p-[5px] text-[0.8rem] cursor-pointer" onChange={(e) => updateVehicleFeatures({...feature, value: e.target.value})} name={`${feature.name[locale]}-${index}`} id={`${feature.name[locale]}-${index}`} ></select>
                                                       :feature.type === 'htmlValue' ? null
                                                       :feature.type === "number" ?
                                                       <input className="w-full border-gray-200 border-[1.3px] bg-gray-100 rounded-[5px] outline-none p-[5px]" onChange={(e) => updateVehicleFeatures({...feature, value: e.target.value})} type="text" inputMode="numeric" name={`${feature.name[locale]}-${index}`} id={`${feature.name[locale]}-${index}`} />
                                                       :feature.type === 'file' ?
                                                       <input className="w-full border-gray-200 border-[1.3px] bg-gray-100 rounded-[5px] outline-none p-[5px]" onChange={(e) => updateVehicleFeatures({...feature, value: e.target.value})} type="file" name={`${feature.name[locale]}-${index}`} id={`${feature.name[locale]}-${index}`} accept={feature.fileType} />
                                                       : <input className="w-full border-gray-200 border-[1.3px] bg-gray-100 rounded-[5px] outline-none p-[5px]" onChange={(e) => updateVehicleFeatures({...feature, value: e.target.value})} name={`${feature.name[locale]}-${index}`} id={`${feature.name[locale]}-${index}`} type={feature.type || 'text'} required={feature.required} />
                                                  }
                                             </div>
                                        )
                                   }
                              </div>
                         </div>
                    }
                    <div className=" w-full p-[5px] flex flex-col items-start justify-start gap-[5px]">
                         <h4 className="text-[0.9rem] font-semibold text-main-primary">Location:</h4>
                         <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[5px]">
                              <div className=" w-full flex flex-col gap-[2px]">
                                   <label htmlFor="country-input" className="text-gray-600 text-[0.8rem] ">Country:</label>
                                   <input required type="text" name="country-input" id="country-input" onChange={(e) => setVehicle(prev => ({...prev, location: {...(prev.location || sampleLocation), country: e.target.value}}))} className="w-full border-gray-200 border-[1.3px] bg-gray-100 rounded-[5px] outline-none p-[5px]" />
                              </div>
                              <div className=" w-full flex flex-col gap-[2px]">
                                   <label htmlFor="district-input" className="text-gray-600 text-[0.8rem] ">District:</label>
                                   <input required type="text" name="district-input" id="district-input" onChange={(e) => setVehicle(prev => ({...prev, location: {...(prev.location || sampleLocation), district: e.target.value}}))} className="w-full border-gray-200 border-[1.3px] bg-gray-100 rounded-[5px] outline-none p-[5px]" />
                              </div>
                              <div className=" w-full flex flex-col gap-[2px]">
                                   <label htmlFor="sector-input" className="text-gray-600 text-[0.8rem] ">Sector:</label>
                                   <input required type="text" name="sector-input" id="sector-input" onChange={(e) => setVehicle(prev => ({...prev, location: {...(prev.location || sampleLocation), sector: e.target.value}}))} className="w-full border-gray-200 border-[1.3px] bg-gray-100 rounded-[5px] outline-none p-[5px]" />
                              </div>
                              <div className=" w-full flex flex-col gap-[2px]">
                                   <label htmlFor="cartien-input" className="text-gray-600 text-[0.8rem] ">Common Place(Cartien):</label>
                                   <input required type="text" name="cartien-input" id="cartien-input" onChange={(e) => setVehicle(prev => ({...prev, location: {...(prev.location || sampleLocation), Cartien: e.target.value}}))} className="w-full border-gray-200 border-[1.3px] bg-gray-100 rounded-[5px] outline-none p-[5px]" />
                              </div>
                         </div>
                    </div>
                    
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-[5px] ">
                         <div className=" w-full p-[5px] flex flex-col items-start justify-start gap-[5px]">
                              <h4 className="text-[0.9rem] font-semibold text-main-primary">Vehicle Image:</h4>
                              <div className="w-full border-gray-200 border-[1.3px] bg-gray-100 rounded-[5px] outline-none p-[5px] flex flex-row items-start justify-start gap-[10px]">
                                   <button 
                                        type="button" 
                                        className="px-[15px] py-[5px] text-[0.8rem] bg-slate-500 text-slate-50 rounded-[5px] hover:bg-slate-700 "
                                        onClick={() => setUploadOptions({content: {
                                                  title: "Upload Category Icon", 
                                                  close: () => setUploadOptions({content:undefined, show: false}),
                                                  cb: (res) => setVehicle(prev => ({...prev, image:res, features: {...(prev.features), mainImage:res}})) }, show: true})}
                                   >Choose Image</button>
                                   {vehicle?.features.mainImage && <Image src={vehicle.features.mainImage} width={100} height={100} alt="vehicle-icon"  /> }
                              </div>
                         </div>
                         <div className=" w-full p-[5px] flex flex-col items-start justify-start gap-[5px]">
                              <h4 className="text-[0.9rem] font-semibold text-main-primary">Other Images:</h4>
                              <div className="w-full border-gray-200 border-[1.3px] bg-gray-100 rounded-[5px] outline-none p-[5px] flex flex-row items-start justify-start gap-[10px] flex-wrap">
                                   <button 
                                        type="button" 
                                        className="px-[15px] py-[5px] text-[0.8rem] bg-slate-500 text-slate-50 rounded-[5px] hover:bg-slate-700 "
                                        onClick={() => setUploadOptions({content: {
                                                  title: "Upload Category Icon", 
                                                  multipleFile:true,
                                                  limit: 5,
                                                  close: () => setUploadOptions({content:undefined, show: false}),
                                                  multicb:(res) => setVehicle(prev => ({...prev, features: {...(prev.features), otherImages: res}})),
                                                  cb: (res) => {console.log(res)} }, show: true})}
                                   >Choose Images</button>
                                   {vehicle?.features.otherImages && vehicle.features.otherImages.length > 0 && 
                                        <div className="w-full grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                                             {vehicle.features.otherImages.map((image,index) => <Image width={100} height={100} src={image} alt={`other-image-select-${index}`} key={`other-image-select-${index}`} className="w-full aspect-auto rounded-sm" />)}
                                        </div>
                                   }
                              </div>
                         </div>
                    </div>
                    <div className="w-full p-[5px] flex flex-col items-start justify-start gap-[5px]">
                         <button disabled={loading} type="submit" className="px-[30px] py-[7.5px] bg-main-secondary text-white rounded-[10px] text-[0.9rem] border-[1.3px] border-main-secondary hover:bg-white hover:text-main-secondary transition-all duration-150 ">Save Vehicle</button>
                    </div>
                    {
                         uploadOptions?.show && uploadOptions.content ? 
                              <FileUploader content={uploadOptions.content} />
                         :null
                    }
               </form>
               {loading && <p className="absolute bottom-[10px] right-[10px] text-orange-500 text-[0.9rem] font-semibold">Adding Vehicle...</p>}
          </div>
     )
}

export default Page;