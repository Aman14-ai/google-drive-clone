'use server'
import { ID } from "node-appwrite";
import { createAdminClient } from "../appwrite"
import { appwriteConfig } from "../appwrite/config";
import { handleError } from "./user.action";
import { InputFile } from "node-appwrite/file";
import { constructFileUrl, getFileType, parseStringify } from "../utils";
import { revalidatePath } from "next/cache";

export const uploadFile = async({file , ownerId , accountId , path}: UploadFileProps) => {
    try {
        const {storage , databases} = await createAdminClient();
        // upload file on server
        const inputFile = InputFile.fromBuffer(file , file.name);

        const bucketFile = await storage.createFile(appwriteConfig.bucketId , ID.unique() , inputFile);

        if(!bucketFile) return null;

        const fileDocument = {
            type:getFileType(bucketFile.name).type,
            extension: getFileType(bucketFile.name).extension,
            name: bucketFile.name,
            url: constructFileUrl(bucketFile.$id),
            size: bucketFile.sizeOriginal,
            owner: ownerId,
            accountId: accountId,
            users:[],
            bucketFileId: bucketFile.$id,
        }

        const newFile = await databases.createDocument(appwriteConfig.databaseId , appwriteConfig.filesCollectionId , ID.unique() , fileDocument)
        .catch(async(error:unknown) => {
            await storage.deleteFile(appwriteConfig.bucketId , bucketFile.$id);
            handleError(error , "Error while uploading file in backend from catch block while creating file document.");
        })
        revalidatePath(path);
        return parseStringify(newFile);
    } 
    catch (error) {
        handleError(error , "Error while uploading file in backend from catch block");
        throw new Error("Failed to upload file.");
    }
}