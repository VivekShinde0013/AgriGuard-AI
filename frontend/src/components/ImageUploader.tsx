"use client";

import { useRef, useState } from "react";

export default function ImageUploader() {
    const inputRef = useRef<HTMLInputElement>(null);
    const [image, setImage] = useState<string | null>(null);
    const [fileName, setFileName] = useState("");
    const [scanning, setScanning] = useState(false);
    const [result, setResult] = useState<string | null>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file) return;

        setFileName(file.name);
        setImage(URL.createObjectURL(file));
        setResult(null);
    };

    const handleChooseImage = () => {
        inputRef.current?.click();
    };

    const handleRemove = () => {
        setImage(null);
        setFileName("");
        setResult(null);

        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

    const handleScan = () => {
        setScanning(true);
        setResult(null);

        setTimeout(() => {
            setScanning(false);
            setResult("Healthy crop detected");
        }, 2000);
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

                    {result && (
                        <div className="mt-5 w-full rounded-lg bg-green-50 p-4 text-left">
                            <p className="text-sm font-medium text-green-700">
                                Scan Result
                            </p>

                            <p className="mt-1 font-semibold text-green-900">
                                {result}
                            </p>
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