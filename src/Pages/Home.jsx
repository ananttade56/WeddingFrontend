import Countdown from "../Component/Countdown"
import CoupleCards from "../Component/CoupleCards"
import Header from "../Component/Header"
import OurPeople from "../Component/OurPeople"
import WeddingFooterSections from "../Component/WeddingFooterSections"
import WeddingOrganization from "../Component/WeddingOrganization"
function Home() {
    return (
        <>

            <Header />
            <CoupleCards />
            <Countdown />
            <WeddingOrganization />
            <OurPeople />
            <WeddingFooterSections />
        </>
    )
}

export default Home