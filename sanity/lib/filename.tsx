"use client"

import type React from "react"
import { useEffect, useState, useCallback } from "react"
import type { StringInputProps } from "sanity"
import { TextInput, Stack, Text, Button, Flex } from "@sanity/ui"
import { DocumentIcon } from "@sanity/icons"
import { useClient, useFormValue } from "sanity"
import { client } from "./client"

interface FormValueAutoFillInputProps extends StringInputProps {}

export default function AutoFill(props: any) {
  const {value, onChange, elementProps, validation, path } = props
  const [localValue, setLocalValue] = useState(value || "")
  const [detectedFileName, setDetectedFileName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  console.log(value, onChange)
  // Get the full form values
  const formValue = useFormValue([])

  // Get the images array from the form
  const imagesArray = useFormValue(["images"])

  const getFilename = useCallback(
    async (assetRef: string): Promise<string | null> => {
      const type = assetRef.startsWith("file-") ? "sanity.fileAsset" : "sanity.imageAsset"

      try {
        const asset = await client.fetch(`*[_type == $type && _id == $id][0]{originalFilename}`, { type, id: assetRef })

        if (!asset?.originalFilename) return null
        return asset.originalFilename.replace(/\.[^/.]+$/, "")
      } catch (error) {
        console.error("Error fetching asset:", error)
        return null
      }
    },
    [client],
  )

  const extractFileName = useCallback(async () => {
    if (!imagesArray || !Array.isArray(imagesArray)) {
      console.log("No images array found")
      return ""
    }

    // Find the current item by _key
    const currentKey = path[1]?._key
    if (!currentKey) {
      console.log("No _key found in path")
      return ""
    }

    const currentItem = imagesArray.find((item: any) => item._key === currentKey)

    if (!currentItem) {
      console.log("Current item not found")
      return ""
    }

    // Get asset reference for images vs video
    let assetRef = ""
    if (currentItem.asset?._ref) {
      assetRef = currentItem.asset._ref
      //video files
    } else if (currentItem.file?.asset?._ref) {
      assetRef = currentItem.file.asset._ref
    }

    if (!assetRef) return ""

    // Fetch filename
    const filename = await getFilename(assetRef)
    return filename || ""
  }, [imagesArray, path, getFilename])

  //runs when autofilling
  const updateFileName = useCallback(async () => {
    setIsLoading(true)
    try {
      const fileName = await extractFileName()
      setDetectedFileName(fileName)
      //Auto-fill if field is empty
      if (fileName && !localValue) {
        setLocalValue(fileName)
        onChange(fileName)
      }
    } catch (error) {
      console.error("Error extracting filename:", error)
    } finally {
      setIsLoading(false)
    }
  }, [extractFileName, localValue, onChange])

  useEffect(() => {
    updateFileName()
  }, [updateFileName])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setLocalValue(newValue)
    onChange(newValue)
  }

  const handleAutoFill = async () => {
    await updateFileName()
    if (detectedFileName) {
      setLocalValue(detectedFileName)
      onChange(detectedFileName)
    }
  }

  return (
    <Stack space={2}>
      <Flex gap={2} align="center">
        <TextInput
          {...elementProps}
          value={localValue}
          onChange={handleChange}
          placeholder="Name will auto-fill from filename"
          style={{ flex: 1 }}
        />
        <Button
          icon={DocumentIcon}
          mode="ghost"
          tone="primary"
          onClick={handleAutoFill}
          disabled={isLoading}
          loading={isLoading}
          title={detectedFileName ? `Auto-fill with: ${detectedFileName}` : "Click to detect filename"}
          text="Auto-fill"
        />
      </Flex>

      {detectedFileName && detectedFileName !== localValue && (
        <Text size={1} muted>
          Available: {detectedFileName}
        </Text>
      )}

      {!detectedFileName && !isLoading && (
        <Text size={1} muted>
          Upload a file to enable auto-fill
        </Text>
      )}

      {validation.length > 0 && (
        <Text size={1}>
          {validation[0].message}
        </Text>
      )}
    </Stack>
  )
}
