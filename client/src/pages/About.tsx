import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const About = () => {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
                {/* Hero Section */}
                <section className="relative bg-indigo-50 rounded-2xl overflow-hidden">
                    <div className="relative z-10 p-8 md:p-12 lg:p-16 max-w-3xl">
                        <h1 className="text-4xl font-bold text-indigo-900 mb-4">About Ceylon Gems</h1>
                        <p className="text-lg text-gray-700 mb-8">
                            Discover the rich heritage and exquisite craftsmanship behind Sri Lanka's
                            finest gemstones. Ceylon Gems brings you ethically sourced, premium quality
                            precious stones from the heart of the gem capital of the world.
                        </p>
                        <Link
                            to="/contact"
                            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md font-medium transition-all"
                        >
                            Get in Touch
                        </Link>
                    </div>
                    <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1617038220319-276d3cfab638?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80')] bg-cover bg-center"></div>
                </section>

                {/* Our Story Section */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
                        <p className="text-gray-700 mb-4">
                            Ceylon Gems was founded in 2015 by Hasinthaka Piyumal, a third-generation gemologist with a passion for Sri Lanka's natural treasures. Born and raised in Ratnapura, known as the "City of Gems," Hasinthaka grew up surrounded by the rich gemstone heritage of Sri Lanka.
                        </p>
                        <p className="text-gray-700 mb-4">
                            After completing his gemology education in Colombo and gaining experience in the international gem market, Hasinthaka returned to his roots with a vision: to create a business that would showcase the beauty of Sri Lankan gems while supporting local mining communities and promoting sustainable practices.
                        </p>
                        <p className="text-gray-700">
                            Today, Ceylon Gems stands as a bridge between the ancient tradition of Sri Lankan gemstone mining and the modern global marketplace, offering unparalleled quality and transparency in every stone we sell.
                        </p>
                    </div>
                    <div className="rounded-lg overflow-hidden shadow-lg">
                        <img
                            src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                            alt="Founder Hasinthaka Piyumal"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </section>

                {/* Sri Lankan Heritage Section */}
                <section className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 md:p-12 rounded-2xl">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Sri Lanka: The Gem Island</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <h3 className="text-xl font-semibold text-indigo-700 mb-3">Rich History</h3>
                            <p className="text-gray-700">
                                Known as "Ratnadeepa" (Island of Gems) in ancient times, Sri Lanka has been famous for its gemstones for over 2,500 years. Marco Polo wrote that the island had the best sapphires, topazes, amethysts, and other gems in the world.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <h3 className="text-xl font-semibold text-indigo-700 mb-3">Geological Wonder</h3>
                            <p className="text-gray-700">
                                Sri Lanka's unique geological conditions have created one of the highest gem densities in the world. The island's central highland region, formed by massive geological pressure, created the perfect environment for gem formation.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <h3 className="text-xl font-semibold text-indigo-700 mb-3">Famous Gems</h3>
                            <p className="text-gray-700">
                                The famous "Blue Belle of Asia," a 392-carat sapphire, was discovered in Sri Lanka. The star sapphire known as "Star of India" and the "Logan Sapphire" in the Smithsonian are also from Sri Lanka.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Meet the Team Section */}
                <section>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Meet Our Team</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
                        <div className="text-center">
                            <div className="relative mb-4 inline-block">
                                <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-indigo-100">
                                    <img
                                        src="https://hasinthaka.com/_next/static/media/hasinthaka.3e968c3c.jpg"
                                        alt="Hasinthaka Piyumal"
                                        className="w-full h-full object-cover object-top"
                                    />
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Hasinthaka Piyumal</h3>
                            <p className="text-indigo-600 font-medium">Founder & CEO</p>
                            <p className="mt-2 text-gray-600 max-w-xs mx-auto">
                                A third-generation gemologist with expertise in rare Sri Lankan sapphires and traditional mining techniques.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="relative mb-4 inline-block">
                                <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-indigo-100">
                                    <img
                                        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
                                        alt="Amaya Perera"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Amaya Perera</h3>
                            <p className="text-indigo-600 font-medium">Head Gemologist</p>
                            <p className="mt-2 text-gray-600 max-w-xs mx-auto">
                                GIA certified gemologist with 10 years of experience in gem identification and certification.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="relative mb-4 inline-block">
                                <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-indigo-100">
                                    <img
                                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
                                        alt="Dinesh Jayawardena"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Dinesh Jayawardena</h3>
                            <p className="text-indigo-600 font-medium">Master Craftsman</p>
                            <p className="mt-2 text-gray-600 max-w-xs mx-auto">
                                With 25 years of experience in traditional Sri Lankan gem cutting techniques.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Our Values Section */}
                <section className="bg-indigo-700 text-white p-8 md:p-12 rounded-2xl">
                    <h2 className="text-3xl font-bold mb-10 text-center">Our Values</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 bg-indigo-500 rounded-full p-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">Ethical Sourcing</h3>
                                <p className="text-indigo-100">
                                    We work directly with small-scale miners in Sri Lanka to ensure fair compensation and environmentally responsible mining practices.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-shrink-0 bg-indigo-500 rounded-full p-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">Quality Excellence</h3>
                                <p className="text-indigo-100">
                                    Every gem we sell undergoes rigorous quality assessment. We pride ourselves on transparency and only offer stones of exceptional quality.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-shrink-0 bg-indigo-500 rounded-full p-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">Full Certification</h3>
                                <p className="text-indigo-100">
                                    All our premium gemstones come with a detailed certificate of authenticity and origin, verified by the Gem & Jewellery Authority of Sri Lanka.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-shrink-0 bg-indigo-500 rounded-full p-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">Community Support</h3>
                                <p className="text-indigo-100">
                                    We reinvest a portion of our profits into educational programs in Sri Lanka's mining communities, supporting the next generation of gemologists.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Visit Our Store Section */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="rounded-lg overflow-hidden shadow-xl">
                        <img
                            src="https://images.unsplash.com/photo-1613843433065-819a4c57fffe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
                            alt="Our Store in Colombo"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Visit Our Store</h2>
                        <p className="text-gray-700 mb-4">
                            Experience the beauty of Ceylon Gems in person at our flagship store in Colombo. Our experts will guide you through our collection and help you find the perfect gem for any occasion.
                        </p>
                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                            <h3 className="font-semibold text-gray-900 mb-2">Ceylon Gems Flagship Store</h3>
                            <p className="text-gray-600 mb-1">42 Galle Road</p>
                            <p className="text-gray-600 mb-1">Colombo 03</p>
                            <p className="text-gray-600 mb-1">Sri Lanka</p>
                            <p className="text-gray-600 mb-4">+94 11 234 5678</p>
                            <p className="text-gray-700 font-medium">
                                Open Monday-Saturday: 10am - 6pm
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default About;