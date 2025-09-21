import React, { useEffect, useState } from 'react'
import { set, unset, useFormValue } from 'sanity'
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '01jwvji0',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-07-01',
})

export default function TestComponent(props: any) {
  const { value, onChange, path } = props

  const parentPath = path.slice(0, -1)
  const parent: any = useFormValue(parentPath)
  const [filename, setFilename] = useState<string | null>(null)
  const assetRef = parent?.asset?._ref

  useEffect(() => {
    async function fetchFilename(ref: string) {
      if (!ref) return setFilename(null)
      const type = ref.startsWith('file-') ? 'sanity.fileAsset' : 'sanity.imageAsset'
      const asset = await client.fetch(
        `*[_type == $type && _id == $id][0]{originalFilename}`,
        { type, id: ref }
      )
      setFilename(asset?.originalFilename ? asset.originalFilename.replace(/\.[^/.]+$/, '') : null)
    }
    if (assetRef) {
      fetchFilename(assetRef)
    } else {
      setFilename(null)
    }
  }, [assetRef])

  // Autofill automatically when filename is available and name is empty
  useEffect(() => {
    if (filename && !value) {
      onChange(set(filename))
    }
    // Only runs when filename or value changes
  }, [filename, value, onChange])

  // Manual autofill function
  const autofillName = () => {
    if (filename) {
      onChange(set(filename))
    }
  }

  return (
    <div style={{ display: 'flex', gap: '0.5em', alignItems: 'center' }}>
      <input
      className='border border-gray-400 border-[.1px] rounded bg-transparent'
        type="text"
        value={value || ''}
        onChange={e => e.target.value ? onChange(set(e.target.value)) : onChange(unset())}
        placeholder="Name (auto-filled from filename)"
        style={{ padding: '0.5em', width: '100%' }}
      />
      <button
        type="button"
        onClick={autofillName}
        style={{ padding: '0.5em' }}
        disabled={!filename}
      >
        Autofill
      </button>
    </div>
  )
}