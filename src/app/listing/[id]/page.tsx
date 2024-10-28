import ClientPageWrapper from "@/components/Wrappers/ClientPageWrapper";


export default function ListingPage({params}: {params: {id: string}} ) {
     const {id} = params;
     return(
          <ClientPageWrapper>
               <h3>Listing Id: {id}</h3>
          </ClientPageWrapper>
     )
}