import Card from '@/components/shared/Card';
import Sort from '@/components/shared/Sort';
import { getFiles } from '@/lib/actions/file.action';
import { getFileTypesParams } from '@/lib/utils';
import { Models } from 'node-appwrite';
import React from 'react'

const page = async ({ searchParams ,  params }: SearchParamProps) => {
    const type = (await params)?.type as string || "";
    const types = getFileTypesParams(type) as FileType[];
    const searchText = ((await searchParams)?.query) as string || "";
    const sort = ((await searchParams)?.sort) as string || "";

    const files = await getFiles({types: types , searchText , sort});



    // console.log(files);
    return (
        <div className='page-container'>
            <section className="w-full">
                <h1 className='h1 capitalize'>{type}</h1>

                <div className="total-size-section">

                    <p className="body-1">
                        Total: <span className="h5">0 MB</span>
                    </p>

                    <div className="sort-container">
                        <p className="body-1 hidden text-light-200 sm:block">Sort by:</p>
                        <Sort />
                    </div>
                </div>
            </section>
            {/* dynamically render the files */}

            {
                files.total > 0 ? (
                    <section className='file-list'>
                        {
                            files.documents.map((file:Models.Document) => {
                                return (
                                    <Card key={file.$id} file={file} />
                                )
                                
                            })
                        }
                    </section>
                )
                :
                (
                    <p className="empty-list">No files uploaded</p>
                ) 

            }

        </div>
    )
}

export default page
