import { airbnb, amazon, facebook, google, grab, netflix } from "../../assets/img"

function Trust() {
    return (
        <div>
            <>
                {/* trusted by */}
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-center mb-3 text-gray-400 font-medium">
                        Trusted by 5,000+ Companies Worldwide
                    </h1>
                    <div className="grid grid-cols-3 lg:grid-cols-6 gap-4 justify-items-center">
                        <img className="h-7" src={google} />
                        <img className="h-7" src={netflix} />
                        <img className="h-7" src={airbnb} />
                        <img
                            className="h-7 transform translate-y-2"
                            src={amazon}
                        />
                        <img className="h-7" src={facebook} />
                        <img className="h-7" src={grab} />
                    </div>
                </div>
                {/* All-In-One Cloud Software. */}
                <div data-aos="flip-up" className="max-w-xl mx-auto text-center mt-24">
                    <h1 className="font-bold text-darken my-3 text-2xl">
                        All-In-One <span className="text-yellow-500">Cloud Software.</span>
                    </h1>
                    <p className="leading-relaxed text-gray-500">
                        CodeMentees  is one powerful online software suite that combines all the
                        tools needed to run a successful school or office.
                    </p>
                </div>
            </>

        </div>
    )
}

export default Trust