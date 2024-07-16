// src/app/api/s3-aws/route.ts

import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    },
});

export async function POST(request: Request) {
    try {
        const session = await getAuthSession();

        if (!session?.user) return NextResponse.json("Unauthorized", { status: 401 });

        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) return NextResponse.json('No file provided', { status: 400 });

        const buffer = Buffer.from(await file.arrayBuffer());
        const fileName = await uploadImageToS3(buffer, file.name);

        return NextResponse.json({ url: fileName });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error uploading file' }, { status: 500 });
    }
}

async function uploadImageToS3(file: Buffer, fileName: string) {
    const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `${Date.now()}_${fileName}`,
        Body: file,
        ContentType: "image/jpeg",
    };

    const command = new PutObjectCommand(params);
    await client.send(command);
    return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;
}
