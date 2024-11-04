/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICategoryFeature, IListingFeatures, ILocaleValues } from "./Interfaces"

export class CCategory {
     id!: string
     name!: ILocaleValues
     icon!: string
     features!:Array<ICategoryFeature>
     type!:ILocaleValues
     status!: boolean
     inspectionTraits?: any

}

export class CListing {
     id!:string
     name!:any
     image!:string
     features!:IListingFeatures
     owner!:{name?: string, email?: string, phone?: string}
     location!:{country?: string, district?: string, sector?:string, Cartien?: string}
     createdAt!:Date
     inspectionDocument?:string
     inStock!: boolean
}

export class CStaff {
     id?: number
     email!: string
     password?: string
     role!: string
     status!: string
     createdAt?: Date
     icon?: string
}

export class CUser {
     id?:number
     email!: string
     name?: string
     phone!: string
     type!: string
     password!: string
     status!: string
     createdAt!: Date
     icon?:string
}

export class CMessages {
     header: any
     pages: any
     footer: any
     common: any
}