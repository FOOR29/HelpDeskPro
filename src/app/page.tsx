import Link from "next/link";
// import Header from "../components/header/Header"
// import IButton from "../components/ui/IButton";

export default function Home() {
  return (
    <>
      {/* <Header /> */}
      <main className="bg-blue-900 w-full flex-grow flex justify-center items-center">
        <div>
          <h1 className="text-4xl font-bold">Wecolme to Home</h1>
          <div className="flex gap-2.5 justify-center pt-1.5">
            <Link href="/login" className="bg-blue-500 py-0.5 px-2.5 rounded-4xl flex justify-center items-center font-bold cursor-pointer">Login</Link>
            <Link href="/register" className="bg-blue-500 py-0.5 px-2.5 rounded-4xl flex justify-center items-center font-bold cursor-pointer">Register</Link>
          </div>
        </div>
      </main>
    </>
  );
}
