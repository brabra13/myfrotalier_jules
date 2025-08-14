'use client';

import React, { useState } from 'react';
import { FaUpload, FaFilePdf, FaFileImage, FaTrash } from 'react-icons/fa';

const DocumentUploader: React.FC = () => {
  const [selectedClient, setSelectedClient] = useState('Martin Dupont');
  const [files, setFiles] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  const recentDocuments = [
    { name: 'Avis imposition 2024.pdf', client: 'Martin Dupont', date: '15/07/2025', status: 'Traité' },
    { name: 'Contrat de travail.pdf', client: 'Sophie Bernard', date: '14/07/2025', status: 'En vérification' },
    { name: 'Relevé bancaire Q2.pdf', client: 'Thomas Moreau', date: '10/07/2025', status: 'Traité' },
    { name: 'Justificatif domicile.jpg', client: 'Camille Lefevre', date: '08/07/2025', status: 'En attente' },
  ];

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(prev => [...prev, ...droppedFiles]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...selectedFiles]);
    }
  };

  const removeFile = (fileName: string) => {
      setFiles(files.filter(f => f.name !== fileName));
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-gray-50 p-6 rounded-lg">
           <h3 className="font-semibold mb-4 text-gray-800">Sélection du client</h3>
           <select
             value={selectedClient}
             onChange={(e) => setSelectedClient(e.target.value)}
             className="w-full p-2 border-gray-300 rounded-md shadow-sm"
           >
             <option>Martin Dupont</option>
             <option>Sophie Bernard</option>
             <option>Thomas Moreau</option>
             <option>Camille Lefevre</option>
           </select>
        </div>
        <div className="lg:col-span-2">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-8 text-center ${isDragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
          >
            <FaUpload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
                Glissez-déposez vos fichiers ici ou{' '}
                <label htmlFor="file-upload" className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer">
                    parcourir
                </label>
            </p>
            <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple onChange={handleFileChange} />
            <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG jusqu'à 10MB</p>
          </div>
        </div>
      </div>

      {files.length > 0 && (
          <div>
              <h3 className="font-semibold mb-2">Fichiers à envoyer :</h3>
              <ul className="space-y-2">
                  {files.map((file, index) => (
                      <li key={index} className="flex items-center justify-between p-2 bg-gray-100 rounded-md">
                          <div className="flex items-center">
                            {file.type === 'application/pdf' ? <FaFilePdf className="text-red-500 mr-2" /> : <FaFileImage className="text-blue-500 mr-2" />}
                            <span>{file.name}</span>
                          </div>
                          <button onClick={() => removeFile(file.name)}><FaTrash className="text-gray-500 hover:text-red-600" /></button>
                      </li>
                  ))}
              </ul>
              <div className="text-right mt-4">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md">Envoyer</button>
              </div>
          </div>
      )}

      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">Documents récents</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow">
            <thead>
              <tr className="w-full bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <th className="px-6 py-3">Document</th>
                <th className="px-6 py-3">Client</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Statut</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {recentDocuments.map((doc, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="px-6 py-4">{doc.name}</td>
                  <td className="px-6 py-4">{doc.client}</td>
                  <td className="px-6 py-4">{doc.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      doc.status === 'Traité' ? 'bg-green-100 text-green-800' :
                      doc.status === 'En vérification' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {doc.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DocumentUploader;
