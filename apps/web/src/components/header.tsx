import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold">Servly</h1>
      <Avatar>
        <AvatarFallback className="">AY</AvatarFallback>
      </Avatar>
    </header>
  )
}
