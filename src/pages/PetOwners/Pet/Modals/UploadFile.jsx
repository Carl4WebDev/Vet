import React from "react";
import { FileIcon, ImageIcon } from "lucide-react";

export default function UploadFile({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="w-full max-w-5xl bg-white rounded-xl overflow-y-auto border-2 shadow-lg p-6">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h1 className="text-2xl font-bold">File Upload</h1>
          <button
            onClick={onClose}
            className="text-sm bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
          >
            Close
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Upload Box */}
          <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg w-full h-48 bg-gray-200">
            <div className="text-center">
              <div className="text-blue-600 text-3xl mb-2">⬆️</div>
              <p className="text-gray-700">Drag Files to Upload</p>
            </div>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded shadow">
              Choose File
            </button>
          </div>

          {/* Upload Progress */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Uploading</h2>

            <FileProgress
              icon={<ImageIcon />}
              name="Photo.png"
              size="7.5 mb"
              percent={50}
              speed="90KB/sec"
            />
            <FileProgress
              icon={<FileIcon />}
              name="Docs.pdf"
              size="7.5 mb"
              percent={50}
              speed="90KB/sec"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function FileProgress({ icon, name, size, percent, speed }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-1">
        <div className="text-gray-700">{icon}</div>
        <div className="text-sm font-medium">
          {name} <span className="text-gray-500 font-normal">{size}</span>
        </div>
      </div>
      <div className="relative w-full h-2 bg-gray-300 rounded">
        <div
          className="absolute top-0 left-0 h-2 bg-indigo-500 rounded"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
      <div className="flex justify-between text-sm text-gray-600 mt-1">
        <span>{percent}% done</span>
        <span>{speed}</span>
      </div>
    </div>
  );
}
