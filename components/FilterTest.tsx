"use client";

import { useState } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";

export default function TestFilter() {
  const options = ["Diesel", "Petrol", "Electric"];
  const [selected, setSelected] = useState(options[0]);

  return (
    <div className="w-48">
      <Listbox value={selected} onChange={setSelected}>
        <ListboxButton className="w-full rounded-md border p-2 bg-white">
          {selected}
        </ListboxButton>
        <ListboxOptions className="mt-1 w-full rounded-md border bg-white shadow-lg">
          {options.map((option) => (
            <ListboxOption
              key={option}
              value={option}
              className="cursor-pointer p-2 hover:bg-blue-500 hover:text-white"
            >
              {option}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  );
}
