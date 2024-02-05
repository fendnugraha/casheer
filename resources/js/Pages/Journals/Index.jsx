import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, Head } from '@inertiajs/react';

export default function Index({ journals, filters, title, description, auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{title}</h2>}
        >
            <Head title="Journals" />

            <div className="py-5">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <p className="py-2">{description}</p>
            
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Title</th>
                        <th className="py-2 px-4 border-b">Created</th>
                        <th className="py-2 px-4 border-b">Updated</th>
                    </tr>
                </thead>
                <tbody>
                    {journals.map((journal) => (
                        <tr key={journal.id}>
                            <td className="py-2 px-4 border-b">{journal.date_issued}</td>
                            <td className="py-2 px-4 border-b">{journal.description}</td>
                            <td className="py-2 px-4 border-b">{journal.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
