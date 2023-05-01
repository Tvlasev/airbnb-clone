import ToasterProvider from "./Providers/ToasterProvider";
import getCurrentUser from "./actions/getCurrentUser";
import LoginModal from "./components/Modals/LoginModal";
import Modal from "./components/Modals/Modal";
import RegisterModal from "./components/Modals/RegisterModal";
import NavBar from "./components/NavBar/NavBar";
import "./globals.css";
import { Nunito } from "next/font/google";

const nunitoFont = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "Airbnb clone",
  description: "This is Airbnb clone app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={nunitoFont.className}>
        <ToasterProvider />
        <LoginModal />
        <RegisterModal />
        <NavBar currentUser={currentUser}/>
        {children}
      </body>
    </html>
  );
}
