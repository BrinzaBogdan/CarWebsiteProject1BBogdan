"use client";

import { useState, Fragment } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { manufacturers } from '@/constants';
import { Combobox, Transition } from '@headlessui/react';
import { SearchManufacturerProps } from '@/types';

const SearchManufacturer = ({ manufacturer, setManufacturer }: SearchManufacturerProps) => {
    const [query, setQuery] = useState('');
    const router = useRouter();
    const searchParams = useSearchParams();

    const filteredManufacturers =
        query === ''
            ? manufacturers
            : manufacturers.filter((item) =>
                  item.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, ''))
              );


    const updateSearchParams = (manufacturer: string) => {
        const model = searchParams.get('model') || '';
        const params = new URLSearchParams();
        if (model) params.set('model', model);
        if (manufacturer) params.set('manufacturer', manufacturer);

        router.push(`/?${params.toString()}`);
    };

    return (
        <div className="search-manufacturer">
            <Combobox
                value={manufacturer}
                onChange={(value) => {
                    setManufacturer(value);
                    updateSearchParams(value); 
                }}
            >
                <div className="relative w-full">
                    <Combobox.Button className="absolute top-[14px]">
                        <Image
                            src="/car-logo.svg"
                            width={20}
                            height={20}
                            className="ml-4"
                            alt="Car Logo"
                        />
                    </Combobox.Button>

                    <Combobox.Input
                        className="search-manufacturer_input"
                        placeholder="Volkswagen"
                        displayValue={(manufacturer: string) => manufacturer}
                        onChange={(e) => setQuery(e.target.value)}
                    />

                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery('')}
                    >
                        <Combobox.Options>
                            {filteredManufacturers.length === 0 && query !== '' ? (
                                <Combobox.Option value={query} className="search-manufacturer__option">
                                    Create "{query}"
                                </Combobox.Option>
                            ) : (
                                filteredManufacturers.map((item) => (
                                    <Combobox.Option
                                        key={item}
                                        value={item}
                                        className={({ active }) =>
                                            `relative search-manufacturer__option ${
                                                active ? 'bg-primary-blue text-white' : 'text-gray-900'
                                            }`
                                        }
                                    >
                                        {item}
                                    </Combobox.Option>
                                ))
                            )}
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
        </div>
    );
};

export default SearchManufacturer;
