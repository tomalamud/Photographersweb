import Link from "next/link";

function Header() {
  return (
    <header className="flex justify-between p-5 max-w-7xl mx-auto">
      <div className="flex items-center space-x-5">
        <Link href="/">
          <img className="w-44 sm:w-52 object-contain cursor-pointer" src="/JuanCruzPapp.png" alt="" />
        </Link>
        <div className="hidden md:inline-flex items-center space-x-5">
        </div>
      </div>
    </header>
  )
};

export default Header;