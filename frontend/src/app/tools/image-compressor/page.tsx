"use client";

import { useState, useRef } from "react";
import Link from "next/link";

export default function ImageCompressorPage() {
  const [targetKB, setTargetKB] = useState(100);
  const [fileName, setFileName] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultKB, setResultKB] = useState<number | null>(null);
  const [quality, setQuality] = useState(0.75);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const onFile = (f: File | null) => {
    if (!f) return;
    setFileName(f.name);
    if (f.type === "application/pdf") {
      // For now, show info — real PDF compression needs server
      setResultKB(null);
      setResultUrl(null);
      return;
    }
    const img = new Image();
    const url = URL.createObjectURL(f);
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      // keep original ratio, cap longest side 1200 for sane size
      const maxSide = 1200;
      let w = img.width;
      let h = img.height;
      if (Math.max(w, h) > maxSide) {
        const scale = maxSide / Math.max(w, h);
        w = w * scale;
        h = h * scale;
      }
      canvas.width = w;
      canvas.height = h;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, w, h);
      ctx.drawImage(img, 0, 0, w, h);
      canvas.toBlob(
        (blob) => {
          if (!blob) return;
          setResultKB(Math.round(blob.size / 1024));
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
        setResultUrl(URL.createObjectURL(blob));
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
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 text-xl shadow-md">🗜️</span>
            <div>
              <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">Image & PDF Compressor</h1>
              <p className="mt-1 max-w-2xl text-sm leading-relaxed text-blue-100/75">Bring JPG under the limit without losing clarity. PDF help coming next — for now, we’ll guide you.</p>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 -bottom-[1px] leading-none"><svg className="block h-[32px] w-full" viewBox="0 0 1440 40" preserveAspectRatio="none"><path d="M0,20 C360,40 720,0 1080,20 L1440,30 L1440,40 L0,40 Z" fill="#f8fafc" /></svg></div>
      </section>

      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">Target size</span>
              <span className="rounded-full bg-slate-900 text-white px-2.5 py-1 text-xs font-bold">~{targetKB} KB</span>
            </div>
            <input type="range" min={20} max={500} step={10} value={targetKB} onChange={(e) => setTargetKB(parseInt(e.target.value))} className="mt-3 w-full" />
            <div className="flex justify-between text-[11px] font-medium text-slate-500">
              <span>20 KB</span><span>200 KB</span><span>500 KB</span>
            </div>

            <div onClick={() => inputRef.current?.click()} className="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center hover:border-blue-300 hover:bg-blue-50/50 transition">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white border border-slate-200 shadow-sm">⬆️</div>
              <div className="mt-3 font-bold text-slate-900 text-sm">{fileName ? fileName : "Click to upload JPG/PNG (PDF guidance below)"}</div>
              <div className="text-xs text-slate-500">Runs in your browser. Your file stays private.</div>
              <input ref={inputRef} type="file" accept="image/*,application/pdf" className="hidden" onChange={(e) => onFile(e.target.files?.[0] || null)} />
            </div>

            <div className="mt-5 space-y-3">
              <label className="block">
                <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">Quality {Math.round(quality * 100)}% • {resultKB ? `~${resultKB} KB` : "—"}</span>
                <input type="range" min={0.3} max={0.95} step={0.02} value={quality} onChange={(e) => setQuality(parseFloat(e.target.value))} onMouseUp={recompress} onTouchEnd={recompress} className="w-full" />
              </label>
              {resultKB && <div className={`text-xs font-bold px-3 py-2 rounded-xl border ${resultKB <= targetKB ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-amber-50 text-amber-700 border-amber-200"}`}>{resultKB <= targetKB ? `✓ Within ~${targetKB} KB` : `~${resultKB} KB — lower quality a bit to hit ~${targetKB} KB`}</div>}
            </div>

            <canvas ref={canvasRef} className="hidden" />
            {resultUrl && (
              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 flex items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={resultUrl} alt="compressed" className="h-20 w-20 rounded-xl border border-slate-200 bg-white object-contain" />
                <div className="flex-1">
                  <div className="text-sm font-bold text-slate-900">Ready to download</div>
                  <div className="text-xs text-slate-500">JPEG • ~{resultKB} KB</div>
                  <a href={resultUrl} download={`sarkarlink-compressed.jpg`} className="mt-3 inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-700">Download ↓</a>
                </div>
              </div>
            )}

            {fileName?.toLowerCase().endsWith(".pdf") && (
              <div className="mt-6 rounded-2xl bg-amber-50 border border-amber-200 p-4">
                <div className="text-sm font-bold text-amber-800">PDF compression — coming soon in-browser</div>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">For now: open your PDF → Print → Save as PDF with lower quality, or use a desktop tool to bring it under {targetKB} KB. We’ll add true in-browser PDF shrinking next.</p>
              </div>
            )}
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
              <h3 className="text-sm font-bold text-slate-900">Tips</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li>• Photos: aim for 20–50 KB JPG.</li>
                <li>• Keep quality 70–85% for a clean, small file.</li>
                <li>• If still too big, we scaled to 1200px max — lower quality a touch.</li>
              </ul>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6">
              <h3 className="text-sm font-bold text-slate-900">Next steps</h3>
              <div className="mt-3 grid grid-cols-1 gap-2">
                <Link href="/tools/photo-resizer" className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold flex items-center justify-between hover:bg-white">Photo & Sign Resizer <span>→</span></Link>
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
