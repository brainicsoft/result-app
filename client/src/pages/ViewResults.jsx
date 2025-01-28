import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas-pro';
import logo from '../assets/images/logo.png'

const ViewResults = () => {
    const handleDownloadPDF = async () => {
        const capture = document.querySelector('.actual-result');
        html2canvas(capture, {
            backgroundColor: null, // Prevent background from being captured
            scale: 2, // Increase resolution if needed
            useCORS: true, // Enable CORS for loading images
        }).then((canvas) => {
            const imgData = canvas.toDataURL('img/png');
            const doc = new jsPDF('p', 'mm', 'a4');
            const componentWidth = doc.internal.pageSize.getWidth();
            const componentHeight = doc.internal.pageSize.getHeight();
            doc.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);
            doc.save('receipt.pdf');
        });
    };

    return (
        <div className="my-8">
            {/* A4 size wrapper */}
            <div
                id="results-container"
                className="w-[210mm] h-[297mm] mx-auto border border-gray-100 bg-white p-8 shadow-md actual-result relative"
            >
                <div className=" p-8 rounded-lg  ">

                    {/* Content Container */}
                    <div className="relative z-10">
                        {/* Header */}
                        <div className="text-center mb-8 flex flex-col items-center ">
                            <img
                                src={logo}
                                alt="University Logo"
                                className="w-[200px] h-[100px] mb-4 object-contain"
                            />
                            <h1 className="text-2xl mb-1 font-bold  ">University of Asia Pacific - UAP</h1>
                            <p className=""> 74/A, Green Road, Farmgate/</p>
                            <p> Dhaka-1205, Bangladesh.</p>
                        </div>

                        {/* Student Info */}
                        <div className="mb-8 space-y-1">
                            <div className="flex flex-col gap-2">
                                <div className="flex">
                                    <div className='flex justify-between'>
                                        <span className="font-semibold min-w-[170px]  text-gray-800">Student's ID Number</span>
                                        <span className="font-semibold  text-gray-800 pr-1">:</span>
                                    </div>
                                    <span className=" text-gray-800"> 111011534</span>
                                </div>
                                <div className="flex">
                                    <div className='flex justify-between'>
                                        <span className="font-semibold min-w-[170px]  text-gray-800">Name of Student</span>
                                        <span className="font-semibold  text-gray-800 pr-1">:</span>
                                    </div>
                                    <span className=" text-gray-800"> MD. FARHAD HOSSAIN</span>
                                </div>
                                <div className="flex">
                                    <div className='flex justify-between'>
                                        <span className="font-semibold min-w-[170px]  text-gray-800">Name of Program</span>
                                        <span className="font-semibold  text-gray-800 pr-1">:</span>
                                    </div>

                                    <span className=" text-gray-800"> B.A (Hons) in Apparel Manufacturing Management & Technology</span>
                                </div>
                            </div>
                        </div>


                        {/* Results Table */}
                        <div className="overflow-hidden border border-gray-200 rounded">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="px-8 py-2 text-left text-lg font-semibold text-gray-900 border-b">
                                            CGPA
                                        </th>
                                        <th className="px-8 py-2 text-right text-lg font-semibold text-gray-900 border-b">
                                            Result
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>

                                    <tr className=" border-b last:border-b-0">
                                        <td className="px-8 py-2 text-lg text-gray-900">3.00</td>
                                        <td className="px-8 py-2 text-lg text-gray-900 text-right">
                                            Pass
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {/* Centered Watermark */}
                <div className="absolute z-20 inset-0 flex items-center justify-center pointer-events-none">
                    <img
                        src={logo}
                        alt="University Logo"
                        className="w-[500px] h-full object-contain opacity-10"
                    />
                </div>
            </div>

            {/* PDF Download Button */}
            <div className="text-center mt-8">
                <button
                    onClick={handleDownloadPDF}
                    className="px-6 py-3 bg-blue-600 text-white text-lg rounded-lg shadow hover:bg-blue-700"
                >
                    Download PDF
                </button>
            </div>
        </div>
    );
};

export default ViewResults;
