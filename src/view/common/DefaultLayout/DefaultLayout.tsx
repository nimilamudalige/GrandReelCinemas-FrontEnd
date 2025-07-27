import { Navbar } from "../Navbar/Navbar.tsx";
import { MainContent } from "../MainContent/MainContent.tsx";
import { Footer } from "../Footer/Footer.tsx";

export function DefaultLayout() {
    return (
        <>
            <Navbar />
            <main className="flex-grow">
                <MainContent />
            </main>
            <Footer />
        </>
    );
}
