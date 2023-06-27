import multiparty from 'multiparty'
import fs from 'fs'
import {PutObjectCommand, S3Client} from '@aws-sdk/client-s3'
import mime from 'mime-types'

const bucketName = 'sashank-ecommerce-admin';

export default async function Handle(req,res)
{
    const form = new multiparty.Form();
    const {fields,files} = await new Promise((resolve,reject) => {
        form.parse(req, (err,fields,files) => {
            resolve({fields,files})
        });
    });
    const client = new S3Client({
        region: 'ap-southeast-2',
        credentials : {
            accessKeyId : process.env.S3ACCESSKEY,
            secretAccessKey: process.env.S3SECRETACCESSKEY,
        },
    });
    const links = [];
    for(const file of files.file)
    {
        const extension = file.originalFilename.split('.').pop();
        const newFileName = Date.now() +'.'+ extension;
        await client.send(new PutObjectCommand({
            Bucket: bucketName,
            Key : newFileName,
            Body: fs.readFileSync(file.path),
            ACL: 'public-read',
            ContentType: mime.lookup(file.path),
        }));
         links.push(`https://${bucketName}.s3.amazonaws.com/${newFileName}`);
    }
    
    return res.json({links});
}

export const config = {
    api:{bodyParser:false},
}