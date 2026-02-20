// src/components/Container.tsx
export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[1340px] mx-auto w-full relative 
      px-4          /* Base: 24px padding for mobile */
      md:px-16       /* Tablet/Medium: 64px padding */
      lg:px-24       /* Desktop/Large: 96px padding */
      py-10          /* Consistent vertical padding */
    ">
      {children}
    </div>
  );
}
// src/components/Container.tsx
export function ContainerHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[1340px] mx-auto w-full relative 
     pt-4
    //  md:pt-8
    p-3.5
    ">
      {children}
    </div>
  );
}