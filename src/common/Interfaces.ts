import { CUser } from "./Entities"

type btnTypes = "reset" | "button" | "submit"
export interface IButton {
     title: string
     dest?: string
     action?: () => unknown
     type?: btnTypes
}

export interface ILink {
     title: string 
     dest?: string

}

export interface INavLink extends ILink {
     subLinks?:Array<ILink>
}


export interface ICategoryFeature {
     name: ILocaleValues
     type:string
     required: boolean
     displayOnCard: boolean
     rank: number
     fileType?: string
     placeholder?: string
     dropValues?: string
}

export interface IListingFeature extends ICategoryFeature {
     value: number | string | boolean
}

export interface ICategory  {
     id?: string,
     name: ILocaleValues,
     icon?: string,
     features: Array<ICategoryFeature>
     type: ILocaleValues
     status: boolean
     inspectionTraits?: unknown
}

export interface IMainCategory {
     name: ILocaleValues
     id?: string,
     icon?: string
     features?: Array<ICategoryFeature>
     inspectionTraits?:unknown
     status?:boolean
}

export interface ICategoryGroup {
     name: ILocaleValues,
     icon: string,
     subs?: Array<ICategory>
}

export interface ILocaleValues {
     en?:string,
     fr?: string,
     kn?: string
}

export interface IUser {
     id?: number
     name: string
     email: string
     phone: string
     password?: string
     status: string
     createdAt: Date

}

export interface IListingFeatures {
     mainImage: string,
     otherImages: Array<string>,
     categoryValues: Array<IListingFeature>
}

export interface IListing {
     id?:string
     name: ILocaleValues
     image: string
     features: IListingFeatures
     owner?: IUser
     location?: {country: string, district: string, sector: string, Cartien: string}
     createdAt: Date
     inspectionDocument?: unknown
     inStock?: boolean
     category: ICategory
     user?:CUser
}

export interface IHeading {
     type?: number,
     title: string,
     itemView?: string,
     width?: string,
     size?: string 

}

export interface IFileUploader {
     cb: (res:string) => unknown
     multicb?:(res: Array<string>) => unknown
     close: () => unknown
     title: string
     multipleFile?:boolean
     limit?:number
}