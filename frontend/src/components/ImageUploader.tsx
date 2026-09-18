"use client";

import { useRef, useState } from "react";

type PredictionResult = {
    disease: string;
    display_name: string;
    confidence: number;
    confidence_percent: number;
    confidence_level: string;
    confidence_message: string;
    top_predictions: {
        class_name: string;
        display_name: string;
        confidence: number;
        confidence_percent: number;
    }[];
};

const API_URL = "http://127.0.0.1:8000";

export default function ImageUploader() {
    const inputRef = useRef<HTMLInputElement>(null);

    const [image, setImage] = useState<string | null>(null);
    const [fileName, setFileName] = useState("");
    const [scanning, setScanning] = useState(false);
    const [result, setResult] = useState<PredictionResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleImageChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];

        if (!file) return;

        setFileName(file.name);
        setImage(URL.createObjectURL(file));
        setResult(null);
        setError(null);
    };

    const handleChooseImage = () => {
        inputRef.current?.click();
    };

    const handleRemove = () => {
        setImage(null);
        setFileName("");
        setResult(null);
        setError(null);

        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

    const handleScan = async () => {
        const file = inputRef.current?.files?.[0];

        if (!file) {
            setError("Please select an image first.");
            return;
        }

        setScanning(true);
        setResult(null);
        setError(null);

        try {
            const formData = new FormData();
            formData.append("file", file);

            const response = await fetch(`${API_URL}/predictions/image`, {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || "Prediction failed.");
            }

            setResult(data);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Unable to connect to the prediction service."
            );
        } finally {
            setScanning(false);
        }
    };

    return (
        <div className="rounded-xl border-2 border-dashed border-slate-300 p-10 text-center">
            <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/jpg"
                onChange={handleImageChange}
                className="hidden"
            />

            {image ? (
                <div className="flex flex-col items-center">
                    <img
                        src={image}
                        alt="Selected crop"
                        className="max-h-64 rounded-lg object-contain"
                    />

                    <p className="mt-4 font-medium text-slate-700">
                        {fileName}
                    </p>

                    <div className="mt-4 flex gap-3">
                        <button
                            type="button"
                            onClick={handleChooseImage}
                            className="rounded-lg bg-green-600 px-5 py-3 font-medium text-white hover:bg-green-700"
                        >
                            Change Image
                        </button>

                        <button
                            type="button"
                            onClick={handleRemove}
                            className="rounded-lg border border-slate-300 px-5 py-3 font-medium text-slate-700 hover:bg-slate-100"
                        >
                            Remove
                        </button>
                    </div>

                    <button
                        type="button"
                        onClick={handleScan}
                        disabled={scanning}
                        className="mt-5 rounded-lg bg-green-700 px-8 py-3 font-semibold text-white hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {scanning ? "Analyzing..." : "Scan for Disease"}
                    </button>

                    {scanning && (
                        <p className="mt-4 text-sm text-slate-500">
                            Analyzing your crop image...
                        </p>
                    )}

                    {error && (
                        <div className="mt-5 w-full rounded-lg bg-red-50 p-4 text-left">
                            <p className="text-sm font-medium text-red-700">
                                Prediction Error
                            </p>
                            <p className="mt-1 text-red-900">{error}</p>
                        </div>
                    )}

                    {result && (
                        <div className="mt-5 w-full rounded-lg bg-green-50 p-4 text-left">
                            <p className="text-sm font-medium text-green-700">
                                Disease Prediction
                            </p>

                            <p className="mt-1 text-xl font-semibold text-green-900">
                                {result.display_name}
                            </p>

                            <p className="mt-2 text-sm text-slate-700">
                                Confidence:{" "}
                                <span className="font-semibold">
                                    {result.confidence_percent}%
                                </span>
                            </p>

                            <p className="mt-1 text-sm text-slate-600">
                                {result.confidence_message}
                            </p>

                            {result.top_predictions.length > 1 && (
                                <div className="mt-4">
                                    <p className="text-sm font-medium text-slate-700">
                                        Other predictions
                                    </p>

                                    <ul className="mt-2 space-y-1 text-sm text-slate-600">
                                        {result.top_predictions
                                            .slice(1)
                                            .map((prediction) => (
                                                <li
                                                    key={prediction.class_name}
                                                >
                                                    {prediction.display_name}:{" "}
                                                    {prediction.confidence_percent}%
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            ) : (
                <>
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl text-green-700">
                        +
                    </div>

                    <p className="font-medium">Upload crop image</p>

                    <p className="mt-1 text-sm text-slate-500">
                        JPG, JPEG or PNG
                    </p>

                    <button
                        type="button"
                        onClick={handleChooseImage}
                        className="mt-5 rounded-lg bg-green-600 px-5 py-3 font-medium text-white hover:bg-green-700"
                    >
                        Choose Image
                    </button>
                </>
            )}
        </div>
    );
}