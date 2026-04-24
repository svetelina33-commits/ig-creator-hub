import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";

const ALLOWED_CONTENT_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/heic",
  "application/pdf",
  "text/plain",
];

const MAX_BYTES = 10 * 1024 * 1024;

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session.creatorId) {
    return NextResponse.json({ error: "not_signed_in" }, { status: 401 });
  }

  const body = (await request.json()) as HandleUploadBody;

  try {
    const json = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: ALLOWED_CONTENT_TYPES,
        maximumSizeInBytes: MAX_BYTES,
        addRandomSuffix: true,
        tokenPayload: JSON.stringify({ creatorId: session.creatorId }),
      }),
      onUploadCompleted: async () => {
        // No-op: the ticket POST records the final URL into support_tickets.
      },
    });
    return NextResponse.json(json);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "upload_failed" },
      { status: 400 },
    );
  }
}
