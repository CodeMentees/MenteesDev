import { useState } from "react";
import {postSiteData} from "../../api/siteDataApi"

const HomeSite = () => {
    const [formData, setFormData] = useState({
        siteName: "Codementees",
        contactNumber: "9876543210",
        carasouls: [""],
        features: [""],
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleArrayChange = (index, field, value) => {
        const updatedArray = [...formData[field]];
        updatedArray[index] = value;
        setFormData({ ...formData, [field]: updatedArray });
    };

    const addField = (field) => {
        setFormData({ ...formData, [field]: [...formData[field], ""] });
    };

    const removeField = (field, index) => {
        const updatedArray = formData[field].filter((_, i) => i !== index);
        setFormData({ ...formData, [field]: updatedArray });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await postSiteData(formData);
        if (response) {
            alert("Site data updated successfully!");
        } else {
            alert("Failed to update site data.");
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <h2 className="text-2xl font-bold mb-4">Update Site Data</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Site Name */}
                <div>
                    <label className="block font-medium">Site Name</label>
                    <input
                        type="text"
                        name="siteName"
                        value={formData.siteName}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                    />
                </div>

                {/* Contact Number */}
                <div>
                    <label className="block font-medium">Contact Number</label>
                    <input
                        type="text"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                    />
                </div>

                {/* Carousels */}
                <div>
                    <label className="block font-medium">Carousel Images</label>
                    {formData.carasouls.map((url, index) => (
                        <div key={index} className="flex gap-2 items-center">
                            <input
                                type="text"
                                value={url}
                                onChange={(e) => handleArrayChange(index, "carasouls", e.target.value)}
                                className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                            />
                            <button
                                type="button"
                                onClick={() => removeField("carasouls", index)}
                                className="px-3 py-1 bg-red-500 text-white rounded-md"
                            >
                                X
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => addField("carasouls")}
                        className="mt-2 px-3 py-1 bg-blue-500 text-white rounded-md"
                    >
                        + Add Image
                    </button>
                </div>

                {/* Features */}
                <div>
                    <label className="block font-medium">Features</label>
                    {formData.features.map((feature, index) => (
                        <div key={index} className="flex gap-2 items-center">
                            <input
                                type="text"
                                value={feature}
                                onChange={(e) => handleArrayChange(index, "features", e.target.value)}
                                className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                            />
                            <button
                                type="button"
                                onClick={() => removeField("features", index)}
                                className="px-3 py-1 bg-red-500 text-white rounded-md"
                            >
                                X
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => addField("features")}
                        className="mt-2 px-3 py-1 bg-blue-500 text-white rounded-md"
                    >
                        + Add Feature
                    </button>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default HomeSite;
