// src/components/Container.tsx

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-full max-w-[1340px] px-4 py-10 md:px-16 lg:px-24">
      {children}
    </div>
  );
}

export function ContainerHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-full max-w-[1340px] p-3.5 pt-4">
      {children}
    </div>
  );
}