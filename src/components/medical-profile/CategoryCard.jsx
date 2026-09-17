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

  const card = (
    <Card
      onClick={onClick}
      className={cn(
        "flex flex-row items-center gap-4 border p-4 shadow-none",
        (isSelectable || to) && "cursor-pointer transition-colors hover:bg-accent",
        selected && "border-primary bg-primary/5"
      )}
    >
      <div
        id='iconWrapper'
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-2xl"
        style={{ backgroundColor: `${category.color}33` }}
      >
        <span>{category.icon}</span>
      </div>

      <CardHeader className="gap-1 p-0">
        <CardTitle className="text-lg">{category.name}</CardTitle>
        <CardDescription>{category.description}</CardDescription>
      </CardHeader>
    </Card>
  )

  if (to) {
    return <Link to={to}>{card}</Link>
  }

  return card
}

export default CategoryCard
