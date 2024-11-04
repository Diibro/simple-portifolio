'use client';

import { ENotificationType } from "@/common/CommonTypes";
import { IFileUploader } from "@/common/Interfaces";
import { useMessages } from "@/context/MessagesContext";
import Endpoints from "@/services/Endpoints";
import { ClientServer } from "@/services/Server";
import { showMainNotification } from "@/util/NotificationFuncs";
import Image from "next/image";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";

interface iFileUploaderInterface {
     content: IFileUploader
}


const FileUploader: React.FC<iFileUploaderInterface> = ({content}) => {
     const data = useMessages().messages;
     const {uploadMessages} = data.common;
     const [imageFile, setImageFile] = useState<Blob>();
     const [imageFiles, setImageFiles] = useState<Array<Blob>>([]);
     // const [uploadProgress, setUploadProgress] = useState(0);
     // const [isUploading, setIsUploading] = useState(false);

     const chooseImage = () => {
          const ele = document.getElementById('image-upload-input') as HTMLInputElement ;
          ele.click();
     }

     const uploadFile = async () => {
          if(imageFile){
               showMainNotification('Uploading image...', ENotificationType.WARNING);
               const formData = new FormData();
               formData.append('file', imageFile);
               const res = await ClientServer.post(formData, `${Endpoints.uploadSingle}development`);
               if(res){
                    showMainNotification('Successfully uploaded the file', ENotificationType.PASS);
                    content.cb(res);
               }
               content.close();
          }else{
               showMainNotification("No Image File selected. Try again", ENotificationType.FAIL)
          }
     }

     const uploadFiles = async () => {
          if(imageFiles && imageFiles.length){
               showMainNotification("uploading files", ENotificationType.WARNING);
               const formData = new FormData();
               imageFiles.forEach(file => formData.append('files', file));
               const res = await ClientServer.post(formData, Endpoints.uploadMany);
               if(res) {
                    if(content.multicb)  content.multicb(res);
                    showMainNotification("Uploaded the files successfully", ENotificationType.PASS);
               }else {
                    showMainNotification("Error whle uploading the files", ENotificationType.FAIL);
               }
               content.close();
          }else {
               showMainNotification("No Files Selected. try again.", ENotificationType.FAIL);
          }


     }

     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          if(content.multipleFile){
               if(e.target.files && e.target.files.length > 0){
                    const selectedFiles:Array<Blob> = Array.from(e.target.files);
                    if(content.limit && selectedFiles.length <= content.limit){
                         setImageFiles(selectedFiles);
                    }else {
                         showMainNotification(`Please select not more than ${content.limit} files `, ENotificationType.WARNING)
                    }
               }else {
                    showMainNotification("No files selected", ENotificationType.WARNING);
               }
          }else {
               if (e.target.files && e.target.files.length > 0) {
                    return setImageFile(e.target.files[0]);
               }else {
                    showMainNotification("Please select a file", ENotificationType.WARNING);
               }
          }
          
     }


     return (
          <div className='fixed z-50 top-0 left-0 w-[100vw] h-[100vh] bg-[#ffffff90] flex flex-col items-center justify-center'>
               <i className=' absolute top-[10px] left-[50%] -translate-x-[50%] text-main-warningError cursor-pointer text-[1.8rem] bg-slate-400 rounded-full p-[5px] hover:bg-slate-300 transition-all duration-150' onClick={content.close}><RxCross2 /></i>
               {
                    imageFile ?

                    <div className='w-[90%] h-[80%] bg-slate-400 rounded-[10px] flex flex-col items-center justify-center overflow-hidden gap-[10px]'>
                         <div className='w-[80%] h-[70%] flex flex-col items-center justify-start p-[20px] border-[1.5px] border-slate-500 rounded-[5px] '>
                              <Image width={300} height={400} className='w-auto h-auto max-w-[80%] max-h-[80%]' alt='new image upload' src={URL.createObjectURL(imageFile)} />
                         </div>
                         <div className='w-[80%] p-[10px] rounded-[5px] gap-[20px] border-[1.5px] border-slate-500 flex flex-row items-center justify-start '>
                              <button onClick={!content.multipleFile ? uploadFile : uploadFiles} className='px-[15px] py-[10px] text-[0.8rem] font-bold text-white bg-main-secondary rounded-[5px] ' >{uploadMessages.uploadBtn}</button>
                              <button onClick={() => setImageFile(undefined)} className='px-[15px] py-[10px] text-[0.8rem] font-bold text-white bg-main-secondary rounded-[5px] ' >{uploadMessages.resetBtn}</button>
                         </div>
                    </div>
                    : 
                    imageFiles && imageFiles.length ? 
                         <div className='w-[90%] h-[80%] bg-slate-400 rounded-[10px] flex flex-col items-center justify-center overflow-hidden gap-[10px]'>
                              <div className='w-[80%] h-[70%] grid grid-cols-2 gap-[10px] md:grid-cols-3 lg:grid-cols-3 p-[20px] border-[1.5px] border-slate-500 rounded-[5px] overflow-hidden overflow-y-auto '>
                                   {imageFiles.map((file, index) => <Image key={`selected-file-image-${index}`} className="w-full aspect-auto" width={100} height={100} alt="selected-image" src={URL.createObjectURL(file)} />)}
                              </div>
                              <div className='w-[80%] p-[10px] rounded-[5px] gap-[20px] border-[1.5px] border-slate-500 flex flex-row items-center justify-start '>
                                   <button onClick={!content.multipleFile ? uploadFile : uploadFiles} className='px-[15px] py-[10px] text-[0.8rem] font-bold text-white bg-main-secondary rounded-[5px] ' >{uploadMessages.uploadBtn}</button>
                                   <button onClick={() => setImageFiles([])} className='px-[15px] py-[10px] text-[0.8rem] font-bold text-white bg-main-secondary rounded-[5px] ' >{uploadMessages.resetBtn}</button>
                              </div>
                         </div>
                    :
                    <div className='w-[90%] h-[80%] bg-slate-400 rounded-[10px] flex flex-col items-center justify-center overflow-hidden gap-[10px]'>
                         <label htmlFor="image-upload-input" className='text-[1.5rem] text-slate-500 font-bold ' >{content.title}</label>
                         <input onChange={handleFileChange} type="file" name="" id="image-upload-input" className='hidden' multiple={content.multipleFile} />
                         <button onClick={chooseImage} className=' p-[20px] border-dashed border-[2px] border-slate-500 rounded-[10px] text-[1.1rem] font-bold text-slate-500 hover:border-slate-600 hover:text-slate-600 transition-all duration-150'>{uploadMessages.imageUpload}</button>
                    </div>
               }
               
               
          </div>
     )
}

export default FileUploader