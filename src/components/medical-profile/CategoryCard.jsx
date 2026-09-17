import React from 'react'
import { Link } from "react-router-dom"

import categories from "@/constants/categories"
import { cn } from "@/lib/utils"

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function CategoryCard({ categoryId, selected, onClick, to }) {

  const category = categories.find((item) => item.id === categoryId)

  if (!category) {
    return null
  }

  const isSelectable = typeof onClick === "function"
  const Wrapper = to ? Link : React.Fragment
  const wrapperProps = to ? { to } : {}

  return (
    <Wrapper {...wrapperProps}>
      <Card
        onClick={onClick}
        className={cn(
          "flex flex-row items-center gap-4  p-4 shadow-none",
          (isSelectable || to) && "cursor-pointer transition-colors hover:bg-accent",
          selected && "border-primary bg-primary/5"
        )}
      >
        <div
          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg text-2xl"
          style={{ backgroundColor: `${category.color}33` }}
        >
          <span>{category.icon}</span>
        </div>

            <div className='flex flex-col'>

          <CardTitle className="text-lg">{category.name}</CardTitle>
          <CardDescription>{category.description}</CardDescription>
            </div>
        
      </Card>
    </Wrapper>
  )
}

export default CategoryCard
