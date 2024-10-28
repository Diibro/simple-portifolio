interface IPageContent {
     children: React.ReactNode
}

export const PageContent: React.FC<IPageContent> = ({children}) => {
     return (
          <main className="w-full relative h-auto max-h-none">
               {children}
          </main>
     )
}