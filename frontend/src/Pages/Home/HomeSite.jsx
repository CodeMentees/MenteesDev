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
        <section className="p-6 max-w-2xl mx-auto">
            <div
                className="rounded-2xl p-8"
                style={{
                    background: "rgb(var(--dash-panel))",
                    border: "1px solid rgba(var(--dash-border))",
                }}
            >
                <h2 className="text-2xl font-bold mb-6" style={{ color: "rgb(var(--dash-ink))" }}>
                    Update Site Data
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Site Name */}
                    <div>
                        <label className="block text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "rgba(var(--dash-ink), 0.5)" }}>Site Name</label>
                        <input
                            type="text"
                            name="siteName"
                            value={formData.siteName}
                            onChange={handleChange}
                            className="w-full rounded-lg p-3 text-sm border focus:outline-none focus:ring-2"
                            style={{ background: "rgba(var(--dash-border), 0.3)", borderColor: "rgba(var(--dash-border))", color: "rgb(var(--dash-ink))" }}
                        />
                    </div>

                    {/* Contact Number */}
                    <div>
                        <label className="block text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "rgba(var(--dash-ink), 0.5)" }}>Contact Number</label>
                        <input
                            type="text"
                            name="contactNumber"
                            value={formData.contactNumber}
                            onChange={handleChange}
                            className="w-full rounded-lg p-3 text-sm border focus:outline-none focus:ring-2"
                            style={{ background: "rgba(var(--dash-border), 0.3)", borderColor: "rgba(var(--dash-border))", color: "rgb(var(--dash-ink))" }}
                        />
                    </div>

                    {/* Carousels */}
                    <div>
                        <label className="block text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "rgba(var(--dash-ink), 0.5)" }}>Carousel Images</label>
                        <div className="space-y-2">
                        {formData.carasouls.map((url, index) => (
                            <div key={index} className="flex gap-2 items-center">
                                <input
                                    type="text"
                                    value={url}
                                    onChange={(e) => handleArrayChange(index, "carasouls", e.target.value)}
                                    className="w-full rounded-lg p-3 text-sm border focus:outline-none"
                                    style={{ background: "rgba(var(--dash-border), 0.3)", borderColor: "rgba(var(--dash-border))", color: "rgb(var(--dash-ink))" }}
                                />
                                <button
                                    type="button"
                                    onClick={() => removeField("carasouls", index)}
                                    className="px-3 py-2 rounded-lg text-sm font-bold text-white transition hover:opacity-80"
                                    style={{ background: "rgba(239,68,68,0.2)", border: "1px solid rgba(239,68,68,0.3)" }}
                                >✕</button>
                            </div>
                        ))}
                        </div>
                        <button
                            type="button"
                            onClick={() => addField("carasouls")}
                            className="mt-2 px-4 py-2 text-sm font-semibold rounded-lg transition hover:opacity-80"
                            style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)", color: "#a78bfa" }}
                        >+ Add Image</button>
                    </div>

                    {/* Features */}
                    <div>
                        <label className="block text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "rgba(var(--dash-ink), 0.5)" }}>Features</label>
                        <div className="space-y-2">
                        {formData.features.map((feature, index) => (
                            <div key={index} className="flex gap-2 items-center">
                                <input
                                    type="text"
                                    value={feature}
                                    onChange={(e) => handleArrayChange(index, "features", e.target.value)}
                                    className="w-full rounded-lg p-3 text-sm border focus:outline-none"
                                    style={{ background: "rgba(var(--dash-border), 0.3)", borderColor: "rgba(var(--dash-border))", color: "rgb(var(--dash-ink))" }}
                                />
                                <button
                                    type="button"
                                    onClick={() => removeField("features", index)}
                                    className="px-3 py-2 rounded-lg text-sm font-bold text-white transition hover:opacity-80"
                                    style={{ background: "rgba(239,68,68,0.2)", border: "1px solid rgba(239,68,68,0.3)" }}
                                >✕</button>
                            </div>
                        ))}
                        </div>
                        <button
                            type="button"
                            onClick={() => addField("features")}
                            className="mt-2 px-4 py-2 text-sm font-semibold rounded-lg transition hover:opacity-80"
                            style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)", color: "#a78bfa" }}
                        >+ Add Feature</button>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full py-3 font-bold rounded-xl text-white transition hover:opacity-90"
                        style={{ background: "linear-gradient(135deg, #7c3aed, #a78bfa)" }}
                    >Save Changes</button>
                </form>
            </div>
        </section>
    );
};

export default HomeSite;
