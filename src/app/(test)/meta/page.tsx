'use client';
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import { api } from "@/trpc/react";
import { type MetaOutput } from '@/types';
import { useRouter } from 'next/navigation';

const Meta = () => {
    const router = useRouter();
    const { query } = router;

    const defaultUrl = 'https://web.dev/blog/join-us-for-passkeys-week?hl=en'

    // Extract the URL and query parameters from the query
    const urlFromQuery = query?.url ? decodeURIComponent(query?.url) : defaultUrl;

    const [url, setUrl] = useState<string>(urlFromQuery);
    const [metaData, setMetaData] = useState<MetaOutput | null>(null);

    const searchMeta = api.meta.metaScrape.useMutation({
        onSuccess: ({ result }) => {
            setMetaData(result);
        },
        onError: (err) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            const errorMessage = JSON.parse(err.message.toString())?.[0].message as string;
            alert(errorMessage);
        },
    });

    useEffect(() => {
        // When the URL query parameter changes, update the 'url' state
        setUrl(urlFromQuery);
        if (urlFromQuery) {
            searchMeta.mutate({ url: urlFromQuery });
        }
    }, [urlFromQuery]);

    // Function to open the link when clicked
    const handleOpenLink = () => {
        if (metaData) {
            window.open(metaData.ogUrl, '_blank');
        }
    };

    return (
        <div className="max-w-xl mx-auto my-10">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    // Update the URL query parameter when the form is submitted
                    router.push(`/meta?url=${encodeURIComponent(url)}`);
                    searchMeta.mutate({ url });
                }}
                className="flex flex-col gap-2"
            >
                <input
                    type="text"
                    placeholder="URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full rounded-full px-4 py-2 text-black"
                />
                <button
                    type="submit"
                    className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover-bg-white/20"
                    disabled={searchMeta.isLoading}
                >
                    {searchMeta.isLoading ? "Submitting..." : "Submit"}
                </button>
            </form>


            {metaData && (
                <div
                    className="cursor-pointer" // Add cursor pointer to indicate it's clickable
                    onClick={handleOpenLink} // Open the link on click
                >
                    <a
                        className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm-p-6 lg-p-8 mt-4"
                    >
                        <span
                            className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
                        ></span>

                        <div className="sm-flex sm-justify-between sm-gap-4">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 sm-text-xl">
                                    {metaData.ogTitle}
                                </h3>

                                <p className="mt-1 text-xs font-medium text-gray-600">
                                    {metaData.ogSiteName}
                                </p>
                            </div>

                            <div className="hidden sm:block sm:shrink-0">
                                <img
                                    alt="OG Image"
                                    src={metaData?.ogImage[0].url}
                                    className="h-52 w-full rounded-lg object-cover shadow-lg shadow-gray-100"
                                />
                            </div>
                        </div>

                        <div className="mt-4">
                            <p className="max-w-40ch text-sm text-gray-500">
                                {metaData.ogDescription}
                            </p>
                        </div>

                        <dl className="mt-6 flex gap-4 sm-gap-6">
                            <div className="flex flex-col">
                                <dt className="text-sm font-medium text-gray-600">OG Date:</dt>
                                <dd className="text-xs text-gray-500">
                                    {JSON.stringify(metaData.ogDate)}
                                </dd>
                            </div>
                        </dl>
                    </a>
                </div>
            )}
        </div>
    );
}

export default Meta;
