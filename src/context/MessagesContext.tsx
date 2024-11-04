'use client';

import { CMessages } from "@/common/Entities";
import { createContext, useContext, useEffect, useState } from "react";
import EnglishMessages from '../../messages/en.json';
import FrenchMessages from '../../messages/fr.json';
import KnMessages from '../../messages/kn.json'
import { TLocale } from "@/common/CommonTypes";

interface IMessagesContext {
     locale: TLocale
     setLocale: (locale:TLocale) => void
     messages: CMessages
     setMessages: (messages:CMessages) => void
}

const MessagesContext  = createContext<IMessagesContext | undefined>(undefined);

export const MessagesProvider = ({children, currentLocale} : {children: React.ReactNode, currentLocale:TLocale}) => {
     const [locale,setLocale] = useState<TLocale>(currentLocale);
     const [messages, setMessages] = useState<CMessages>(EnglishMessages);

     useEffect(() => {
          if(locale === 'en') setMessages(EnglishMessages);
          else if(locale === 'fr') setMessages(FrenchMessages);
          else if(locale === 'kn') setMessages(KnMessages);
     }, [locale])
     return(
          <MessagesContext.Provider value={{messages, setMessages, locale, setLocale}}>
               {children}
          </MessagesContext.Provider>
     )
}

export const useMessages = () => {
     const context = useContext(MessagesContext);
     if(!context) {
          throw new Error("Messages must be used with in messages provider")
     }
     return context;
}