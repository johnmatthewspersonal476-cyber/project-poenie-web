import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    const id = `upload-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`

    return NextResponse.json({
      id,
      filename: file.name,
      size: file.size,
      mimeType: file.type,
      uploadedAt: new Date().toISOString(),
    })
  } catch {
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    )
  }
}
