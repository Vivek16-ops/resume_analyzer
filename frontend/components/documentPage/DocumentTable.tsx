type Document = {
    document_name: string;
    status: string;
    ats_score: number;
};

type DocumentTableProps = {
    documents?: Document[];
};

const DocumentTable = ({ documents = [] }: DocumentTableProps) => {
    const sampleDocs = documents;

    return (
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl overflow-hidden p-6">
            {sampleDocs.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center py-16 text-pink-300 space-y-4">
                    <svg
                        className="w-16 h-16 text-indigo-400"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4v16m8-8H4"
                        />
                    </svg>
                    <h2 className="text-xl font-semibold">No Documents Found</h2>
                    <p className="text-sm text-white/70">
                        Please upload a document to display here.
                    </p>
                </div>
            ) : (
                <table className="w-full text-left">
                    <thead className="bg-white/20 text-pink-300 uppercase text-sm tracking-wide">
                        <tr>
                            <th className="py-4 px-6">Document Name</th>
                            <th className="py-4 px-6">Status</th>
                            <th className="py-4 px-6">ATS Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sampleDocs.map((doc, index) => (
                            <tr
                                key={index}
                                className="border-t border-white/10 hover:bg-white/10 transition"
                            >
                                <td className="py-3 px-6">{doc.document_name}</td>
                                <td className="py-3 px-6 text-indigo-300 font-semibold">
                                    {doc.status}
                                </td>
                                <td className="py-3 px-6">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full ${doc.ats_score >= 80
                                                        ? "bg-green-400"
                                                        : doc.ats_score >= 60
                                                            ? "bg-yellow-400"
                                                            : "bg-red-400"
                                                    }`}
                                                style={{ width: `${doc.ats_score}%` }}
                                            />
                                        </div>
                                        <span className="text-pink-300 font-semibold">
                                            {doc.ats_score}%
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default DocumentTable
