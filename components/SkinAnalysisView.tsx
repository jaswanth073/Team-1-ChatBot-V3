
import React, { useState, useRef } from 'react';
import { predictImage } from '../services/predictService';
import { ImageIcon, SparklesIcon, XIcon, LogoIcon } from './Icons';

interface PredictionResult {
    prediction: string;
    confidence: number | string; // Assuming string based on "75%" or number 0-100
}

const SkinAnalysisView: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<{ preview: string; file: File } | null>(null);
    const [result, setResult] = useState<PredictionResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage({
                    preview: reader.result as string,
                    file: file
                });
                setResult(null);
                setError(null);
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePredict = async () => {
        if (!selectedImage) return;

        setLoading(true);
        setError(null);
        try {
            const data = await predictImage(selectedImage.file);
            // Ensure data format matches expectations. 
            // If data.confidence is defined, use it.
            setResult(data);
        } catch (err: any) {
            console.error(err);
            setError("Failed to analyze image. Ensure the prediction server is running.");
        } finally {
            setLoading(false);
        }
    };

    const reset = () => {
        setSelectedImage(null);
        setResult(null);
        setError(null);
    };

    return (
        <div className="flex flex-col h-full w-full max-w-[1000px] mx-auto animate-in fade-in zoom-in-95 duration-500">

            {/* Header Section */}
            <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center p-4 bg-white rounded-3xl shadow-xl mb-6">
                    <LogoIcon />
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
                    Skin Disease Detection
                </h2>
                <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                    Upload a clear photo of the skin condition for an AI-powered analysis.
                </p>
            </div>

            {/* Main Content Card */}
            <div className="bg-white/60 backdrop-blur-2xl rounded-[40px] border border-white/50 shadow-2xl p-8 md:p-12">

                {!selectedImage ? (
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className="border-4 border-dashed border-slate-200 rounded-[30px] p-12 flex flex-col items-center justify-center text-center cursor-pointer hover:border-purple-400 hover:bg-purple-50/50 transition-all duration-300 group min-h-[400px]"
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageSelect}
                            accept="image/*"
                            className="hidden"
                        />
                        <div className="w-24 h-24 bg-white rounded-full shadow-xl flex items-center justify-center mb-6 text-purple-500 group-hover:scale-110 transition-transform duration-300">
                            <ImageIcon className="w-10 h-10" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-700 mb-2">Click to Upload Image</h3>
                        <p className="text-slate-400">Supported formats: JPG, PNG</p>
                    </div>
                ) : (
                    <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">

                        {/* Image Preview */}
                        <div className="w-full md:w-1/2 relative group">
                            <div className="relative rounded-[30px] overflow-hidden shadow-2xl border-4 border-white aspect-square">
                                <img
                                    src={selectedImage.preview}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                />
                                {!loading && (
                                    <button
                                        onClick={reset}
                                        className="absolute top-4 right-4 bg-white/90 p-3 rounded-full shadow-lg hover:scale-110 transition-transform text-slate-700"
                                    >
                                        <XIcon className="w-5 h-5" />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Controls & Result */}
                        <div className="w-full md:w-1/2 flex flex-col justify-center h-full min-h-[400px]">

                            {!result && !loading && !error && (
                                <div className="space-y-6">
                                    <h3 className="text-3xl font-bold text-slate-800">Ready to Analyze?</h3>
                                    <p className="text-slate-500 text-lg leading-relaxed">
                                        Our model will examine the image for potential skin diseases. Please ensure the image is focused and well-lit.
                                    </p>
                                    <button
                                        onClick={handlePredict}
                                        className="w-full py-6 bg-slate-900 text-white rounded-[24px] text-xl font-bold shadow-xl hover:bg-slate-800 hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
                                    >
                                        <SparklesIcon />
                                        Run Analysis
                                    </button>
                                </div>
                            )}

                            {loading && (
                                <div className="flex flex-col items-center justify-center space-y-6 py-10">
                                    <div className="relative w-24 h-24">
                                        <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
                                        <div className="absolute inset-0 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                                    </div>
                                    <p className="text-xl font-bold text-slate-600 animate-pulse">Analyzing image patterns...</p>
                                </div>
                            )}

                            {error && (
                                <div className="p-6 bg-red-50 rounded-[24px] border border-red-100 text-center">
                                    <p className="text-red-600 font-bold text-lg mb-4">{error}</p>
                                    <button onClick={handlePredict} className="px-6 py-2 bg-white text-red-600 border border-red-200 rounded-full font-bold shadow-sm hover:bg-red-50">Retry</button>
                                </div>
                            )}

                            {result && (
                                <div className="animate-in slide-in-from-bottom-4 duration-500">
                                    <div className="bg-gradient-to-br from-purple-50 to-white border border-purple-100 p-8 rounded-[32px] shadow-lg mb-6">
                                        <p className="text-sm font-bold text-purple-400 uppercase tracking-widest mb-2">Prediction</p>
                                        <h3 className="text-4xl font-extrabold text-slate-900 mb-6">{result.prediction}</h3>

                                        <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden mb-2">
                                            <div
                                                className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-1000 ease-out"
                                                style={{ width: `${result.confidence}%` }}
                                            ></div>
                                        </div>
                                        <div className="flex justify-between items-center text-sm font-bold text-slate-600">
                                            <span>Confidence Score</span>
                                            <span className="text-lg text-purple-600">{result.confidence}%</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={reset}
                                        className="w-full py-4 bg-white text-slate-600 border border-slate-200 rounded-[20px] font-bold hover:bg-slate-50 transition-colors"
                                    >
                                        Analyze Another Image
                                    </button>
                                </div>
                            )}

                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SkinAnalysisView;
