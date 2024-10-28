'use client'

import { ENotificationType, TLocale } from "@/common/CommonTypes";
import { CCategory } from "@/common/Entities";
import { ICategory, ICategoryFeature, IFileUploader, ILocaleValues } from "@/common/Interfaces";
import FileUploader from "@/components/FileUploader";
import MyImage from "@/components/Images/MyImage";
import Endpoints from "@/services/Endpoints";
import { ClientServer } from "@/services/Server";
import { useLocale } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import appData from '@/data/data.json';
import { showMainNotification } from "@/util/NotificationFuncs";

interface ICategoryRow {
     category: CCategory
}

interface ICategoryFeatureRow {
     feature: ICategoryFeature
}

const Page = () => {
     const [categories,setCategories] = useState<Array<CCategory>>([]);
     const [showAddForm,setShowAddForm] = useState<boolean>(false);

     const fetchData = async () => {
          const res = await ClientServer.get(Endpoints.category);
          if(res && Array.isArray(res)) {
               setCategories(res);
          }
     }
     

     useEffect(() => {
          (async () => await fetchData())();
     },[])
     // const isLargerThanTablet = useMediaQuery({query: '(min-width: 992px)' });
     return (
          <div className="w-full flex flex-col items-center justify-start" >
               <div className="w-full flex flex-row justify-between items-center py-[10px] px-[20px] ">
                    <h2 className="text-[1.8rem] font-extrabold text-main-text ">Categories</h2>
                    {!showAddForm ? <button onClick={() => setShowAddForm(true)} className="px-[30px] py-[7.5px] bg-main-secondary text-white rounded-[10px] text-[0.9rem] border-[1.3px] border-main-secondary hover:bg-white hover:text-main-secondary transition-all duration-150 ">Add Category</button> : null}
               </div>
               <div className="w-full flex flex-row flex-wrap items-start justify-center gap-[10px] my-[10px]  ">
                    {
                         showAddForm ?
                         <div className=" w-full md:w-[40%] lg:w-[35%] p-[10px] rounded-[10px] border-slate-300 border-[1.4px] ">
                              <div className="w-full flex flex-row items-center justify-center p-[5px]"><i onClick={() => setShowAddForm(false)} className="text-main-secondary text-[24px] cursor-pointer"><RxCross2 /></i></div>
                              <AddCategoryForm cb={(cat) => setCategories(prev => ([...prev, cat])) } />
                         </div> :
                         null
                    }
                    <div className="w-full md:w-[55%] lg:w-[60%] flex flex-col items-start gap-[5px] flex-1 bg-gray-100 p-[10px] rounded-[10px] ">
                         <h4 className="w-full text-gray-500 text-[1.2rem] font-bold">Category List</h4>
                         {
                              categories && categories.length ? 
                                   categories.map((category, index) => <CategoryRow key={`dashboard-cat-row-${index}`} category={category} /> )
                              : <p className="text-[0.9rem] text-gray-400 font-semibold ">No Categories found</p>
                         }
                    </div>
                    
               </div>
               
          </div>
     )
}


const CategoryRow:React.FC<ICategoryRow> = ({category}) => {
     const locale = useLocale() as TLocale;

     const toggleStatus = async () => {
          const updateCategory: ICategory = {
               ...category,
               status: !category.status
          }

          const res = await ClientServer.patch(updateCategory, `${Endpoints.category}/${category.id}`);
          if(res) {
               showMainNotification("Updated Category Status updated!!", ENotificationType.PASS);
          }else {
               showMainNotification("Updated Category Status updated!!", ENotificationType.FAIL);
          }
     }
     return (  
          <div className="w-full bg-white flex flex-row items-center justify-between flex-wrap border-[1px] border-slate-100 py-[5px] px-[10px] rounded-[10px] ">
               <div className="w-[50px] h-[50px] rounded-[5px] overflow-hidden"><MyImage image={category.icon}  /></div>
               <h4 className="text-main-primary text-[1.2rem] font-bold">{category.name[locale || 'en']}</h4>
               {
                    category.status ? <p className="text-[0.9rem] text-green-700 text-main-hightlight font-bold ">Active</p> : <p className="text-[0.9rem] font-bold text-main-warningError  ">Inactive</p>
               }
               <button className="px-[15px] py-[5px] bg-white text-main-secondary rounded-[10px] text-[0.8rem] border-[1.3px] border-main-secondary hover:text-main-secondary hover:bg-slate-100 transition-all duration-150 " onClick={toggleStatus} >{category.status ? "Inactivate" : "Activate"}</button>
               <button className="px-[15px] py-[5px] bg-red-600 text-white rounded-[10px] text-[0.8rem] border-[1.3px] border-red-600  hover:bg-red-500 transition-all duration-150 " onClick={toggleStatus} >Delete</button>
          </div>
     )
}

const CategoryFeatureRow: React.FC<ICategoryFeatureRow> = ({feature}) =>{
     return (
          <div className="w-full flex flex-row items-start justify-start flex-wrap gap-[5px] border-[1.3px] border-slate-400 p-[5px] rounded-[5px]  ">
               <div className="w-full flex flex-row justify-start gap-[5px]  ">
                    <h5 className="text-[0.8rem] font-bold text-main-primary  ">Name:</h5>
                    {
                         Object.entries(feature.name).map(([key, value], index) => 
                              <span key={`category-feature-name-locale-${index}`} className="text-[0.7rem] text-main-primary ">
                                   {key}: <b>{value}</b>
                              </span>
                         )
                    }
               </div>
               <span className="w-auto  text-[0.7rem] text-main-primary " >
                    Type: <b>{feature.type}</b>
               </span>
               <span className="w-auto text-[0.7rem] text-main-primary">
                    Required: <b>{feature.required ? "yes" : "no"}</b>
               </span>
               <span className="w-auto text-[0.7rem] text-main-primary">
                    Visible On Card: <b>{feature.displayOnCard ? "yes" : "no"}</b>
               </span>
               <span className="w-auto text-[0.7rem] text-main-primary">
                    Rank: <b>{feature.rank}</b>
               </span>
               
               {/* <span className="w-auto"></span>
               <span className="w-auto"></span>
               <span className="w-auto"></span> */}
          </div>
     )
}

interface IAddCategoryForm {
     cb?: (res: CCategory) => unknown
}

const AddCategoryForm:React.FC<IAddCategoryForm> = ({cb}) => {
     const sampleFeature:ICategoryFeature = {
          name: {en:"", kn: "",fr: ""},
          type: "",
          required: false,
          displayOnCard: false,
          rank: 0,
     } 
     const [category, setCategory] = useState<ICategory>();
     const [categoryType, setCategoryType] = useState<ILocaleValues>({en: "", kn: "", fr: ""});
     const [features,setFeatures] = useState<Array<ICategoryFeature>>([]);
     const [feature, setFeature] = useState<ICategoryFeature>(sampleFeature);
     const [name, setName] = useState<ILocaleValues>();
     const [icon, setIcon] = useState<string>();
     const [uploadOptions,setUploadOptions ] = useState<{content: IFileUploader | undefined, show:boolean}>({content: undefined, show: false});

     const addFeature = () => {
          if(feature && feature.name.en )
          setFeatures((prevFeatures) => {
               const existingFeatureIndex = prevFeatures.findIndex(f => f.name.en === feature.name.en);
          
               if (existingFeatureIndex !== -1) {
                    const updatedFeatures = [...prevFeatures];
                    updatedFeatures[existingFeatureIndex] = feature;
                    return updatedFeatures;
               } else {
               return [...prevFeatures, feature];
          }
     });
     
          setFeature(sampleFeature);
     };

     const setNewCategoryType = (e: React.ChangeEvent<HTMLSelectElement>) => {
          const newType: ILocaleValues = appData.categoryTypes.filter(type => type.name.en ===e.target.value)[0] as ILocaleValues;
          setCategoryType(newType);
     }

     const saveCategory = async(e:React.FormEvent) => {
          e.preventDefault();
          if(name?.en && features.length && icon){
               setCategory({
                    name:name,
                    icon,
                    features,
                    type: categoryType,
                    status: true,
                    inspectionTraits: ""
               })
          }

          const res:CCategory = await ClientServer.post(category, Endpoints.category);
          if(res && cb) {
               showMainNotification("Added Category successfully", ENotificationType.PASS);
               cb(res);
          }
     } 
     return (
          <div className="w-full flex flex-col items-start gap-[5px]">
               <h4 className="w-full text-slate-50 bg-main-primary p-[10px] rounded-[10px] font-bold text-[0.9rem] ">Add New Category</h4>
               <form className={`w-full flex flex-col gap-[5px] `} onSubmit={saveCategory} >
                    <div className=" w-full p-[5px] flex flex-col items-start justify-start gap-[5px]">
                         <h4 className="text-[0.9rem] font-semibold text-main-primary">Name:</h4>
                         <div className=" w-full flex flex-col gap-[2px]">
                              <label htmlFor="en-name-input" className="text-gray-600 text-[0.8rem] ">English Name:</label>
                              <input type="text" name="en-name-input" id="en-name-input" onChange={(e) => setName(prev => ({...prev, en: e.target.value}))} className="w-full border-gray-200 border-[1.3px] bg-gray-100 rounded-[5px] outline-none p-[5px]" />
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
                    <div className="w-full p-[5px] flex flex-col items-start justify-start gap-[5px]">
                         <label htmlFor="category-type-selection" className="text-[0.9rem] font-semibold text-main-primary">Category Type:</label>
                         <select name="category-type-selection" id="category-type-selection" className="w-full border-gray-200 border-[1.3px] bg-gray-100 rounded-[5px] outline-none p-[5px] text-[0.8rem] cursor-pointer" onChange={setNewCategoryType}>
                              <option value="">select category type...</option>
                              {appData.categoryTypes && appData.categoryTypes.length && appData.categoryTypes.map(
                                   (type,index) => <option value={type.name.en} key={`category-type-select-${index}`}>
                                        {`${type.name.en}, ${type.name.fr}, ${type.name.kn}`}
                                   </option> 
                              )}
                         </select>
                    </div>
                    <div className=" w-full p-[5px] flex flex-col items-start justify-start gap-[5px]">
                         <label htmlFor="category-icon" className="text-[0.9rem] font-semibold text-main-primary">Icon:</label>
                         {/* <input type="file" name="category-icon" id="category-icon" className="w-full border-gray-200 border-[1.3px] bg-gray-100 rounded-[5px] outline-none p-[5px]" /> */}
                         <div className="w-full border-gray-200 border-[1.3px] bg-gray-100 rounded-[5px] outline-none p-[5px] flex flex-row items-start justify-start gap-[10px]">
                              <button 
                                   type="button" 
                                   className="px-[15px] py-[5px] text-[0.8rem] bg-slate-500 text-slate-50 rounded-[5px] hover:bg-slate-700 "
                                   onClick={() => setUploadOptions({content: {
                                             title: "Upload Category Icon", 
                                             close: () => setUploadOptions({content:undefined, show: false}),
                                             cb: (res) => setIcon(res) }, show: true})}
                              >Choose Icon</button>
                              {icon ? <Image src={icon} width={100} height={100} alt="category-icon"  /> : null}
                         </div>
                    </div>
                    <div className=" w-full p-[5px] flex flex-col items-start justify-start gap-[5px] border-[1.2px] border-slate-400 rounded-[5px]">
                         <h4 className="text-[0.9rem] font-semibold text-main-primary">Features:</h4>
                         <div className="w-full flex flex-row flex-wrap justify-between gap-[4px]">
                              <div className="w-full flex flex-row flex-wrap items-start justify-between gap-[2px]">
                                   <h5 className="text-main-text text-[0.8rem] font-medium w-full">Feature Name:</h5>
                                   <div className=" w-[48%] flex flex-col gap-[2px]">
                                        <label htmlFor="en-category-feature-input" className="text-gray-600 text-[0.8rem] ">English:</label>
                                        <input type="text" name="kn-name-input" id="en-category-feature-input" required className="w-full border-gray-200 border-[1.3px] bg-gray-100 rounded-[5px] outline-none p-[4px] text-[0.75rem]" onChange={(e) => setFeature((prev) => ({...prev, name: {...(prev?.name || {}), en: e.target.value}}))} />
                                   </div>
                                   <div className=" w-[48%] flex flex-col gap-[2px]">
                                        <label htmlFor="kn-category-feature-input" className="text-gray-600 text-[0.8rem] ">Kinyarwanda:</label>
                                        <input type="text" name="kn-name-input" id="kn-category-feature-input" required className="w-full border-gray-200 border-[1.3px] bg-gray-100 rounded-[5px] outline-none p-[4px] text-[0.75rem]" onChange={(e) => setFeature(prev => ({...prev, name: {...(prev.name), kn: e.target.value}}))} />
                                   </div>
                                   <div className=" w-full flex flex-col gap-[2px]">
                                        <label htmlFor="fr-category-feature-input" className="text-gray-600 text-[0.8rem] ">French:</label>
                                        <input type="text" name="fr-name-input" id="fr-category-feature-input" required className="w-full border-gray-200 border-[1.3px] bg-gray-100 rounded-[5px] outline-none p-[4px] text-[0.75rem]" onChange={(e) => setFeature((prev) => ({...prev, name: {...(prev?.name || {}), fr: e.target.value}}))} />
                                   </div>
                              </div>
                              <div className="w-auto flex flex-row gap-[4px] justify-start ">
                                   <label htmlFor="category-feature-require" className="text-gray-600 text-[0.8rem] ">Required:</label>
                                   <input type="checkbox" name="category-feature-require" id="category-feature-require" onChange={(e) => setFeature((prev) => ({...prev, required: e.target.checked }))} />
                              </div>
                              <div className=" w-auto flex flex-row gap-[4px] justify-start " >
                                   <label htmlFor="category-feature-display" className="text-gray-600 text-[0.8rem] ">Display On Card:</label>
                                   <input type="checkbox" name="category-feature-display" id="category-feature-display" onChange={(e) => setFeature(prev => ({...prev, displayOnCard: e.target.checked}))} />
                              </div>
                              <div className="w-auto flex flex-row gap-[4px] justify-start" >
                                   <label htmlFor="category-feature-rank" className="text-gray-600 text-[0.8rem] ">Rank:</label>
                                   <input type="text" inputMode="numeric" name="category-feature-rank" className="w-[60px] border-gray-200 border-[1.3px] bg-gray-100 rounded-[5px] outline-none p-[2px] text-[0.75rem]" id="category-feature-rank" onChange={(e) => setFeature(prev => ({...prev, rank: +(e.target.value)}))} />
                              </div>
                              <div className=" w-full flex flex-col gap-[2px]">
                                   <label htmlFor="Category-feature-type" className="text-gray-600 text-[0.8rem] ">Type:</label>
                                   <select  name="Category-feature-type" id="Category-feature-type" onChange={(e) => setFeature(prev => ({...prev, type: e.target.value}))} className="w-full border-gray-200 border-[1.3px] bg-gray-100 rounded-[5px] outline-none p-[5px] text-[0.8rem] cursor-pointer" >
                                        <option value="">Select type...</option>
                                        <option value="file">File</option>
                                        <option value="text">Text</option>
                                        <option value="textarea">Large Text</option>
                                        <option value="number">Number</option>
                                        <option value="checkbox">Checkbox</option>
                                        <option value="select">Dropdown</option>
                                        <option value="date">Date</option>
                                        <option value="htmlValue">Detailed Description</option>
                                   </select>
                              </div>
                         </div>
                         {
                              feature.type === 'select' ? 
                              <div className=" w-full flex flex-col gap-[2px]">
                                   <label htmlFor="fr-category-feature-input" className="text-gray-600 text-[0.8rem] ">Values (,):</label>
                                   <input type="text" name="fr-name-input" id="fr-category-feature-input" className="w-full border-gray-200 border-[1.3px] bg-gray-100 rounded-[5px] outline-none p-[4px] text-[0.75rem]" onChange={(e) => setFeature((prev) => ({...prev, dropValues:e.target.value }))} />
                              </div>
                              :null
                         }
                         {
                              feature.type === 'file' ? 
                              <select  name="Category-feature-type" id="Category-feature-type" onChange={(e) => setFeature(prev => ({...prev, type: e.target.value}))} className="w-full border-gray-200 border-[1.3px] bg-gray-100 rounded-[5px] outline-none p-[5px] text-[0.8rem] cursor-pointer" >
                                   <option value="">Select allowed files...</option>
                                   <option value="image/*">Image</option>
                                   <option value=".pdf,.doc,.docx,.xls,.xlsx,.txt,.odt">Document</option>
                              </select>
                              :null
                         }
                         <div className="w-full border-gray-200 border-[1.3px] bg-gray-100 rounded-[5px] outline-none p-[5px] flex flex-row items-start justify-start gap-[10px]">
                              <button 
                                   type="button" 
                                   className="px-[15px] py-[5px] text-[0.75rem] bg-slate-500 text-slate-50 rounded-[5px] hover:bg-slate-700 "
                                   onClick={addFeature}
                                   >Add New Feature</button>
                         </div>
                         {
                              features && features.length ? 
                                   <div className="w-full flex flex-col items-center justify-start gap-[5px] " >
                                        {
                                             features.map((feature, index) => 
                                                  <CategoryFeatureRow feature={feature} key={`category-dashboard-feature-${index}`} />
                                             )
                                        }
                                   </div>
                              :null
                         }
                    </div>
                    <div className="w-full p-[5px] flex flex-col items-start justify-start gap-[5px]">
                         <button type="submit" className="px-[30px] py-[7.5px] bg-main-secondary text-white rounded-[10px] text-[0.9rem] border-[1.3px] border-main-secondary hover:bg-white hover:text-main-secondary transition-all duration-150 ">Save Category</button>
                    </div>
               </form>

               {
                    uploadOptions?.show && uploadOptions.content ? 
                         <FileUploader content={uploadOptions.content} />
                    :null
               }
          </div>
     )
}

export default Page;