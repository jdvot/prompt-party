'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface AvatarUploadProps {
  userId: string
  currentAvatarUrl?: string | null
}

export function AvatarUpload({ userId, currentAvatarUrl }: AvatarUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState(currentAvatarUrl)
  const router = useRouter()
  const supabase = createClient()

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('Image must be less than 2MB')
      return
    }

    setIsUploading(true)

    try {
      // Create a unique file name
      const fileExt = file.name.split('.').pop()
      const fileName = `${userId}-${Date.now()}.${fileExt}`
      const filePath = `avatars/${fileName}`

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true })

      if (uploadError) throw uploadError

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from('avatars').getPublicUrl(filePath)

      // Update profile
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', userId)

      if (updateError) throw updateError

      setPreviewUrl(publicUrl)
      router.refresh()
    } catch (error) {
      console.error('Error uploading avatar:', error)
      alert('Failed to upload avatar. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="flex items-center gap-6">
      <div className="w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-2xl overflow-hidden">
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Avatar preview"
            className="w-full h-full object-cover"
          />
        ) : (
          'A'
        )}
      </div>
      <div>
        <label className="cursor-pointer inline-block px-4 py-2 border rounded-md hover:bg-accent transition-colors">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={isUploading}
            className="hidden"
          />
          {isUploading ? 'Uploading...' : 'Change Avatar'}
        </label>
        <p className="text-xs text-muted-foreground mt-2">
          JPG, PNG or GIF. Max 2MB.
        </p>
      </div>
    </div>
  )
}
