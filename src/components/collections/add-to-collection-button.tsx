'use client'

import { useState } from 'react'
import Link from 'next/link'

interface AddToCollectionButtonProps {
  collectionId: string
}

export function AddToCollectionButton({ collectionId }: AddToCollectionButtonProps) {
  return (
    <Link
      href={`/collections/${collectionId}/add`}
      className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm"
    >
      Add Prompts
    </Link>
  )
}
