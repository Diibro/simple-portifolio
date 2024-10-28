import { TLocale } from "@/common/CommonTypes";
import { CCategory } from "@/common/Entities";
import { ILocaleValues } from "@/common/Interfaces";
import { ClientPageContainer } from "@/components/containers/PageContainers";
import ClientPageWrapper from "@/components/Wrappers/ClientPageWrapper";
import { useLocale } from "next-intl";

export default function categoryPage() {
     return (
          <ClientPageWrapper>
               <ClientPageContainer>
                    <h3>Categories</h3>
               </ClientPageContainer>

          </ClientPageWrapper>
     )
}

const CategoriesRow = ({categoryGroup, categories} : {categoryGroup: ILocaleValues, categories:Array<CCategory>}) => {
     const locale = useLocale() as TLocale;

     return (
          <div>
               <div>{categoryGroup[locale]}</div>
               <div>

               </div>
          </div>
     )
}  