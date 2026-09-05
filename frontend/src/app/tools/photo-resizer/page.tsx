"use client";

import { useState, useRef } from "react";
import Link from "next/link";

export default function PhotoResizerPage() {
  const [target, setTarget] = useState("photo"); // photo 20-50KB, sign 10-20KB
  const [quality, setQuality] = useState(0.82);
  const [fileName, setFileName] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultKB, setResultKB] = useState<number | null>(null);
  const [dims, setDims] = useState<{ w: number; h: number } | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const presets = {
    photo: { label: "Photo 20–50 KB", width: 350, height: 450, min: 20, max: 50 },
    sign: { label: "Signature 10–20 KB", width: 350, height: 150, min: 10, max: 20 },
  } as const;

  const current = presets[target as keyof typeof presets];

  const onFile = (f: File | null) => {
    if (!f) return;
    setFileName(f.name);
    const img = new Image();
    const url = URL.createObjectURL(f);
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      canvas.width = current.width;
      canvas.height = current.height;
      // white background for JPEG
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      // contain fit
      const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
      const w = img.width * scale;
      const h = img.height * scale;
      const x = (canvas.width - w) / 2;
      const y = (canvas.height - h) / 2;
      ctx.drawImage(img, x, y, w, h);
      canvas.toBlob(
        (blob) => {
          if (!blob) return;
          setResultKB(Math.round(blob.size / 1024));
          setDims({ w: canvas.width, h: canvas.height });
          setResultUrl(URL.createObjectURL(blob));
        },
        "image/jpeg",
        quality
      );
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  const recompress = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        setResultKB(Math.round(blob.size / 1024));
        setResultUrl(blob ? URL.createObjectURL(blob) : null);
      },
      "image/jpeg",
      quality
    );
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="relative overflow-hidden bg-[#070b1d] text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-[#070b1d] via-[#0c1d4a] to-[#1a3391]" />
        <div className="bg-grid-dark absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_75%_55%_at_50%_0%,black,transparent)]" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 py-10 sm:py-12">
          <Link href="/tools" className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-200 hover:text-white">← All Tools</Link>
          <div className="mt-4 flex items-start gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-500 text-xl shadow-md">🖼️</span>
            <div>
              <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">Photo & Sign Resizer</h1>
              <p className="mt-1 max-w-2xl text-sm leading-relaxed text-blue-100/75">Right size, right dimensions, first try — for SSC, Railway, UPSC and every state form. Runs in your browser, stays private.</p>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 -bottom-[1px] leading-none"><svg className="block h-[32px] w-full" viewBox="0 0 1440 40" preserveAspectRatio="none"><path d="M0,20 C360,40 720,0 1080,20 L1440,30 L1440,40 L0,40 Z" fill="#f8fafc" /></svg></div>
      </section>

      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm">
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setTarget("photo")} className={`rounded-full px-4 py-2 text-xs font-bold border ${target === "photo" ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-700 border-slate-200"}`}>Photo 20–50 KB • 350×450</button>
              <button onClick={() => setTarget("sign")} className={`rounded-full px-4 py-2 text-xs font-bold border ${target === "sign" ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-700 border-slate-200"}`}>Signature 10–20 KB • 350×150</button>
            </div>

            <div
              onClick={() => inputRef.current?.click()}
              className="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center hover:border-blue-300 hover:bg-blue-50/50 transition"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white border border-slate-200 shadow-sm">⬆️</div>
              <div className="mt-3 font-bold text-slate-900 text-sm">{fileName ? fileName : "Click to upload JPG/PNG"}</div>
              <div className="text-xs text-slate-500">Your file never leaves your device. We resize in your browser.</div>
              <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => onFile(e.target.files?.[0] || null)} />
            </div>

            <div className="mt-5 space-y-3">
              <label className="block">
                <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">Quality {Math.round(quality * 100)}% • {resultKB ? `~${resultKB} KB` : "—"}</span>
                <input type="range" min={0.4} max={0.95} step={0.02} value={quality} onChange={(e) => setQuality(parseFloat(e.target.value))} onMouseUp={recompress} onTouchEnd={recompress} className="w-full" />
              </label>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Target: {current.min}–{current.max} KB • {current.width}×{current.height}px</span>
                {resultKB && <span className={`font-bold px-2 py-1 rounded-full text-xs ${resultKB >= current.min && resultKB <= current.max ? "bg-emerald-100 text-emerald-700 border border-emerald-200" : "bg-amber-100 text-amber-700 border border-amber-200"}`}>{resultKB >= current.min && resultKB <= current.max ? "✓ In range" : "Adjust quality ↓/↑"}</span>}
              </div>
            </div>

            <canvas ref={canvasRef} className="hidden" />
            {resultUrl && dims && (
              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 flex flex-col sm:flex-row gap-4 items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={resultUrl} alt="resized" className="rounded-xl border border-slate-200 bg-white max-h-40 object-contain" />
                <div className="flex-1">
                  <div className="text-sm font-bold text-slate-900">{current.label}</div>
                  <div className="text-xs text-slate-500">{dims.w}×{dims.h}px • JPEG • ~{resultKB} KB</div>
                  <a href={resultUrl} download={`sarkarlink-${target}.jpg`} className="mt-3 inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-700">
                    Download JPEG ↓
                  </a>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
              <h3 className="text-sm font-bold text-slate-900">Most forms ask for</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li>• Photo: 20–50 KB, JPG, ~3.5×4.5 cm</li>
                <li>• Sign: 10–20 KB, JPG, ~3.5×1.5 cm</li>
                <li>• Keep background light; avoid shadows.</li>
              </ul>
              <p className="mt-3 text-xs text-slate-500">If it’s over the max, lower quality a touch and re-download. If under min, raise quality a bit.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6">
              <h3 className="text-sm font-bold text-slate-900">Next steps</h3>
              <div className="mt-3 grid grid-cols-1 gap-2">
                <Link href="/tools/image-compressor" className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold flex items-center justify-between hover:bg-white">Compress PDF/JPG <span>→</span></Link>
                <Link href="/category/latest-job" className="rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white flex items-center justify-between hover:bg-slate-800">Browse jobs <span>→</span></Link>
                <Link href="/tools" className="text-xs font-bold text-slate-500 hover:text-slate-700 text-center">← Back to all tools</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
