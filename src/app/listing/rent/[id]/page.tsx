import ClientPageWrapper from '@/components/Wrappers/ClientPageWrapper';
import React from 'react'

export default function RentListingPage({params}: {params: {id: string}} ) {
  const {id} = params;
  return(
       <ClientPageWrapper>
            <h3>Renting Listing Id: {id}</h3>
       </ClientPageWrapper>
  )
}