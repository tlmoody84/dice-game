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
        <header className="w-100 bg-blue-400">
          <nav className="flex justify-center w-100 ">
            <Link
              className="m-1 text-purple-700 hover:text-pink-700"
              href="/"
            >
            Sign In
            </Link>
            <Link
              className="m-1 text-pink-700 hover:text-purple-700"
              href="/management"
            >
              Game
            </Link>
           </nav>
        </header>
        {children}
        <footer className="text-center">&copy; DICE GAME</footer>
      </body>
    </html>
  );
}