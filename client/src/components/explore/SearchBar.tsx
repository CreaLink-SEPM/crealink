'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [query, setQuery] = useState<string>("");
  const router = useRouter();

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    router.replace(`/search?query=${query}`);
  };

  return (
    <div className="md:container ml-[8%] mb-5 h-[100%] mt-10">
      <form onSubmit={submit}>
        <input
          type="search"
          className="w-[80%] float-right mr-10 mb-3 flex-1 rounded-2xl h-16 p-5 text-slate-500 bg-muted outline-none"
          placeholder=" 🔍   Search for a user..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </form>
    </div>
  );
}
