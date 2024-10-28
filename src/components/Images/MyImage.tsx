'use client';


// type roundValues = 'full' | 'md' | 'sm' | 'lg' | 'xl' | '2xl' | 'none';

interface IImage {
     image: string
     action?: (arg0: unknown) => unknown 
     rounded?: string

}
const MyImage:React.FC<IImage> = ({image='/images/real-estate-image-1000x700.png', action=() => {}, rounded='0px'}) => {
     return (
          <div 
          style={{ backgroundImage: `url(${image})` }} 
          className={` w-full h-full bg-center bg-cover bg-no-repeat rounded-[${rounded}] overflow-hidden`} 
          onClick={action}
          ></div>
     )
}

export default MyImage