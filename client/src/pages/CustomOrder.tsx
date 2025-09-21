import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/hooks/redux";

const CustomOrder = () => {
    const navigate = useNavigate();
    const { user } = useAppSelector((state) => state.auth);
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        gemType: "",
        caratWeight: "",
        shape: "",
        color: "",
        clarity: "",
        budget: "",
        timeline: "",
        purpose: "",
        specifications: "",
        name: user ? user.name : "",
        email: user ? user.email : "",
        phone: "",
    });
    const [uploading, setUploading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const gemTypes = [
        { value: "sapphire", label: "Sapphire" },
        { value: "ruby", label: "Ruby" },
        { value: "emerald", label: "Emerald" },
        { value: "alexandrite", label: "Alexandrite" },
        { value: "spinel", label: "Spinel" },
        { value: "topaz", label: "Topaz" },
        { value: "amethyst", label: "Amethyst" },
        { value: "citrine", label: "Citrine" },
        { value: "garnet", label: "Garnet" },
        { value: "tourmaline", label: "Tourmaline" },
        { value: "moonstone", label: "Moonstone" },
        { value: "aquamarine", label: "Aquamarine" },
        { value: "other", label: "Other (please specify)" },
    ];

    const gemShapes = [
        { value: "round", label: "Round" },
        { value: "oval", label: "Oval" },
        { value: "cushion", label: "Cushion" },
        { value: "princess", label: "Princess" },
        { value: "emerald", label: "Emerald (rectangular)" },
        { value: "pear", label: "Pear" },
        { value: "marquise", label: "Marquise" },
        { value: "radiant", label: "Radiant" },
        { value: "asscher", label: "Asscher" },
        { value: "heart", label: "Heart" },
        { value: "trillion", label: "Trillion" },
        { value: "baguette", label: "Baguette" },
        { value: "cabochon", label: "Cabochon" },
        { value: "other", label: "Other (please specify)" },
    ];

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setUploading(true);

            // Create a preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
                setUploading(false);
            };
            reader.readAsDataURL(file);

            // In a real app, you would upload this file to your server here
        }
    };

    const handleRemoveImage = () => {
        setImagePreview(null);
    };

    const nextStep = () => {
        setStep(step + 1);
        window.scrollTo(0, 0);
    };

    const prevStep = () => {
        setStep(step - 1);
        window.scrollTo(0, 0);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Simulate form submission
        setSubmitted(true);

        // In a real app, you would send the form data to your server here
        console.log("Form submitted:", formData);

        // Reset the form after submission
        setTimeout(() => {
            setFormData({
                gemType: "",
                caratWeight: "",
                shape: "",
                color: "",
                clarity: "",
                budget: "",
                timeline: "",
                purpose: "",
                specifications: "",
                name: user ? user.name : "",
                email: user ? user.email : "",
                phone: "",
            });
            setImagePreview(null);
            window.scrollTo(0, 0);
        }, 500);
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-white">
                <Navbar />
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
                        <div className="w-20 h-20 mx-auto flex items-center justify-center rounded-full bg-green-100 mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10 text-green-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>

                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Request Received!</h2>
                        <p className="text-lg text-gray-700 mb-8">
                            Thank you for submitting your custom gemstone request. Our gemologists will review your requirements and get back to you within 24-48 hours with a personalized response.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                onClick={() => navigate("/shop")}
                                variant="outline"
                                className="px-6 py-2"
                            >
                                Browse Our Collection
                            </Button>
                            <Button
                                onClick={() => {
                                    setSubmitted(false);
                                    setStep(1);
                                }}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2"
                            >
                                Submit Another Request
                            </Button>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Page Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Custom Gemstone Request</h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Looking for a specific gemstone that's not in our collection? Let our expert gemologists help you find or create your perfect gem.
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="max-w-4xl mx-auto mb-10">
                    <div className="relative">
                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-100">
                            <div
                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600 transition-all"
                                style={{ width: step === 1 ? '33%' : step === 2 ? '66%' : '100%' }}
                            ></div>
                        </div>
                        <div className="flex justify-between text-xs text-indigo-600 font-medium">
                            <div className={step >= 1 ? 'text-indigo-600' : 'text-gray-400'}>Gemstone Details</div>
                            <div className={step >= 2 ? 'text-indigo-600' : 'text-gray-400'}>Requirements</div>
                            <div className={step >= 3 ? 'text-indigo-600' : 'text-gray-400'}>Your Information</div>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                    <form onSubmit={(e) => e.preventDefault()}>
                        {/* Step 1: Gemstone Details */}
                        {step === 1 && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Gemstone Details</h2>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="gemType" className="block text-sm font-medium text-gray-700 mb-1">
                                            Gemstone Type <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            id="gemType"
                                            name="gemType"
                                            value={formData.gemType}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        >
                                            <option value="">Select a gemstone</option>
                                            {gemTypes.map((type) => (
                                                <option key={type.value} value={type.value}>
                                                    {type.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="caratWeight" className="block text-sm font-medium text-gray-700 mb-1">
                                            Approximate Carat Weight <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="caratWeight"
                                            name="caratWeight"
                                            value={formData.caratWeight}
                                            onChange={handleChange}
                                            required
                                            placeholder="e.g., 1.5ct - 2.0ct"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="shape" className="block text-sm font-medium text-gray-700 mb-1">
                                            Preferred Shape <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            id="shape"
                                            name="shape"
                                            value={formData.shape}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        >
                                            <option value="">Select a shape</option>
                                            {gemShapes.map((shape) => (
                                                <option key={shape.value} value={shape.value}>
                                                    {shape.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-1">
                                            Color Preference
                                        </label>
                                        <input
                                            type="text"
                                            id="color"
                                            name="color"
                                            value={formData.color}
                                            onChange={handleChange}
                                            placeholder="e.g., Blue, Pink, Color Change"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="clarity" className="block text-sm font-medium text-gray-700 mb-1">
                                        Clarity Preference
                                    </label>
                                    <input
                                        type="text"
                                        id="clarity"
                                        name="clarity"
                                        value={formData.clarity}
                                        onChange={handleChange}
                                        placeholder="e.g., Eye Clean, VVS, Included acceptable"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    />
                                </div>

                                <div className="flex justify-end pt-4">
                                    <Button
                                        onClick={nextStep}
                                        type="button"
                                        className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6"
                                        disabled={!formData.gemType || !formData.caratWeight || !formData.shape}
                                    >
                                        Next Step
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Requirements */}
                        {step === 2 && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Requirements</h2>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
                                            Budget Range <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="budget"
                                            name="budget"
                                            value={formData.budget}
                                            onChange={handleChange}
                                            required
                                            placeholder="e.g., $500 - $1,000"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-1">
                                            Timeframe Needed <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            id="timeline"
                                            name="timeline"
                                            value={formData.timeline}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        >
                                            <option value="">Select a timeframe</option>
                                            <option value="urgent">Urgent (1-2 weeks)</option>
                                            <option value="standard">Standard (3-4 weeks)</option>
                                            <option value="flexible">Flexible (1-2 months)</option>
                                            <option value="no-rush">No Rush (3+ months)</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 mb-1">
                                        Purpose of Purchase
                                    </label>
                                    <select
                                        id="purpose"
                                        name="purpose"
                                        value={formData.purpose}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    >
                                        <option value="">Select purpose (optional)</option>
                                        <option value="engagement">Engagement Ring</option>
                                        <option value="wedding">Wedding/Anniversary</option>
                                        <option value="birthday">Birthday Gift</option>
                                        <option value="investment">Investment</option>
                                        <option value="collection">Personal Collection</option>
                                        <option value="jewelry">Custom Jewelry</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="specifications" className="block text-sm font-medium text-gray-700 mb-1">
                                        Additional Specifications
                                    </label>
                                    <textarea
                                        id="specifications"
                                        name="specifications"
                                        rows={4}
                                        value={formData.specifications}
                                        onChange={handleChange}
                                        placeholder="Please provide any additional details about your gemstone requirements..."
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    ></textarea>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Reference Image (optional)
                                    </label>

                                    {!imagePreview ? (
                                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                            <div className="space-y-1 text-center">
                                                <svg
                                                    className="mx-auto h-12 w-12 text-gray-400"
                                                    stroke="currentColor"
                                                    fill="none"
                                                    viewBox="0 0 48 48"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                        strokeWidth={2}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                                <div className="flex text-sm text-gray-600">
                                                    <label
                                                        htmlFor="file-upload"
                                                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                                    >
                                                        <span>Upload a file</span>
                                                        <input
                                                            id="file-upload"
                                                            name="file-upload"
                                                            type="file"
                                                            className="sr-only"
                                                            accept="image/*"
                                                            onChange={handleImageUpload}
                                                        />
                                                    </label>
                                                    <p className="pl-1">or drag and drop</p>
                                                </div>
                                                <p className="text-xs text-gray-500">
                                                    PNG, JPG, GIF up to 10MB
                                                </p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="mt-1 relative">
                                            <img
                                                src={imagePreview}
                                                alt="Reference"
                                                className="w-full h-64 object-cover rounded-md"
                                            />
                                            <button
                                                type="button"
                                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                                onClick={handleRemoveImage}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div className="flex justify-between pt-4">
                                    <Button
                                        onClick={prevStep}
                                        type="button"
                                        variant="outline"
                                        className="py-2 px-6"
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        onClick={nextStep}
                                        type="button"
                                        className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6"
                                        disabled={!formData.budget || !formData.timeline}
                                    >
                                        Next Step
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Contact Information */}
                        {step === 3 && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Information</h2>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                            Full Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            placeholder="Your full name"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                            Email Address <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            placeholder="Your email address"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                        Phone Number <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        placeholder="Your phone number"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    />
                                </div>

                                <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
                                    <p className="text-sm text-blue-800">
                                        <strong>Privacy Note:</strong> Your information will only be used to respond to your custom gem request and will not be shared with third parties.
                                    </p>
                                </div>

                                <div className="flex justify-between pt-4">
                                    <Button
                                        onClick={prevStep}
                                        type="button"
                                        variant="outline"
                                        className="py-2 px-6"
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        onClick={handleSubmit}
                                        type="submit"
                                        className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6"
                                        disabled={!formData.name || !formData.email || !formData.phone}
                                    >
                                        Submit Request
                                    </Button>
                                </div>
                            </div>
                        )}
                    </form>
                </div>

                {/* Additional Information */}
                <div className="max-w-4xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-100">
                        <h3 className="text-lg font-semibold text-indigo-900 mb-4">Why Choose a Custom Gemstone?</h3>
                        <ul className="space-y-2 text-indigo-800">
                            <li className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-600 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>Find rare gemstones not typically available in standard collections</span>
                            </li>
                            <li className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-600 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>Get exactly the color, size, and quality that matches your preferences</span>
                            </li>
                            <li className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-600 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>Work directly with expert gemologists who understand your vision</span>
                            </li>
                            <li className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-600 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>Create a truly unique piece that tells your personal story</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-100">
                        <h3 className="text-lg font-semibold text-indigo-900 mb-4">Our Custom Order Process</h3>
                        <ol className="space-y-3">
                            <li className="flex items-start">
                                <span className="bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mr-2">1</span>
                                <span className="text-indigo-800"><strong>Submit your request</strong> - Fill out this form with your gemstone preferences and requirements.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mr-2">2</span>
                                <span className="text-indigo-800"><strong>Consultation</strong> - Our gemologist will contact you to discuss your request in detail.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mr-2">3</span>
                                <span className="text-indigo-800"><strong>Sourcing</strong> - We'll find several options that match your criteria from our network of trusted suppliers.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mr-2">4</span>
                                <span className="text-indigo-800"><strong>Selection</strong> - We'll present you with options along with detailed information and high-quality images.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mr-2">5</span>
                                <span className="text-indigo-800"><strong>Delivery</strong> - Once you've made your selection, we'll secure your gemstone and deliver it to you.</span>
                            </li>
                        </ol>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default CustomOrder;