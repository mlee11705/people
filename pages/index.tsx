import React, { useState } from "react"
import Head from "next/head"
import { Layout } from "@/components/layout"
import { Combobox } from '@headlessui/react'

type SearchResponse = {
  matches: object[]
  num_matches: number
  search_time_ms: number
}

async function search(query: string) {
  const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
  const data = await response.json();
  return data;
}

export default function IndexPage() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchTime, setSearchTime] = useState(0);
  const [numMatches, setNumMatches] = useState(-1);
  const [matches, setMatches] = useState([]);

  const handleSearch = async (query: string) => {
    setLoading(true);
    const results: SearchResponse = await search(query);
    setSearchTime(Math.round(results.search_time_ms));
    setNumMatches(Math.round(results.num_matches));
    setMatches(results.matches);
    setLoading(false);
  }

  return (
    <Layout>
      <Head>
        <title>Cerebral Valley Search</title>
        <meta name="Cerebral Valley" content="Cerebral Valley" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="container grid items-center gap-6 pt-10 pb-8 md:py-12">
        <div className="flex flex-col items-center gap-2">
          <h1 className="mt-6 mb-12 max-w-[450px] text-center font-sans text-4xl text-slate-700 dark:text-white">
            Search for some People
          </h1>
        </div>
        <div className="border border-[#2d3035] rounded-xl lg:mx-64 dark:bg-[#161718] dark:border-[#4c4c4c]">
          <Combobox>
            <div className="flex items-center">
              <Combobox.Input
                className="h-12 w-full border-0 bg-transparent pl-5 pr-4 py-2.5 text-white placeholder:text-white placeholder:opacity-30 focus:ring-0 dark:focus:ring-0 focus:outline-none text-sm"
                placeholder="Search for people in Cerebral Valley..."
                onChange={(event) => {
                  setQuery(event.target.value);
                }}
                onKeyDown={async (event) => {
                  if (event.key === 'Enter') {
                    await handleSearch(query);
                  }
                }}
              />
              <button
                // className={`absolute ${query ? 'opacity-90 transition-opacity duration-250' : 'opacity-10 transition-opacity duration-250'} md:bottom-2.5 md:right-4 dark:hover:bg-gray-900 dark:disabled:hover:bg-transparent right-2 dark:disabled:bg-white disabled:bg-black disabled:opacity-10 disabled:text-gray-400 enabled:bg-black text-white border border-black rounded-lg dark:border-white dark:bg-white bottom-1.5`}
 className={`${query ? 'opacity-90 transition-opacity duration-250' : 'opacity-10 transition-opacity duration-250'} max-h-30 max-w-32 mr-[10px] dark:hover:bg-gray-900 dark:disabled:hover:bg-transparent dark:disabled:bg-white disabled:bg-black disabled:opacity-10 disabled:text-gray-400 enabled:bg-black text-white border border-black rounded-lg dark:border-white dark:bg-white`}

                data-testid="send-button"
                onClick={async () => await handleSearch(query)}
              >
                <span className="" data-state="closed">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="text-white dark:text-black">
                    <path d="M7 11L12 6L17 11M12 18V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </span>
              </button>
            </div>
          </Combobox>
        </div>
        {loading && (
          <div className="flex justify-center items-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0116 0H4z"></path>
            </svg>
            Loading...
          </div>
        )}
        <div className="overflow-x-auto">
        <div className="opacity-20 my-6" style={{ display: 'flex', alignItems: 'center' }}>
  <p>
    {numMatches > -1 && !loading && <span>{numMatches} results</span>}
    {searchTime > 0 && !loading && numMatches > -1 && !loading && <span> in </span>}
    {searchTime > 0 && !loading && <span>{searchTime / 1000} seconds</span>}
  </p>
</div>


{matches.length > 0 && !loading && (
  <div>
  {matches.map((match, index) => (
    <div key={index} className="match-details grid auto-rows-fr grid-cols-1 gap-6 md:grid-cols-1 mb-4">
      {/* Simple summary for each match */}
      <div
   className="group relative block space-y-4 rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-950/[0.05] transition dark:bg-[#1F2024] dark:ring-0 after:pointer-events-none after:z-50 after:rounded-2xl after:dark:absolute after:dark:inset-0 after:dark:shadow-[inset_0px_1px_0px_rgba(255,255,255,0.06),inset_0px_-1px_0px_rgba(255,255,255,0.02),inset_1px_0px_0px_rgba(255,255,255,0.03),inset_-1px_0px_0px_rgba(255,255,255,0.03)]">
      <div className="space-y-4">
    <h3 className="text-lg tracking-tight text-black dark:text-white">{match.document.name.replace(/"/g, '')}</h3>
  </div>
      <p className="text-sm/6 tracking-tight text-black/60 dark:text-white/60">{match.document.location_name.replace(/"/g, '')}</p>
      {/* Collapsible JSON detail view */}
      <details>
        <summary>View Full Details</summary>
        <pre className="whitespace-pre-wrap">{JSON.stringify(match, null, 2)}</pre>
      </details>
      </div>
    </div>
  ))}
</div>


)}
</div>

      </section>
    </Layout>
  )
}
