import { useUser } from '@clerk/clerk-react';
import DocumentTable from '../components/documentPage/DocumentTable.tsx'
import UploadFile from '../components/documentPage/UploadFile.tsx'
import PromoSection from '../components/documentPage/PromoSection.tsx'
import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';

type documentType = {
    document_name: string,
    status: number,
    ats_score: number
}

const DocumentsPage = () => {
    // To-do :- Complete this functionality 
    const { user } = useUser();
    const [documents, setdocuments] = useState<documentType[]>([]);
    let email: string | any = "";

    const getDocuments = async () => {
        try {
            email = user?.primaryEmailAddress?.emailAddress;
            const response = await fetch("http://localhost:8000/api/getDocuments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const result = await response.json();

            // Fetching only selected things from the documents
            const filteredDocs = (result.all_documents ?? []).map((doc: any) => ({
                document_name: doc.document_name,
                status: doc.status,
                ats_score: doc.ats_score,
            }));
            setdocuments(filteredDocs);
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    const callGetDocumentFunc = async () => {
        await getDocuments();
    }

    useEffect(() => {
        document.title = "Documents - Resume Analyzer";
        callGetDocumentFunc();
    }, [user]);

    return (
        <div className="min-h-screen px-6 md:px-16 py-10 bg-gradient-to-br from-[#ff00cc] via-[#7a33cc] to-[#333399] text-white overflow-x-hidden">
            <Toaster
                position="top-center"
                reverseOrder={true}
            />
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center drop-shadow-md">
                Your Document Summary
            </h1>

            {/* Documents Table */}
            <div className="mb-10">
                <DocumentTable documents={documents as any} />
            </div>

            {/* Upload Button Section */}
            <div className="mb-10 flex justify-center">
                <UploadFile />
            </div>

            {/* Promotional Section */}
            <PromoSection />
        </div>
    );
}

export default DocumentsPage