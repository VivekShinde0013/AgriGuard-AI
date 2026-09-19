"use client";

import { useRef, useState } from "react";

type Prediction = {
    class_name: string;
    display_name: string;
    confidence: number;
    confidence_percent: number;
};

export type PredictionResponse = {
    disease: string;
    display_name: string;
    confidence: number;
    confidence_percent: number;
    confidence_level: string;
    confidence_message: string;
    top_predictions: Prediction[];
};

export default function ImageUploader({ onScanResult }: { onScanResult: (result: PredictionResponse) => void }) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [image, setImage] = useState<string | null>(null);
    const [fileName, setFileName] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [scanning, setScanning] = useState(false);
    const [result, setResult] = useState<PredictionResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];

        if (!selectedFile) return;

        setFile(selectedFile);
        setFileName(selectedFile.name);
        setImage(URL.createObjectURL(selectedFile));
        setResult(null);
        setError(null);
    };

    const handleChooseImage = () => {
        inputRef.current?.click();
    };

    const handleRemove = () => {
        setImage(null);
        setFileName("");
        setFile(null);
        setResult(null);
        setError(null);

        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

    const handleScan = async () => {
        if (!file) return;

        setScanning(true);
        setResult(null);
        setError(null);

        try {
            const formData = new FormData();
            formData.append("file", file);

            const response = await fetch(
                "http://192.168.134.13:8000/predictions/image",
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (!response.ok) {
                throw new Error(`API request failed: ${response.status}`);
            }

            const data: PredictionResponse = await response.json();

            setResult(data);
            onScanResult(data);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to analyze the image."
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
                        <div className="mt-5 w-full rounded-xl border border-red-200 bg-red-50 p-4 text-left">
                            <p className="font-medium text-red-700">
                                Prediction failed
                            </p>
                            <p className="mt-1 text-sm text-red-600">
                                {error}
                            </p>
                        </div>
                    )}

                    {result && (
                        <div className="mt-5 w-full rounded-2xl border border-green-200 bg-green-50 p-5 text-left">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-sm font-medium text-green-700">
                                        AI Diagnosis
                                    </p>
                                    <h4 className="mt-1 text-xl font-bold text-slate-900">
                                        {result.display_name}
                                    </h4>
                                </div>

                                <div className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                                    {result.confidence_percent}% Confidence
                                </div>
                            </div>

                            <div className="mt-5 grid gap-3 sm:grid-cols-2">
                                <div className="rounded-xl bg-white p-4">
                                    <p className="text-sm text-slate-500">
                                        Disease
                                    </p>
                                    <p className="mt-1 font-semibold text-slate-900">
                                        {result.disease}
                                    </p>
                                </div>

                                <div className="rounded-xl bg-white p-4">
                                    <p className="text-sm text-slate-500">
                                        Display Name
                                    </p>
                                    <p className="mt-1 font-semibold text-slate-900">
                                        {result.display_name}
                                    </p>
                                </div>

                                <div className="rounded-xl bg-white p-4">
                                    <p className="text-sm text-slate-500">
                                        Confidence
                                    </p>
                                    <p className="mt-1 font-semibold text-slate-900">
                                        {result.confidence_percent}%
                                    </p>
                                </div>

                                <div className="rounded-xl bg-white p-4">
                                    <p className="text-sm text-slate-500">
                                        Confidence Level
                                    </p>
                                    <p className="mt-1 font-semibold capitalize text-slate-900">
                                        {result.confidence_level}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4 rounded-xl bg-white p-4">
                                <p className="text-sm font-medium text-slate-500">
                                    Prediction Message
                                </p>
                                <p className="mt-1 text-slate-700">
                                    {result.confidence_message}
                                </p>
                            </div>

                            <div className="mt-4 rounded-xl bg-white p-4">
                                <p className="text-sm font-medium text-slate-500">
                                    Top Predictions
                                </p>

                                <div className="mt-3 space-y-3">
                                    {result.top_predictions.map((prediction) => (
                                        <div
                                            key={prediction.class_name}
                                            className="flex items-center justify-between gap-4"
                                        >
                                            <span className="font-medium text-slate-700">
                                                {prediction.display_name}
                                            </span>

                                            <span className="text-sm font-semibold text-slate-900">
                                                {prediction.confidence_percent}%
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
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