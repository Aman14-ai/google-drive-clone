'use server'
import { ID, Models, Query } from "node-appwrite";
import { createAdminClient } from "../appwrite"
import { appwriteConfig } from "../appwrite/config";
import { getCurrentUser, handleError } from "./user.action";
import { InputFile } from "node-appwrite/file";
import { constructFileUrl, getFileType, parseStringify } from "../utils";
import { revalidatePath } from "next/cache";

export const uploadFile = async ({ file, ownerId, accountId, path }: UploadFileProps) => {
    try {
        const { storage, databases } = await createAdminClient();
        // upload file on server
        const inputFile = InputFile.fromBuffer(file, file.name);

        const bucketFile = await storage.createFile(appwriteConfig.bucketId, ID.unique(), inputFile);

        if (!bucketFile) return null;

        const fileDocument = {
            type: getFileType(bucketFile.name).type,
            extension: getFileType(bucketFile.name).extension,
            name: bucketFile.name,
            url: constructFileUrl(bucketFile.$id),
            size: bucketFile.sizeOriginal,
            owner: ownerId,
            accountId: accountId,
            users: [],
            bucketFileId: bucketFile.$id,
        }

        const newFile = await databases.createDocument(appwriteConfig.databaseId, appwriteConfig.filesCollectionId, ID.unique(), fileDocument)
            .catch(async (error: unknown) => {
                await storage.deleteFile(appwriteConfig.bucketId, bucketFile.$id);
                handleError(error, "Error while uploading file in backend from catch block while creating file document.");
            })
        revalidatePath(path);
        return parseStringify(newFile);
    }
    catch (error) {
        handleError(error, "Error while uploading file in backend from catch block");
        throw new Error("Failed to upload file.");
    }
}

const createQueries = async (currentUser: Models.Document , types:string[] , searchText:string, sort:string , limit:number|undefined) => {
    try {

        const queries = [
            Query.or([
                Query.equal('owner', [currentUser.$id]),
                Query.contains('users', currentUser.email)
            ])]

        if (types.length > 0) {queries.push(Query.equal('type', types))}
        if(searchText) {queries.push(Query.contains('name', searchText))}
        if(limit)       {queries.push(Query.limit(limit))}

        const [sortBy, orderBy] = sort.split('-');
        queries.push(orderBy === 'asc' ? Query.orderAsc(sortBy) : Query.orderDesc(sortBy));
        return queries
    }
    catch (error) {
        handleError(error, "Error in lib/actions/file.action.ts in createQueries function in catch block");

    }
}

export const getFiles = async ({types = [] , searchText='' , sort='$createdAt-desc' , limit}:GetFilesProps) => {
    try {
        const { databases } = await createAdminClient();
        const currentUser = await getCurrentUser();
        if (!currentUser) throw new Error("User not found.");
        const queries = await createQueries(currentUser, types ,searchText , sort , limit);
        const files = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.filesCollectionId, queries);
        return parseStringify(files);
    }
    catch (error) {
        handleError(error, "Error in lib/actions/file.action.ts in getFiles function in catch block");
    }
}

export const renameFile = async ({ fileId, name, extension, path }: RenameFileProps) => {
    try {
        const { databases } = await createAdminClient();
        const newName = `${name}.${extension}`;
        const updatedFile = await databases.updateDocument(appwriteConfig.databaseId, appwriteConfig.filesCollectionId, fileId, { name: newName });
        revalidatePath(path)
        return parseStringify(updatedFile);
    }
    catch (error) {
        handleError(error, "Error in lib/actions/file.action.ts in renameFile function in catch block");

    }
}

export const updateFileUsers = async ({ fileId, emails, path }: UpdateFileUsersProps) => {
    try {
        const { databases } = await createAdminClient();

        // 1. Fetch the current document
        const existingDoc = await databases.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.filesCollectionId,
            fileId
        );

        // 2. Merge and deduplicate users
        const currentUsers = existingDoc.users || [];
        const updatedUsers = Array.from(new Set([...currentUsers, ...emails]));

        // 3. Update the document
        const updatedFile = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.filesCollectionId,
            fileId,
            {
                users: updatedUsers,
            }
        );

        // 4. Revalidate path if needed
        revalidatePath(path);
        return parseStringify(updatedFile);
    } catch (error) {
        handleError(
            error,
            "Error in lib/actions/file.action.ts in updateFileUsers function backend in catch block"
        );
    }
};

export const removeFileUsers = async ({ fileId, email, path }: { fileId: string, email: string, path: string }) => {
    try {
        const { databases } = await createAdminClient();

        const existingDoc = await databases.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.filesCollectionId,
            fileId
        );
        const currentUsersArray = existingDoc.users || [];
        const updatedUsersArray = currentUsersArray.filter((userEmail:string) => userEmail != email);

        const updatedFile = await databases.updateDocument(
            appwriteConfig.databaseId, appwriteConfig.filesCollectionId , fileId, {
                users: updatedUsersArray
            }
        )

        revalidatePath(path);
        return parseStringify(updatedFile);
    }
    catch (error) {
        handleError(error, "Error in lib/actions/file.action.ts in removeFileUsers function in catch block");
    }
}

export const deleteFile = async ({fileId , bucketFileId , path}:DeleteFileProps) => {
    try {
        const {storage , databases} = await createAdminClient();    
        // delete metadata
        const deletedMetadata = await databases.deleteDocument(appwriteConfig.databaseId , appwriteConfig.filesCollectionId, fileId);

        if(deletedMetadata){
            await storage.deleteFile(appwriteConfig.bucketId , bucketFileId);
        }
        revalidatePath(path);
        return parseStringify(deletedMetadata);
    } 
    catch (error) {
        handleError(error, "Error in lib/actions/file.action.ts in deleteFile function in catch block");
    }
}