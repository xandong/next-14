export const AuthLayout = ({ children }: {children: React.ReactNode}) => {
  return (
    <div className="w-[100dvw] h-[100dvh] bg-zinc-900 flex justify-center items-center">
      <div>
        {children}
      </div>
    </div>
  )
}