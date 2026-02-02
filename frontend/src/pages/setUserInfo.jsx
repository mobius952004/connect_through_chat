import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { generateLink } from "../utils/platformurls";

export default function SetProfileInformation() {
    const navigate = useNavigate();

    const [profileImage, setProfileImage] = useState(null);
    const [preview, setPreview] = useState("/vite.svg");
    const [status, setStatus] = useState("");
    const [handles, setHandles] = useState([
        { platform: "", value: "" }
    ]);
    const addHandle = () => {
        setHandles([
            ...handles,
            { platform: "", value: "" }
        ]);
    };


    // Image select + preview
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setProfileImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleHandleChange = (index, field, value) => {
        setHandles(prev =>
            prev.map((h, i) =>
                i === index ? { ...h, [field]: value } : h
            )
        );
    };
    const handleSubmit = () => {
        // we’ll send this to backend later
        console.log({ profileImage, status, handles });
        navigate("/connect/home");
    };

    return (
        <div className="bg-slate-800 flex justify-center min-h-screen">
            <div className="bg-gray-950 my-15 shadow-2xl shadow-black h-max p-10 rounded-2xl w-[420px] ">

                {/* Profile Image */}
                <div className="flex flex-col items-center  ">
                    <img
                        src={preview}
                        alt="profile"
                        className="h-36 w-36 rounded-full object-cover border-2 border-emerald-500 shadow-2xl shadow-green-500"
                    />

                    <label className="mt-4 cursor-pointer text-emerald-400 hover:underline">
                        Change Profile Photo
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                        />
                    </label>
                </div>

                {/* Status */}
                <div className="mt-8">
                    <label className="text-white block mb-2">Status</label>
                    <input
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        placeholder="Hey there! I am using Connect"
                        className="w-full bg-slate-600 text-white px-4 py-2 rounded-xl focus:outline-none"
                    />
                </div>

                {/* Handles */}
                <div className="mt-6">
                    <label className="text-white block mb-2">Social / Contact Handles</label>
                    <div className="space-y-3">
                        {handles.map((h, i) => (
                            <div key={i} className="flex gap-2">

                                <select
                                    value={h.platform}
                                    onChange={(e) =>
                                        handleHandleChange(i, "platform", e.target.value)
                                    }
                                    className="bg-slate-600 text-white rounded-xl px-2"
                                >
                                    <option value="instagram">Instagram</option>
                                    <option value="github">GitHub</option>
                                    <option value="linkedin">LinkedIn</option>
                                    <option value="twitter">Twitter</option>
                                    <option value="X">Twitter</option>
                                </select>

                                <input
                                    value={h.value}
                                    onChange={(e) =>
                                        handleHandleChange(i, "value", e.target.value)
                                    }
                                    placeholder="username or link"
                                    className="flex-1 bg-slate-600 text-white px-4 py-2 rounded-xl"
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-6">
                    <div className="w-full border-3 hover:border-green-500 border-green-700 text-white px-4 py-2 rounded-xl focus:outline-none">
                        <button type="button" onClick={addHandle}>
                            Add Handle +
                        </button>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-between mt-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="px-6 py-2 rounded-2xl bg-gray-800 text-white hover:text-emerald-400"
                    >
                        Back
                    </button>

                    <button
                        onClick={handleSubmit}
                        className="px-6 py-2 rounded-2xl bg-emerald-600 text-black font-semibold hover:bg-emerald-500"
                    >
                        Next
                    </button>
                </div>

            </div>
        </div>
    );
}
