import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dice-Game",
  description:
    "Rolling dice is fun and it can also be educational.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="w-100 bg-emerald-800">
          <nav className="flex justify-center w-100 ">
            <Link
              className="m-1 text-purple-700 hover:text-pink-700"
              href="/home"
            >
            Sign In
            </Link>
            <Link
              className="m-1 text-pink-700 hover:text-purple-700"
              href="/management"
            >
              Game
            </Link>
            {/* <Link
              className="m-1 text-emerald-300 hover:text-emerald-600"
              href="/About"
            >
              about
            </Link> */}
          </nav>
        </header>
        {children}
        <footer className="text-center">&copy; DICE GAME</footer>
      </body>
    </html>
  );
}