// import nextConnect from 'next-connect';
// import upload from '@/lib/mutler';
// import type { NextApiRequest, NextApiResponse } from 'next';

// const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
//   onError(error: { message: any; }, req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; }): void; new(): any; }; }; }) {
//     res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
//   },
//   onNoMatch(req: { method: any; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; }): void; new(): any; }; }; }) {
//     res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
//   },
// });

// apiRoute.use(upload.single('file'));

// apiRoute.post((req: { file: any; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { url: any; }): void; new(): any; }; }; }) => {
//   res.status(200).json({ url: (req.file as any).location });
// });

// export default apiRoute;

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };
