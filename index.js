const fs = require("fs/promises");

(async ()=>{
    const indexPath = "./index.html"
    const myfilename = await fs.open("./myfile.txt", "r");
    myfilename.on("change", async function(){
        let size = (await myfilename.stat()).size
        let buf = Buffer.alloc(size) 
        let offset = 0;
        let length = buf.byteLength;
        let position = 0;

        await myfilename.read(buf, offset, length, position);

        let command = buf.toString("utf-8")

        if(command.startsWith("create banner")){
            const html = await fs.readFile(indexPath,"utf-8")
            await fs.writeFile(indexPath,`${html}<div style="background-color: #1abc9c; color: white; text-align: center; padding-top: 200px; padding-bottom: 200px;">
    <h1 style="font-size: 40px;">My Website</h1>
    <p>A website created by me</p>
    </div>`, "utf-8")
            
            console.log("Banner create complete");
        }else if (command.startsWith("create navbar")) {
            const html = await fs.readFile(indexPath,"utf-8")
            await fs.writeFile(indexPath, `${html}<nav style="display: flex;background-color:#333;padding: 14px 0px; justify-content: space-between;">
    <style>
        a{
            text-decoration: none;
            color: white;
            text-align: center;
            padding: 14px 20px;
        }
        ul{
            list-style: none;
        }
    </style>
    <ul style="text-align: start; width: 50%;">
        <li><a href="#">Logo</a></li>
    </ul>
    <ul style="display: flex; justify-content: center; width: 50%;">
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Service</a></li>
        <li><a href="#">Contact</a></li>
    </ul>   
    </nav>`, "utf-8")
console.log("Navbar created complete");

        }else if (command.startsWith("delete navbar")) {
            const html = await fs.readFile(indexPath, "utf-8");
const updatedHtml = html.replace(/<nav[\s\S]*?<\/nav>/, '');
await fs.writeFile(indexPath, updatedHtml, "utf-8");
console.log("Navbar deleted successfully");

        }else if (command.startsWith("delete banner")) {
            const html = await fs.readFile(indexPath, "utf-8");
    const updatedHtml = html.replace(/<div style="background-color: #1abc9c; color: white; text-align: center; padding-top: 200px; padding-bottom: 200px;">[\s\S]*?<\/div>/, '');
    await fs.writeFile(indexPath, updatedHtml, "utf-8");
    console.log("Banner deleted successfully");
        }
    })

    const cctv = fs.watch("./myfile.txt",)
    
    for await ( let y of cctv){
         if(y.eventType === "change"){
            myfilename.emit("change",)  
         }   
    }

})()

