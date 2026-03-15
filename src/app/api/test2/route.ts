import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export const POST = async (req: NextRequest) => {
    const formData = await req.formData()
    console.log(formData)

    const uniqueId = uuidv4();
    console.log(uniqueId)



    



    
    return NextResponse.json(uniqueId)
    // return NextResponse.json({"test": "nakami", "test2": ["nakami2", "nakami2_1"]})
}