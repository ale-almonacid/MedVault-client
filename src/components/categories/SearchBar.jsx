import React from 'react'

//Shadcn
import { Field} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

//icons
import { Search, X } from "lucide-react"


function SearchBar(props) {

    //Search functionality
    function handleSearch(e){
    props.setQuery(e.target.value);
    }

  return (
     <Field className="max-w-xs">
      <div className="relative">
        <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
        id="input-button-group"
        onChange={handleSearch}
        type="search"
        value={props.query}
        placeholder="Type to search..."
        className="pl-8 pr-8 [&::-webkit-search-cancel-button]:hidden" />
        {props.query && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => props.setQuery("")}
            className="absolute top-1/2 right-2.5 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        )}
      </div>
    </Field>
  )
    
}

export default SearchBar