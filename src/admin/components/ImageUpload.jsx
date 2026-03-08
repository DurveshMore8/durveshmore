import React, { useState, useRef, useEffect } from "react";
import { Upload, X, Loader2, Image as ImageIcon, Check, FileText } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function ImageUpload({ onUploadSuccess, currentImage, label = "Upload", isDocument = false }) {
    const [isUploading, setIsUploading] = useState(false);
    const [preview, setPreview] = useState(currentImage || null);

    useEffect(() => {
        setPreview(currentImage || null);
    }, [currentImage]);

    const [error, setError] = useState(null);
    const fileInputRef = useRef(null);
    const { token } = useAuth();

    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Basic validation
        if (isDocument) {
            if (!file.type.startsWith('image/') && file.type !== 'application/pdf') {
                setError("Please select an image or PDF file.");
                return;
            }
        } else {
            if (!file.type.startsWith('image/')) {
                setError("Please select an image file.");
                return;
            }
        }
        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            setError("File size too large. Max 5MB.");
            return;
        }

        const formData = new FormData();
        formData.append('image', file);

        try {
            setIsUploading(true);
            setError(null);

            const res = await fetch(`${API_URL}/api/upload`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Upload failed");
            }

            setPreview(data.url);
            onUploadSuccess(data.url);
        } catch (err) {
            console.error("Upload Error:", err);
            setError(err.message);
        } finally {
            setIsUploading(false);
        }
    };

    const removeImage = () => {
        setPreview(null);
        onUploadSuccess("");
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-400">{label}</label>

            <div className="relative group">
                {preview ? (
                    <div className="relative w-full h-48 rounded-xl overflow-hidden border border-slate-700 bg-slate-950">
                        {preview.endsWith('.pdf') ? (
                            <div className="w-full h-full flex flex-col items-center justify-center text-cyan-400 bg-slate-900">
                                <FileText size={48} />
                                <span className="mt-2 text-sm max-w-[80%] truncate">PDF Document</span>
                            </div>
                        ) : (
                            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                        )}
                        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="p-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-lg text-white transition-all"
                                title="Change Image"
                            >
                                <Upload size={18} />
                            </button>
                            <button
                                type="button"
                                onClick={removeImage}
                                className="p-2 bg-red-500/20 hover:bg-red-500/40 backdrop-blur-md rounded-lg text-red-100 transition-all"
                                title="Remove Image"
                            >
                                <X size={18} />
                            </button>
                        </div>
                        {isUploading && (
                            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center">
                                <Loader2 className="animate-spin text-cyan-500" size={32} />
                            </div>
                        )}
                    </div>
                ) : (
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className={`w-full h-48 rounded-xl border-2 border-dashed transition-all flex flex-col items-center justify-center gap-3
              ${error ? 'border-red-500/50 bg-red-500/5 text-red-400' : 'border-slate-700 hover:border-cyan-500/50 hover:bg-cyan-500/5 bg-slate-950/50 text-gray-500 hover:text-cyan-400'}`}
                    >
                        {isUploading ? (
                            <>
                                <Loader2 className="animate-spin" size={32} />
                                <span className="text-sm font-medium">Uploading to ImageKit...</span>
                            </>
                        ) : (
                            <>
                                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-cyan-500/20 group-hover:scale-110 transition-all">
                                    <ImageIcon size={24} />
                                </div>
                                <div className="text-center">
                                    <p className="text-sm font-bold">Click to upload</p>
                                    <p className="text-xs opacity-60">{isDocument ? 'PDF, PNG, JPG up to 5MB' : 'PNG, JPG, WebP up to 5MB'}</p>
                                </div>
                            </>
                        )}
                    </button>
                )}

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept={isDocument ? "image/*,application/pdf" : "image/*"}
                    className="hidden"
                />
            </div>

            {error && <p className="text-xs text-red-400 font-medium">{error}</p>}
            {preview && !isUploading && (
                <div className="flex items-center gap-1.5 text-[10px] text-green-400 font-bold uppercase tracking-wider">
                    <Check size={12} />
                    <span>Uploaded to ImageKit</span>
                </div>
            )}
        </div>
    );
}
